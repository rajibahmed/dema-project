const typeDefs = `#graphql

  type PageInfo {
    hasNextPage: Boolean
    hasPreviousPage: Boolean
    # first node in edges
    startCursor: String
    # last node in edges
    endCursor: String
  }

  type ProductEdge {
    cursor: String
    node: Product
  }

  type ProductConnection {
    edges: [ProductEdge]
    nodes: [Product]
    pageInfo: PageInfo!
    totalCount: Int!
  }

  type Product{
    productId: ID!
    name: String!
    quantity: Int!
    category: String!
    subCategory: String!
    orders: [Order]
  }

  type Order {
    orderId: ID!
    productId: ID!
    currency: String!
    quantity: Int!
    shippingCost: String!
    amount: Float!
    channel: String!
    campaign: String!
  }

  type Query {
    products(
      first: Int
      after: String
      last: Int
      before: String
    ): ProductConnection
  }

  input UpdateInventoryInput {
    quantity: Int!
    name: String
    category: String
    subCategory: String
  }

  type Mutation {
    updateInventory(id: ID!, input: UpdateInventoryInput!): Product!
  }
`;

export default typeDefs;
