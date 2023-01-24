import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateColorDto } from './dto/createColor.dto';
import { ColorEntity } from './entities/color.entity';

@Injectable()
export class ColorService {
  constructor(
    @InjectRepository(ColorEntity)
    private readonly colorRepository: Repository<ColorEntity>,
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
    const color = await this.colorRepository.findOne({ where: { id } });
    if (!color) {
      throw new NotFoundException('The color with this id does not exist');
    }
    Object.assign(color, dto);
    return await this.colorRepository.save(color);
  }

  async delete(id): Promise<DeleteResult> {
    return await this.colorRepository.delete(id);
  }
}
