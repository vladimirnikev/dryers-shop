import { ManufacturerEntity } from './../components/manufacturer/entities/manufacturer.entity';
import { EProductType } from '@app/common/enums/product-type.enum';
import { DryerEntity } from '@app/components/dryer/entities/dryer.entity';
import { setSeederFactory } from 'typeorm-extension';
import { ColorEntity } from '@app/components/color/entities/color.entity';
import { StockEntity } from '@app/components/stock/entities/stock.entity';

export default setSeederFactory(DryerEntity, (faker) => {
  const product = new DryerEntity();
  const images = [
    faker.image.unsplash.technology(),
    faker.image.business(),
    faker.image.city(),
    faker.image.technics(),
    faker.image.sports(),
  ];

  faker.setLocale('uk');
  product.nameUa = faker.commerce.productName();
  product.descriptionUa = faker.commerce.productDescription();
  product.imageUrls = images;
  product.mainImg = images[faker.helpers.arrayElement([0, 1, 2, 3, 4])];
  product.category = faker.helpers.arrayElement([
    EProductType.ACCESSORIES,
    EProductType.COMBINE,
    EProductType.ELECTRICITY,
    EProductType.WATER,
  ]);
  product.availability = faker.helpers.arrayElement([true, false]);
  product.price = +faker.random.numeric(faker.helpers.arrayElement([4, 5]));
  product.oldPrice = faker.helpers.maybe(
    () => {
      const oldPrice = +faker.random.numeric(faker.helpers.arrayElement([4, 5]));
      product.price = Math.floor(
        oldPrice - (oldPrice / 100) * faker.helpers.arrayElement([5, 10, 15, 20]),
      );
      return oldPrice;
    },
    { probability: 0.2 },
  );
  product.power = +faker.random.numeric();
  product.manufacturer = { id: faker.helpers.arrayElement([1, 2, 3]) } as ManufacturerEntity;
  product.colors = faker.helpers
    .arrayElements([1, 2, 3, 4, 5])
    .map((id) => ({ id })) as ColorEntity[];
  product.stocks = faker.helpers.maybe(
    () => {
      const oldPrice = +faker.random.numeric(faker.helpers.arrayElement([4, 5]));
      product.price = Math.floor(
        oldPrice - (oldPrice / 100) * faker.helpers.arrayElement([5, 10, 15, 20]),
      );
      product.oldPrice = oldPrice;
      return faker.helpers.arrayElements([1, 2, 3]).map((id) => ({ id }));
    },
    { probability: 0.2 },
  ) as StockEntity[];

  faker.setLocale('ru');
  product.name = faker.commerce.productName();
  product.description = faker.commerce.productDescription();

  return product;
});
