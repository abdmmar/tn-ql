import nationalPark from './nationalPark'
import image from './image'

const schema = `
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
`

export default [schema, nationalPark, image]
