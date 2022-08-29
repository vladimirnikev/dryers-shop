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

  async getStocks(): Promise<StockEntity[]> {
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

  async createStock({ name, isActive, products }, files: any): Promise<StockEntity> {
    const errors = [];
    if (!name) {
      errors.push('The name must be specified');
    }
    if (!files.length) {
      errors.push('Images must be added');
    }
    if (errors.length) {
      throw new HttpException(`${errors}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    let imageUrl: string;

    try {
      const image = await this.cloudinaryService.uploadImage(files[0]);
      imageUrl = image.url;
    } catch (error) {
      throw new BadRequestException('Invalid file type.');
    }

    const isTrueSet = isActive.toLowerCase() === 'true';
    const stock = new StockEntity();
    Object.assign(stock, { name, img: imageUrl, isActive: isTrueSet });

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

  async updateStock({ name, isActive, products }, files: any, id: number): Promise<StockEntity> {
    const stock = await this.stockRepository.findOne({ id });

    if (!stock) {
      throw new NotFoundException('Stock with this id does not exist');
    }

    const isTrueSet = isActive.toLowerCase() === 'true';

    if (files.length) {
      try {
        const image = await this.cloudinaryService.uploadImage(files[0]);
        const imageUrl = image.url;
        stock.img = imageUrl;
      } catch (error) {
        throw new BadRequestException('Invalid file type.');
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

    Object.assign(stock, { name, isActive: isTrueSet });
    return await this.stockRepository.save(stock);
  }

  async deleteStock(id: number): Promise<{ id: number }> {
    const stock = await this.stockRepository.findOne({ id });
    await this.stockRepository.delete(id);
    return { id: stock.id };
  }
}
