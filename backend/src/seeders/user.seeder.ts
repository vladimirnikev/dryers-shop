import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { UserEntity } from '@app/components/user/entities/user.entity';
import { hash } from 'bcrypt';

export default class UserSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(UserEntity);
    const password = await hash('easypassword', 10);
    await repository.insert([
      {
        name: 'John',
        surname: 'Pitt',
        username: 'admin@gmail.com',
        email: 'admin@gmail.com',
        password,
        role: 'ADMIN',
      },
    ]);
  }
}
