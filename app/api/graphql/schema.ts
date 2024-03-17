const typeDefs = `#graphql
  scalar Cursor

  type PageInfo {
    hasNextPage: Boolean!
  }

  type ProductEdge {
    cursor: Cursor!
    node: Product!
  }

  type ProductsConnection {
    edges: [ProductEdge!]!
    pageInfo: PageInfo!
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
    productId: String!
    currency: String!
    quantity: Int!
    shippingCost: String!
    amount: Float!
    channel: String!
    campaign: String!
  }

  type Query {
    products: [Product]
  }

`;

export default typeDefs;
