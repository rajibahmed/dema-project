import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { NextRequest } from "next/server";
import schema from "./schema";
import resolvers from "./resolvers";
import { Sequelize } from "sequelize";

const uri = process.env.DB_URL;

const connectDB = async () => {
  try {
    if (uri) {
      console.log(`DB URL ${uri}`);
      const sequelize = new Sequelize(uri, { dialect: "postgres" });
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");

      return sequelize;
    }
  } catch (error) {
    console.error(error);
  }
};

connectDB();

const server = new ApolloServer({
  resolvers,
  typeDefs: schema,
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req, res) => ({
    req,
    res,
    dataSources: {},
  }),
});

export async function GET(request: NextRequest) {
  return handler(request);
}
export async function POST(request: NextRequest) {
  return handler(request);
}
