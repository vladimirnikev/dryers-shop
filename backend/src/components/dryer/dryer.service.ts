import { ColorEntity } from '../color/entities/color.entity';
import { ItemRecordEntity } from './../cart/entities/itemRecord.entity';
import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, getRepository, Repository } from 'typeorm';
import { DryerEntity } from '@app/components/dryer/entities/dryer.entity';
import { IGetProductsQuery } from '@app/common/interfaces/get-products-query.interface';
import { CloudinaryService } from '@app/modules/cloudinary/cloudinary.service';
import { ManufacturerEntity } from '../manufacturer/entities/manufacturer.entity';
import { ProductPriceRange } from '@app/common/interfaces/product-price-range.interface';

@Injectable()
export class DryerService {
  constructor(
    @InjectRepository(DryerEntity)
    private readonly dryerRepository: Repository<DryerEntity>,
    @InjectRepository(ItemRecordEntity)
    private readonly itemRecordRepository: Repository<ItemRecordEntity>,
    @InjectRepository(ManufacturerEntity)
    private readonly manufacturerRepository: Repository<ManufacturerEntity>,
    @InjectRepository(ColorEntity)
    private readonly colorsRepository: Repository<ColorEntity>,
    private cloudinaryService: CloudinaryService,
  ) {}

  async getDryers(query: IGetProductsQuery): Promise<{ data: DryerEntity[]; totalCount: number }> {
    const queryBuilder = getRepository(DryerEntity)
      .createQueryBuilder('dryers')
      .addSelect('dryers.createdAt')
      .addSelect('dryers.updatedAt')
      .orderBy('dryers.createdAt', 'DESC')
      .leftJoinAndSelect('dryers.manufacturer', 'manufacturer')
      .leftJoinAndSelect('dryers.colors', 'colors')
      .leftJoin('dryers.stocks', 'dryerStock');

    if (query.type) {
      const productTypes = ['water', 'electricity', 'combine', 'accessories'];
      const isProductTypesExistQueryType = productTypes.some((type) => type === query.type);
      const isWithDiscounts = query.type === 'discounts';

      // check if query type exist in product types list and find products with this type
      if (isProductTypesExistQueryType) {
        queryBuilder.andWhere('dryers.category = :type', {
          type: query.type.toUpperCase(),
        });

        // find products with discounts
      } else if (isWithDiscounts) {
        queryBuilder.andWhere('dryers.oldPrice IS NOT NULL');

        // find products with stock, that exist in query type
      } else {
        queryBuilder.andWhere('dryerStock.id = :stock', { stock: query.type });
      }
    }

    if (query.name) {
      queryBuilder.andWhere('dryers.name ILIKE :name', {
        name: `%${query.name}%`,
      });
    }
    if (query.price) {
      const [minPrice, maxPrice] = query.price.split('-');
      queryBuilder.andWhere('dryers.price BETWEEN :minPrice AND :maxPrice', {
        minPrice,
        maxPrice,
      });
    }
    if (query.availability) {
      const availabilityValues = query.availability.split(',');
      queryBuilder.andWhere('dryers.availability IN (:...availability)', {
        availability: availabilityValues,
      });
    }
    if (query.color) {
      const colorIds = query.color.split(',');
      queryBuilder.andWhere('colors.id IN (:...color)', {
        color: colorIds,
      });
    }
    if (query.manufacturer) {
      const manufacturerIds = query.manufacturer.split(',');
      queryBuilder.andWhere('manufacturer.id IN (:...manufacturer)', {
        manufacturer: manufacturerIds,
      });
    }
    if (query.power) {
      const [minPower, maxPower] = query.power.split('-');
      queryBuilder.andWhere('dryers.power BETWEEN :minPower AND :maxPower', {
        minPower,
        maxPower,
      });
    }
    if (query.discount) {
      queryBuilder.andWhere('dryers.oldPrice IS NOT NULL').andWhere('dryers.availability = true');
    }
    if (query.limit) {
      queryBuilder.take(query.limit);
    }
    if (query.offset) {
      queryBuilder.skip(query.offset);
    }
    if (query.sortBy && query.sortDirection) {
      if (query.sortBy === 'colors') {
        queryBuilder.orderBy(`colors.name`, `${query.sortDirection}` as 'ASC' | 'DESC');
      } else {
        queryBuilder.orderBy(`dryers.${query.sortBy}`, `${query.sortDirection}` as 'ASC' | 'DESC');
      }
    }
    const data = await queryBuilder.getManyAndCount();

    return { data: data[0], totalCount: data[1] };
  }

  async getOneDryer(id: number, res, req): Promise<DryerEntity> {
    const dryer = await this.dryerRepository.findOne({ id });
    if (!dryer) {
      throw new HttpException('Товар не существует', HttpStatus.NOT_FOUND);
    }

    const viewedProductsByCurrentSession: any[] = req.cookies['viewedProductIds'];
    let modifiedViewedProducts;

    if (!viewedProductsByCurrentSession || !viewedProductsByCurrentSession.length) {
      modifiedViewedProducts = [id];
      res.cookie('viewedProductIds', modifiedViewedProducts, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
      return dryer;
    }

    if (!viewedProductsByCurrentSession.some((productId) => +productId === +id)) {
      if (viewedProductsByCurrentSession.length === 12) {
        viewedProductsByCurrentSession.pop();
        modifiedViewedProducts = [id, ...viewedProductsByCurrentSession];
        res.cookie('viewedProductIds', modifiedViewedProducts, {
          maxAge: 30 * 24 * 60 * 60 * 1000,
        });
        return dryer;
      }

      modifiedViewedProducts = [id, ...viewedProductsByCurrentSession];
      res.cookie('viewedProductIds', modifiedViewedProducts, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
      return dryer;
    }

    return dryer;
  }

  async createDryer(
    { name, price, oldPrice, availability, colors, description, manufacturer, power },
    files,
  ): Promise<DryerEntity> {
    price = Number(price);
    const errors = [];
    if (!name) {
      errors.push('The name must be specified');
    }
    if (!price) {
      errors.push('The price must be specified');
    }
    if (!availability) {
      errors.push('The availability must be specified');
    }
    if (!colors) {
      errors.push('The color must be specified');
    }
    if (!description) {
      errors.push('The description must be specified');
    }
    if (!manufacturer) {
      errors.push('The manufacturer must be specified');
    }
    if (!power) {
      errors.push('The power must be specified');
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

    const dryer = new DryerEntity();
    Object.assign(dryer, {
      name,
      price,
      availability,
      description,
      power,
      imageUrls,
      oldPrice,
    });
    const manufacturerItem = await this.manufacturerRepository.findOne(manufacturer);
    if (!manufacturerItem) {
      throw new NotFoundException('The manufacturer with this id does not exist');
    }
    colors = colors.split(',');
    dryer.manufacturer = manufacturerItem;
    const colorItems = await this.colorsRepository
      .createQueryBuilder('color')
      .where('color.id IN (:...ids)', { ids: [...colors] })
      .getMany();

    if (!colorItems) {
      throw new NotFoundException('These colors do not exist');
    }
    dryer.colors = colorItems;
    return await this.dryerRepository.save(dryer);
  }

  async updateDryer(
    { name, price, oldPrice, availability, colors, description, manufacturer, power },
    files,
    id: number,
  ): Promise<DryerEntity> {
    price = Number(price);
    const errors = [];
    if (!name) {
      errors.push('The name must be specified');
    }
    if (!price) {
      errors.push('The price must be specified');
    }
    if (!availability) {
      errors.push('The availability must be specified');
    }
    if (!colors) {
      errors.push('The color must be specified');
    }
    if (!description) {
      errors.push('The description must be specified');
    }
    if (!manufacturer) {
      errors.push('The manufacturer must be specified');
    }
    if (!power) {
      errors.push('The power must be specified');
    }
    if (errors.length) {
      throw new HttpException(`${errors}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    const dryer = await this.dryerRepository.findOne({ id });
    let imageUrls = [];
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
    imageUrls = dryer.imageUrls ? [...dryer.imageUrls, ...imageUrls] : imageUrls;
    Object.assign(dryer, {
      name,
      price,
      availability,
      description,
      power,
      imageUrls,
      oldPrice,
    });
    const manufacturerItem = await this.manufacturerRepository.findOne(manufacturer);
    if (!manufacturerItem) {
      throw new NotFoundException('The manufacturer with this id does not exist');
    }
    colors = colors.split(',');
    dryer.manufacturer = manufacturerItem;
    const colorItems = await this.colorsRepository
      .createQueryBuilder('color')
      .where('color.id IN (:...ids)', { ids: [...colors] })
      .getMany();
    if (!colorItems) {
      throw new NotFoundException('These colors do not exist');
    }
    dryer.colors = colorItems;
    return await this.dryerRepository.save(dryer);
  }

  async deleteDryer(id: number): Promise<DeleteResult> {
    const product = await this.dryerRepository.findOne(id);
    if (!product) {
      throw new NotFoundException("Product doesn't exist");
    }
    await this.itemRecordRepository
      .createQueryBuilder('itemRecord')
      .leftJoinAndSelect('itemRecord.item', 'item')
      .delete()
      .from(ItemRecordEntity)
      .where('item.id = :id', { id })
      .execute();
    return await this.dryerRepository.delete(id);
  }

  async deleteImage(productId: number, imageUrl: string): Promise<DryerEntity> {
    await this.cloudinaryService.deleteImage(imageUrl);
    const product = await this.dryerRepository.findOne(productId);
    if (!product) {
      throw new NotFoundException('Product does not exist');
    }

    product.imageUrls = product.imageUrls.filter((url) => url !== imageUrl);
    return await this.dryerRepository.save(product);
  }

  async getPriceRange(query: any): Promise<ProductPriceRange> {
    const queryBuilder = this.dryerRepository
      .createQueryBuilder('products')
      .leftJoin('products.stocks', 'productStock')
      .leftJoin('products.manufacturer', 'manufacturer')
      .leftJoin('products.colors', 'color');

    if (query.type) {
      const productTypes = ['water', 'electricity', 'combine', 'accessories'];
      const isProductTypesExistQueryType = productTypes.some((type) => type === query.type);
      const isWithDiscounts = query.type === 'discounts';

      if (isProductTypesExistQueryType) {
        queryBuilder.andWhere('products.category = :type', {
          type: query.type.toUpperCase(),
        });
      } else if (isWithDiscounts) {
        queryBuilder.andWhere('products.oldPrice IS NOT NULL');
      } else {
        queryBuilder.andWhere('productStock.id = :stock', {
          stock: query.type,
        });
      }
    }

    if (query.name) {
      queryBuilder.andWhere('products.name ILIKE :name', {
        name: `%${query.name}%`,
      });
    }
    if (query.availability) {
      const availabilityValues = query.availability.split(',');
      queryBuilder.andWhere('products.availability IN (:...availability)', {
        availability: availabilityValues,
      });
    }
    if (query.color) {
      const colorIds = query.color.split(',');
      queryBuilder.andWhere('color.id IN (:...color)', {
        color: colorIds,
      });
    }
    if (query.manufacturer) {
      const manufacturerIds = query.manufacturer.split(',');
      queryBuilder.andWhere('manufacturer.id IN (:...manufacturer)', {
        manufacturer: manufacturerIds,
      });
    }

    const priceRange = await queryBuilder
      .select('MIN(products.price)', 'min')
      .addSelect('MAX(products.price)', 'max')
      .getRawOne();

    return priceRange;
  }

  async getViewedDryers(req) {
    const viewedProductIds = req.cookies['viewedProductIds'];
    if (!viewedProductIds) {
      throw new NotFoundException('No one product has been viewed');
    }

    const generatedOrderByString = viewedProductIds
      .map((id, index) => `WHEN product.id = ${id} THEN ${index + 1}`)
      .join(' ');

    const viewedProducts = await this.dryerRepository
      .createQueryBuilder('product')
      .whereInIds(viewedProductIds)
      .orderBy(`(CASE ${generatedOrderByString} ELSE null END)`)
      .getMany();

    if (!viewedProducts) {
      throw new NotFoundException('Products not found');
    }

    return viewedProducts;
  }
}
