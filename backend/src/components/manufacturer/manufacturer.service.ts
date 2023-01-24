import { CloudinaryService } from '@app/modules/cloudinary/cloudinary.service';
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { ManufacturerEntity } from './entities/manufacturer.entity';

@Injectable()
export class ManufacturerService {
  constructor(
    @InjectRepository(ManufacturerEntity)
    private readonly manufacturerRepository: Repository<ManufacturerEntity>,
    private cloudinaryService: CloudinaryService,
  ) {}

  async getAll(): Promise<ManufacturerEntity[]> {
    return await this.manufacturerRepository.find();
  }

  async create({ name }: CreateManufacturerDto, file): Promise<ManufacturerEntity> {
    const errors = [];
    if (!name) {
      errors.push('The name must be specified');
    }
    if (!file) {
      errors.push('Image must be added');
    }
    if (errors.length) {
      throw new HttpException(`${errors}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    const manufacturer = new ManufacturerEntity();
    const img = file.filename;

    Object.assign(manufacturer, { name, img });
    return await this.manufacturerRepository.save(manufacturer);
  }

  async update({ name }: CreateManufacturerDto, id, file): Promise<ManufacturerEntity> {
    const errors = [];
    if (!name) {
      errors.push('The name must be specified');
    }
    if (!file) {
      errors.push('Image must be added');
    }
    if (errors.length) {
      throw new HttpException(`${errors}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    const manufacturer = await this.manufacturerRepository.findOne({ where: { id } });

    if (!manufacturer) {
      throw new NotFoundException('Manufacturer with this id does not exist');
    }

    this.cloudinaryService.removeUploadedImage(manufacturer.img);

    const img = file.filename;

    Object.assign(manufacturer, { name, img });
    return await this.manufacturerRepository.save(manufacturer);
  }

  async delete(id): Promise<DeleteResult> {
    const manufacturer = await this.manufacturerRepository.findOne({ where: { id } });
    await this.cloudinaryService.removeUploadedImage(manufacturer.img);
    return await this.manufacturerRepository.delete(id);
  }
}
