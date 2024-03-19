import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { ApolloServer } from '@apollo/server';
import schema from './schema';
import resolvers from './resolvers';
import inventory from '@/app/db/models/inventory';
import order from '@/app/db/models/order';
import { sequelize, checkDBConnection } from '@/app/db';
import { DataTypes } from 'sequelize';
import { NextRequest, NextResponse } from 'next/server';

checkDBConnection();

// setup ORM relationships
const Order = order(sequelize, DataTypes);
const Inventory = inventory(sequelize, DataTypes);
Inventory.hasMany(Order, { foreignKey: 'productId', as: 'orders' });

type AppContext = {
  req?: NextRequest;
  res?: NextResponse;
  db?: {
    inventory: typeof Inventory;
    order: typeof Order;
  };
};

const server = new ApolloServer<AppContext>({
  resolvers,
  typeDefs: schema,
});

const handler = startServerAndCreateNextHandler<NextRequest, AppContext>(
  server,
  {
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
  }
);

export async function GET(request: NextRequest) {
  return handler(request);
}
export async function POST(request: NextRequest) {
  return handler(request);
}
