import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DryerEntity } from '../dryer/entities/dryer.entity';
import { CreateColorDto } from './dto/createColor.dto';
import { ColorEntity } from './entities/color.entity';

@Injectable()
export class ColorService {
  constructor(
    @InjectRepository(ColorEntity)
    private readonly colorRepository: Repository<ColorEntity>,
    @InjectRepository(DryerEntity)
    private readonly dryerRepository: Repository<DryerEntity>,
  ) {}

  async getAll(): Promise<ColorEntity[]> {
    return await this.colorRepository.find();
  }

  async create(dto: CreateColorDto): Promise<ColorEntity> {
    const color = new ColorEntity();
    Object.assign(color, dto);
    return await this.colorRepository.save(color);
  }

  async update(dto: CreateColorDto, id): Promise<ColorEntity> {
    const color = await this.colorRepository.findOne({ where: { id: +id } });
    if (!color) {
      throw new NotFoundException('The color with this id does not exist');
    }
    Object.assign(color, dto);
    return await this.colorRepository.save(color);
  }

  async delete(id): Promise<void> {
    await this.colorRepository.delete(id);
    const colorsInDB = await this.colorRepository.find();
    const products = await this.dryerRepository
      .createQueryBuilder('dryers')
      .leftJoinAndSelect('dryers.colors', 'colors')
      .where('colors.id IS NULL')
      .getMany();
    const changedProducts = products.map((product) => ({ ...product, colors: [colorsInDB[0]] }));

    await this.dryerRepository.save(changedProducts);
  }
}
