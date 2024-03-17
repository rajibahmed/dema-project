import { Product, Resolvers } from './types';

const resolvers: Resolvers = {
  Query: {
    products: async (_: any, { cursor }: any, { db: { inventory, order } }) => {
      return await inventory.findAll({ include: order });
    },
  },
  Product: {
    orders: (product: Product) => product?.Orders || [],
  },
};

export default resolvers;
