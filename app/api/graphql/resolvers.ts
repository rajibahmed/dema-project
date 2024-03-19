import { Product, Resolvers } from './types';

const resolvers: Resolvers = {
  Query: {
    products: async (_: any, args, { db: { inventory, order } }) =>
      await inventory.findAll({ include: { model: order, as: 'orders' } }),
  },
  Product: {
    orders: (product: Product) => product?.orders || [],
  },
};

export default resolvers;
