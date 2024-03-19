import resolver from '@/app/api/graphql/resolvers';

import SequelizeMock from 'sequelize-mock';
import { Product } from './types';
import { GraphQLError } from 'graphql';

const newProduct = (id: number): Product & { id: number } => ({
  id,
  productId: `product#${id}`,
  name: 'Name ' + id,
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
    products = [newProduct(1), newProduct(2), newProduct(3)];
    inventoryMock['count'] = () => products.length;
  });

  it('gets all products', async () => {
    inventoryMock.$queueResult(products);

    const data = await resolver.Query?.products(
      {},
      { first: 3 },
      { db: { inventory: inventoryMock } }
    );

    expect(data.nodes.length).toEqual(3);
    expect(data.nodes[0].productId).toEqual('product#1');

    inventoryMock.$queueResult(products);
  });
});
