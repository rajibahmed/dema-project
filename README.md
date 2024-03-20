## Getting Started

First, run the development server:

```
docker-compose up --build
docker-compose exec -it backend npm run seed
```

Open [http://localhost:3000/api/graphql](http://localhost:3000/api/graphql) with your browser to see the result.

### forward pagination query

```graphql
query getProducts($count: Int, $cursor: String) {
  products(first: $count, after: $cursor) {
    edges {
      node {
        productId
        category
      }
      cursor
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    totalCount
  }
}
// variables
// {
//   first: 5
// }
```

### Mutation

```graphql
mutation Mutation($updateInventoryId: ID!, $input: UpdateInventoryInput!) {
  product: updateInventory(id: $updateInventoryId, input: $input) {
    productId
    name
    quantity
    orders {
      amount
    }
  }
}

// variables
// {
//    "updateInventoryId": "prod1519#prod100001000050",
//    "input": {
//        "name": "Updated",
//        "quantity": 5
//    }
// }
```
