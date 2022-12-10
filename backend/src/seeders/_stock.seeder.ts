import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { StockEntity } from '@app/components/stock/entities/stock.entity';

export default class UserSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(StockEntity);
    await repository.insert([
      {
        name: 'Зима 2022',
        nameUa: 'Зима 2022',
        img: 'https://images.unsplash.com/photo-1607083206968-13611e3d76db?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1830&q=80',
        imgUa:
          'https://images.unsplash.com/photo-1607083206968-13611e3d76db?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1830&q=80',
        isActive: true,
      },
      {
        name: 'Осенние скидки',
        nameUa: 'Осінні знижки',
        img: 'https://images.unsplash.com/photo-1647221597996-54f3d0f73809?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2232&q=80',
        imgUa:
          'https://images.unsplash.com/photo-1647221597996-54f3d0f73809?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2232&q=80',
        isActive: true,
      },
      {
        name: 'Черная пятница',
        nameUa: "Чорна п'ятниця",
        img: 'https://images.unsplash.com/photo-1607083206325-caf1edba7a0f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1777&q=80',
        imgUa:
          'https://images.unsplash.com/photo-1607083206325-caf1edba7a0f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1777&q=80',
        isActive: true,
      },
    ]);
  }
}
