import * as dayjs from 'dayjs';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository } from 'typeorm';
import { CreateCallDto } from './dto/createCall.dto';
import { CallEntity } from './entities/call.entity';
import { Cron, CronExpression } from '@nestjs/schedule';
import { TelegramService } from '@app/modules/telegram/telegram.service';

@Injectable()
export class CallService {
  constructor(
    @InjectRepository(CallEntity)
    private callRepository: Repository<CallEntity>,
    private telegramService: TelegramService,
  ) { }

  async getCalls(): Promise<CallEntity[]> {
    return await this.callRepository.find();
  }

  async createCall(dto: CreateCallDto): Promise<void> {
    try {
      const call = new CallEntity();
      Object.assign(call, dto);
      await this.callRepository.save(call);
      this.telegramService.tgBot.sendMessage(
        process.env.TELEGRAM_CHAT_ID,
        this.telegramService.checkCurrentTimeForMessage(dto.phone, dto.fullName, dto.message),
      );
    } catch (error) {
      throw new HttpException('Что-то пошло не так', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async deleteExpiredCalls() {
    const sevenDaysBeforeCurrentDate = dayjs().utc().local().subtract(7, 'day').format();
    try {
      const callsForDeleting = await getRepository(CallEntity)
        .createQueryBuilder('call')
        .where('call.createdAt < :date', { date: sevenDaysBeforeCurrentDate })
        .getMany();

      callsForDeleting
        .map((call) => call.id)
        .forEach((id) => {
          this.callRepository.delete({ id });
        });
    } catch (err) {
      console.log(err);
    }
  }
}
