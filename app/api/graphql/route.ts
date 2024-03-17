import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { ApolloServer } from '@apollo/server';
import { NextRequest } from 'next/server';
import schema from './schema';
import resolvers from './resolvers';
import inventory from '../../db/models/inventory';
import order from '../../db/models/order';
import { sequelize, checkDBConnection } from './db';
import { DataTypes } from 'sequelize';

checkDBConnection();

const Order = order(sequelize, DataTypes);
const Inventory = inventory(sequelize, DataTypes);
Inventory.hasMany(Order, { foreignKey: 'productId' });

type AppContext = {
  db: {
    inventory: typeof Inventory;
    order: typeof Order;
  };
};

const server = new ApolloServer<AppContext>({
  resolvers,
  typeDefs: schema,
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req, res) => {
    return {
      req,
      res,
      db: {
        inventory: Inventory,
        order: Order,
      },
    };
  },
});

export async function GET(request: NextRequest) {
  return handler(request);
}
export async function POST(request: NextRequest) {
  return handler(request);
}
