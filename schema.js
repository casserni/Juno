import { makeExecutableSchema } from 'graphql-tools';
import { resolvers } from './resolvers';

const typeDefs =`
type Currency {
  id: ID!
  name: String
}

type Query {
  date: String
  currencies:[String]
}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });
export { schema };
