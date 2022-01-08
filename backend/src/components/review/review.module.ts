import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ReviewEntity } from './entities/review.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ReviewEntity])]
})
export class ReviewModule { }
