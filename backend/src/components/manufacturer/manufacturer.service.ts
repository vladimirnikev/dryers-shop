import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { ManufacturerEntity } from './entities/manufacturer.entity';

@Injectable()
export class ManufacturerService {
  constructor(
    @InjectRepository(ManufacturerEntity)
    private readonly manufacturerRepository: Repository<ManufacturerEntity>,
  ) {}

  async getAll(): Promise<ManufacturerEntity[]> {
    return await this.manufacturerRepository.find();
  }

  async create(dto: CreateManufacturerDto): Promise<ManufacturerEntity> {
    const manufacturer = new ManufacturerEntity();
    Object.assign(manufacturer, dto);
    return await this.manufacturerRepository.save(manufacturer);
  }

  async update(dto: CreateManufacturerDto, id): Promise<ManufacturerEntity> {
    const manufacturer = await this.manufacturerRepository.findOne(id);
    if (!manufacturer) {
      throw new NotFoundException('Manufacturer with this id does not exist');
    }
    Object.assign(manufacturer, dto);
    return await this.manufacturerRepository.save(manufacturer);
  }

  async delete(id): Promise<DeleteResult> {
    return await this.manufacturerRepository.delete(id);
  }
}
