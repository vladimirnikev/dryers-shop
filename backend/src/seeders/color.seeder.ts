import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { ColorEntity } from '@app/components/color/entities/color.entity';

export default class UserSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(ColorEntity);
    await repository.insert([
      {
        code: '#070707',
        name: 'Черный',
        nameUa: 'Чорний',
      },
      {
        code: '#f9f9f9',
        name: 'Белый',
        nameUa: 'Білий',
      },
      {
        code: '#f2d21e',
        name: 'Золотой',
        nameUa: 'Золотий',
      },
      {
        code: '#d6d6d6',
        name: 'Серебрянный',
        nameUa: 'Срібний',
      },
      {
        code: '#6bb9f9',
        name: 'Голубой',
        nameUa: 'Голубий',
      },
    ]);
  }
}
