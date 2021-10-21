const nationalPark = `
  scalar Date

  extend type Query{
    nationalParks: [NationalPark!]!
    nationalPark(id: ID!): NationalPark
  }

  type NationalPark {
    id: ID!
    name: String!
    image: [Image]
    link: String
    year: Int
    total_area: TotalArea
    waters_percentages: String
    intl_status: [InternationalStatus]
    region: String!
    description: String
    coordinate: Coordinate
    map: String
    location: String
    established: String
    visitors: String
    management: String
  }

  type InternationalStatus{
    id: Int
    name: String
    link: String
  }

  type Coordinate {
    latitude: Float
    longitude: Float 
  }

  type TotalArea {
    km: Int
    miles: Int 
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
    nationalPark: [NationalPark]
  }

  type License {
    id: Int
    type: String
    name: String
    link: String
  }
`

export default nationalPark
