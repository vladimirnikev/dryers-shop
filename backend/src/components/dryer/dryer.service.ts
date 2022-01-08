import { ColorEntity } from '../color/entities/color.entity';
import { ItemRecordEntity } from './../cart/entities/itemRecord.entity';
import { Injectable, HttpException, HttpStatus, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, getRepository, Repository } from 'typeorm';
import { DryerEntity } from '@app/components/dryer/entities/dryer.entity';
import { IGetProductsQuery } from '@app/common/interfaces/get-products-query.interface';
import { CloudinaryService } from '@app/modules/cloudinary/cloudinary.service';
import { ManufacturerEntity } from '../manufacturer/entities/manufacturer.entity';

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
    private cloudinaryService: CloudinaryService
  ) { }

  async getDryers(
    query: IGetProductsQuery
  ): Promise<{ data: DryerEntity[], totalCount: number }> {
    const queryBuilder = getRepository(DryerEntity)
      .createQueryBuilder('dryers')
      .addSelect('dryers.createdAt')
      .orderBy('dryers.createdAt', 'DESC')
      .leftJoinAndSelect('dryers.manufacturer', 'manufacturer')
      .leftJoinAndSelect('dryers.colors', 'colors')

    if (query.name) {
      queryBuilder.andWhere('dryers.name ILIKE :name', { name: `%${query.name}%` })
    }
    if (query.price) {
      const [minPrice, maxPrice] = query.price.split('-')
      queryBuilder.andWhere('dryers.price BETWEEN :minPrice AND :maxPrice', {
        minPrice,
        maxPrice
      })
    }
    if (query.availability) {
      queryBuilder.andWhere('dryers.availability = :availability', {
        availability: query.availability
      })
    }
    if (query.color) {
      queryBuilder.andWhere('dryers.color ILIKE :color', {
        color: `%${query.color}%`
      })
    }
    if (query.manufacturer) {
      queryBuilder.andWhere('manufacturer.id = :manufacturer', {
        manufacturer: query.manufacturer
      })
    }
    if (query.power) {
      const [minPower, maxPower] = query.power.split('-')
      queryBuilder.andWhere('dryers.power BETWEEN :minPower AND :maxPower', {
        minPower,
        maxPower
      })
    }
    if (query.limit) {
      queryBuilder.take(query.limit)
    }
    if (query.offset) {
      queryBuilder.skip(query.offset)
    }
    if (query.sortBy && query.sortDirection) {
      queryBuilder.orderBy(`${query.sortBy}`, `${query.sortDirection}` as 'ASC' | 'DESC')
    }
    const data = await queryBuilder.getManyAndCount()
    return { data: data[0], totalCount: data[1] }
  }

  async getOneDryer(id: number): Promise<DryerEntity> {
    const dryer = await this.dryerRepository.findOne({ id })
    if (!dryer) {
      throw new HttpException('Товар не существует', HttpStatus.NOT_FOUND)
    }
    return dryer
  }

  async createDryer({
    name, price, availability, colors, description, manufacturer, power
  }, files): Promise<DryerEntity> {
    price = Number(price)
    const errors = []
    if (!name) {
      errors.push('The name must be specified')
    }
    if (!price) {
      errors.push('The price must be specified')
    }
    if (!availability) {
      errors.push('The availability must be specified')
    }
    if (!colors) {
      errors.push('The color must be specified')
    }
    if (!description) {
      errors.push('The description must be specified')
    }
    if (!manufacturer) {
      errors.push('The manufacturer must be specified')
    }
    if (!power) {
      errors.push('The power must be specified')
    }
    if (!files.length) {
      errors.push('Images must be added')
    }
    if (errors.length) {
      throw new HttpException(`${errors}`, HttpStatus.INTERNAL_SERVER_ERROR)
    }

    const imageUrls = []

    await Promise.all(files.map(async (file) => {
      try {
        const image = await this.cloudinaryService.uploadImage(file)
        imageUrls.push(image.url)
      } catch (error) {
        throw new BadRequestException('Invalid file type.')
      }
    }))

    const dryer = new DryerEntity()
    Object.assign(dryer, { name, price, availability, description, power, imageUrls })
    const manufacturerItem = await this.manufacturerRepository.findOne(manufacturer)
    if (!manufacturerItem) {
      throw new NotFoundException('The manufacturer with this id does not exist')
    }
    colors = colors.split(',')
    dryer.manufacturer = manufacturerItem
    const colorItems = await this.colorsRepository
      .createQueryBuilder('color')
      .where('color.id IN (:...ids)', { ids: [...colors] })
      .getMany()

    if (!colorItems) {
      throw new NotFoundException('These colors do not exist')
    }
    dryer.colors = colorItems
    return await this.dryerRepository.save(dryer)
  }

  async updateDryer({
    name, price, availability, colors, description, manufacturer, power
  }, files, id: number): Promise<DryerEntity> {
    price = Number(price)
    const errors = []
    if (!name) {
      errors.push('The name must be specified')
    }
    if (!price) {
      errors.push('The price must be specified')
    }
    if (!availability) {
      errors.push('The availability must be specified')
    }
    if (!colors) {
      errors.push('The color must be specified')
    }
    if (!description) {
      errors.push('The description must be specified')
    }
    if (!manufacturer) {
      errors.push('The manufacturer must be specified')
    }
    if (!power) {
      errors.push('The power must be specified')
    }
    if (errors.length) {
      throw new HttpException(`${errors}`, HttpStatus.INTERNAL_SERVER_ERROR)
    }

    const dryer = await this.dryerRepository.findOne({ id })
    let imageUrls = []
    await Promise.all(files.map(async (file) => {
      try {
        const image = await this.cloudinaryService.uploadImage(file)
        imageUrls.push(image.url)
      } catch (error) {
        throw new BadRequestException('Invalid file type.')
      }
    }))
    imageUrls = dryer.imageUrls ? [...dryer.imageUrls, ...imageUrls] : imageUrls
    Object.assign(dryer, { name, price, availability, description, power, imageUrls })
    const manufacturerItem = await this.manufacturerRepository.findOne(manufacturer)
    if (!manufacturerItem) {
      throw new NotFoundException('The manufacturer with this id does not exist')
    }
    colors = colors.split(',')
    dryer.manufacturer = manufacturerItem
    const colorItems = await this.colorsRepository
      .createQueryBuilder('color')
      .where('color.id IN (:...ids)', { ids: [...colors] })
      .getMany()
    if (!colorItems) {
      throw new NotFoundException('These colors do not exist')
    }
    dryer.colors = colorItems
    return await this.dryerRepository.save(dryer)
  }

  async deleteDryer(id: number): Promise<DeleteResult> {
    const product = await this.dryerRepository.findOne(id)
    if (!product) {
      throw new NotFoundException('Product doesn\'t exist')
    }
    await this.itemRecordRepository
      .createQueryBuilder('itemRecord')
      .leftJoinAndSelect('itemRecord.item', 'item')
      .delete()
      .from(ItemRecordEntity)
      .where('item.id = :id', { id })
      .execute()
    return await this.dryerRepository.delete(id)
  }

  async deleteImage(productId: number, imageUrl: string): Promise<DryerEntity> {
    await this.cloudinaryService.deleteImage(imageUrl)
    const product = await this.dryerRepository.findOne(productId)
    if (!product) {
      throw new NotFoundException('Product does not exist')
    }

    product.imageUrls = product.imageUrls.filter(url => url !== imageUrl)
    return await this.dryerRepository.save(product)
  }
}
