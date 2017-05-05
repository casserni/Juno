import { makeExecutableSchema } from 'graphql-tools';
import { resolvers } from './resolvers';

const typeDefs =`
type Query {
  date: String
  currencies:[String]
  rate: Float
}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });
export { schema };
