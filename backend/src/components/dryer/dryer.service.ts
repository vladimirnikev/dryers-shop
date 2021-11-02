import { ItemRecordEntity } from './../cart/entities/itemRecord.entity';
import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, getRepository, Repository } from 'typeorm';

import { DryerEntity } from '@app/components/dryer/entities/dryer.entity';
import { CreateDryerDto } from './dto/createDryer.dto';
import { IGetProductsQuery } from '@app/common/interfaces/get-products-query.interface';

@Injectable()
export class DryerService {
  constructor(
    @InjectRepository(DryerEntity)
    private readonly dryerRepository: Repository<DryerEntity>,
    @InjectRepository(ItemRecordEntity)
    private readonly itemRecordEntity: Repository<ItemRecordEntity>
  ) { }

  async getDryers(
    query: IGetProductsQuery
  ): Promise<{ data: DryerEntity[], totalCount: number }> {
    const queryBuilder = getRepository(DryerEntity)
      .createQueryBuilder('dryers')
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
    if (query.batch) {
      queryBuilder.andWhere('dryers.batch = :batch', {
        batch: query.batch
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
      queryBuilder.limit(query.limit)
    }
    if (query.offset) {
      queryBuilder.offset(query.offset)
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

  async createDryer(dto: CreateDryerDto): Promise<DryerEntity> {
    const dryer = new DryerEntity()
    Object.assign(dryer, dto)
    return await this.dryerRepository.save(dryer)
  }

  async updateDryer(dto: CreateDryerDto, id: number): Promise<DryerEntity> {
    const dryer = await this.dryerRepository.findOne({ id })
    Object.assign(dryer, dto)
    return await this.dryerRepository.save(dryer)
  }

  async deleteDryer(id: number): Promise<DeleteResult> {
    const product = await this.dryerRepository.findOne(id)
    if (!product) {
      throw new NotFoundException('Product doesn\'t exist')
    }
    await this.itemRecordEntity
      .createQueryBuilder('itemRecord')
      .leftJoinAndSelect('itemRecord.item', 'item')
      .delete()
      .from(ItemRecordEntity)
      .where('item.id = :id', { id })
      .execute()
    return await this.dryerRepository.delete(id)
  }

}
