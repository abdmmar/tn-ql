import { GraphQLScalarType } from 'graphql'

const dateScalar = new GraphQLScalarType({
  name: 'Date',
  parseValue(value) {
    return new Date(value)
  },
  serialize(value) {
    return value.toISOString()
  },
})

const scalar = {
  Date: dateScalar,
}

export default scalar
