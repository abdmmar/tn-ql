import nationalPark from './nationalPark'

const schema = `
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
`

export default [schema, nationalPark]
