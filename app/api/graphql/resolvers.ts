import { Edge, connectionFromArraySlice, fromGlobalId } from 'graphql-relay';
import { Product, QueryProductsArgs, Resolvers } from './types';
import { GraphQLError } from 'graphql';

const validatePaginationArgs = (args: QueryProductsArgs): void => {
  const { first, last } = args || {};

  if (first === undefined && last === undefined)
    throw new GraphQLError('Can not query for both first and last');

  if (first !== undefined && last !== undefined)
    throw new GraphQLError(
      'Passing both `first` and `last` to paginate connections is not supported.'
    );

  if (first && first < 0)
    throw new GraphQLError(
      '"Pagination parameter `first` cannot be less than zero."'
    );
  if (last && last < 0)
    throw new GraphQLError(
      '"Pagination parameter `last` cannot be less than zero."'
    );
};

const toConnection =
  (totalCount: number) => (connection: any, edge: Edge<Product>) => {
    connection.nodes.push(edge.node);
    connection.edges.push(edge);
    connection.totalCount = totalCount;
    return connection;
  };

const resolvers: Resolvers = {
  Query: {
    products: async (root: unknown, args, { db: { inventory, order } }) => {
      validatePaginationArgs(args);

      const offset = args.after ? Number(fromGlobalId(args.after).id) : 0;

      const data = await inventory.findAll({
        order: [['id', 'ASC']],
        offset,
        limit: args.first || 10,
        include: { model: order, as: 'orders' },
      });

      if (!data) return null;

      const totalCount = Number(await inventory.count()) || 0;

      const { edges, pageInfo } = connectionFromArraySlice<Product>(
        data,
        args || {},
        {
          sliceStart: offset,
          arrayLength: totalCount,
        }
      );

      return edges.reduce(toConnection(totalCount), {
        pageInfo,
        nodes: [],
        edges: [],
        totalCount,
      });
    },
  },
  Product: {
    orders: (product: Product) => product?.orders || [],
  },
};

export default resolvers;
