const image = `
  scalar Date

  extend type Query{
    images: [Image!]
    image(id: ID!): Image
  }

  type Image {
    id: Int
    link: String
    title: String
    width: Int
    height: Int
    size: String
    type: String
    date: Date
    original_source: String
    author: String
    src: String
    license: [License!]
  }

  type License {
    id: Int
    type: String
    name: String
    link: String
  }
`

export default image
