import { DryerEntity } from '@app/components/dryer/entities/dryer.entity';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';

export default class UserSeeder implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
    const productFactory = await factoryManager.get(DryerEntity);
    await productFactory.saveMany(100);
  }
}
