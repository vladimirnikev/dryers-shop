import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { ManufacturerEntity } from '@app/components/manufacturer/entities/manufacturer.entity';

export default class UserSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(ManufacturerEntity);
    await repository.insert([
      { name: 'Mario', img: 'https://loremflickr.com/640/480/cats' },
      { name: 'Laris', img: 'https://loremflickr.com/640/480/city' },
      { name: 'Solana', img: 'https://loremflickr.com/640/480/transport' },
    ]);
  }
}
