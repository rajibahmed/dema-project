const resolvers = {
  Query: {
    users: () => {
      return [
        {
          id: 1,
          name: "Rajib",
        },
      ];
    },
  },
  Mutation: {},
};

export default resolvers;
