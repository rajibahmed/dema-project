import resolver from '@/app/api/graphql/resolvers';

import SequelizeMock from 'sequelize-mock';
import { Product } from './types';

const newProduct = (productId: string): Product => ({
  productId,
  name: 'Name' + productId,
  quantity: 5,
  category: 'Cloths',
  subCategory: 'Hoodies',
  orders: [],
});

const newOrder = (product: Product) => ({
  orderId: 'orderId' + product.productId,
  currency: 'SEK',
});

describe('test product query', () => {
  let sequelizeMock;
  let inventoryMock: any;
  let products: string | any[];

  beforeAll(() => {
    sequelizeMock = new SequelizeMock();
    inventoryMock = sequelizeMock.define('Inventory', {});
    products = [newProduct('product#1')];
    inventoryMock['count'] = () => products.length;
  });

  it('gets all products', async () => {
    inventoryMock.$queueResult(products);

    const data = await resolver.Query?.products(
      {},
      { first: 5 },
      { db: { inventory: inventoryMock } }
    );

    expect(data.nodes.length).toEqual(1);
    expect(data.nodes[0].productId).toEqual('product#1');
  });
});
