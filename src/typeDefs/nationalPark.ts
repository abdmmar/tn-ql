const nationalPark = `
  extend type Query{
    nationalParks: [NationalPark!]!
  }

  type NationalPark {
    id: ID!
    name: String!
    image: Image
    link: String!
    year: Int
    total_area: TotalArea
    waters_percentages: String
    intl_status: String
    region: String!
    description: String
    coordinate: Coordinate
    map: String
    location: String
    established: String
    visitors: String
    management: String
  }

  type Coordinate {
    latitude: String
    longitude: String 
  }

  type TotalArea {
    km: String
    miles: String 
  }

  type Image {
    link: String
    title: String
    width: String
    height: String
    size: String
    type: String
    date: String
    original_source: String
    author: String
    src: String
    license: [License!]
  }

  type License {
    type: String
    link: String
  }
`

export default nationalPark
