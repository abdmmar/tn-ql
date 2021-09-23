# tn-ql

🔴 Unofficial GraphQL API for Indonesian National Park

## Development

Install all dependencies

```
npm install
```

Then, start development server

```
npm run dev
```

## Queries

| Query           | Desc                      |
| --------------- | ------------------------- |
| `nationalParks` | Get list of national park |

## Project Structure

```
src/ --> root
  data/ --> current national parks data
  resolvers/ --> all resolvers
  typeDefs/ --> all schema definition
```

## Contributing

Feel free to [submit an issues](https://github.com/abdmmar/tn-ql/issues) and create
[pull requests](https://github.com/abdmmar/tn-ql/pulls).

## References

For more information about using Typescript with Apollo-server, and GraphQL, see:

- https://cloudnweb.dev/2020/05/nodejs-graphql-typescript-starter-part-3/

- https://www.section.io/engineering-education/how-to-use-typescript-with-nodejs/

- https://deepak-v.medium.com/build-a-scalable-graphql-server-using-typescript-and-apollo-server-4c116ed1425e

- https://mbbaig.blog/apollo-server-typescript/

## License

[MIT](LICENSE)
