import { StockWithProductIds } from '@app/common/interfaces/stock-with-product-ids.interface';
import { CloudinaryService } from '@app/modules/cloudinary/cloudinary.service';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DryerEntity } from '../dryer/entities/dryer.entity';
import { StockEntity } from './entities/stock.entity';

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(StockEntity)
    private readonly stockRepository: Repository<StockEntity>,
    @InjectRepository(DryerEntity)
    private readonly dryerRepository: Repository<DryerEntity>,
    private cloudinaryService: CloudinaryService,
  ) {}

  async getStocks(query): Promise<StockEntity[]> {
    if (query.isActive) {
      return await this.stockRepository.find({ where: { isActive: true } });
    }
    return await this.stockRepository.find();
  }

  async getOneStock(id: number): Promise<StockWithProductIds> {
    const stock = await this.stockRepository
      .createQueryBuilder('stock')
      .where('stock.id = :id', { id })
      .leftJoinAndSelect('stock.products', 'products')
      .getOne();

    if (!stock) {
      throw new NotFoundException('Stock does not exist');
    }

    const stockWithProductsIds = {
      ...stock,
      products: stock.products.map((item) => item.id),
    };

    return stockWithProductsIds;
  }

  async createStock({ name, nameUa, isActive, products }, files: any): Promise<StockEntity> {
    const errors = [];
    if (!name) {
      errors.push('The name must be specified');
    }
    if (!nameUa) {
      errors.push('The name must be specified');
    }
    if (!files.length) {
      errors.push('Images must be added');
    }
    if (errors.length) {
      throw new HttpException(`${errors}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    const imageUrls = [];

    await Promise.all(
      files.map(async (file) => {
        try {
          const image = await this.cloudinaryService.uploadImage(file);
          imageUrls.push(image.url);
        } catch (error) {
          throw new BadRequestException('Invalid file type.');
        }
      }),
    );

    const isTrueSet = isActive.toLowerCase() === 'true';
    const stock = new StockEntity();
    Object.assign(stock, {
      name,
      nameUa,
      img: imageUrls[0],
      imgUa: imageUrls.length > 1 ? imageUrls[1] : imageUrls[0],
      isActive: isTrueSet,
    });

    const productsIds = products.split(',');
    const productItems = await this.dryerRepository
      .createQueryBuilder('product')
      .where('product.id IN (:...ids)', { ids: [...productsIds] })
      .getMany();

    if (!productItems) {
      throw new NotFoundException('These products do not exist');
    }
    stock.products = productItems;

    return await this.stockRepository.save(stock);
  }

  async updateStock(
    { name, nameUa, isActive, products },
    files: any,
    id: number,
  ): Promise<StockEntity> {
    const stock = await this.stockRepository.findOne({ where: { id } });

    if (!stock) {
      throw new NotFoundException('Stock with this id does not exist');
    }

    const isTrueSet = isActive.toLowerCase() === 'true';

    if (files.length) {
      const imageUrls = [];

      await Promise.all(
        files.map(async (file) => {
          try {
            const image = await this.cloudinaryService.uploadImage(file);
            imageUrls.push(image.url);
          } catch (error) {
            throw new BadRequestException('Invalid file type.');
          }
        }),
      );
      await this.deleteImagesFromStock(stock);
      if (files.length === 1) {
        stock.img = imageUrls[0];
        stock.imgUa = imageUrls[0];
      } else {
        stock.img = imageUrls[0];
        stock.imgUa = imageUrls[1];
      }
    }

    const productsIds = products.split(',');
    const productItems = await this.dryerRepository
      .createQueryBuilder('product')
      .where('product.id IN (:...ids)', { ids: [...productsIds] })
      .getMany();

    if (!productItems) {
      throw new NotFoundException('These products do not exist');
    }
    stock.products = productItems;

    Object.assign(stock, { name, nameUa, isActive: isTrueSet });
    return await this.stockRepository.save(stock);
  }

  async deleteStock(id: number): Promise<{ id: number }> {
    const stock = await this.stockRepository.findOne({ where: { id } });
    await this.deleteImagesFromStock(stock);
    await this.stockRepository.delete(id);
    return { id: stock.id };
  }

  async deleteImagesFromStock(stock: StockEntity) {
    if (stock.img && stock.imgUa) {
      if (stock.img === stock.imgUa) {
        await this.cloudinaryService.deleteImage(stock.img);
        return;
      }
      await this.cloudinaryService.deleteImage(stock.img);
      await this.cloudinaryService.deleteImage(stock.imgUa);
    }
  }
}
