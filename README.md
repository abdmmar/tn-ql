# tn-ql

🔴 Unofficial GraphQL API for Indonesia National Park

## Development

Install all dependencies

```
npm install
```

Then, start development server on locahost:4000

```
npm run dev
```

## Deployment

**tn-ql** use docker, docker-compose, and caddy to make deployment a bit easier.

If you already have docker and docker-compose installed on your machine:

- First, change domain with yours or use localhost on `Caddyfile`

  ```
  // Change the domain below with your domain or just use localhost
  // To use localhost, change to :port e.g. :4040

  tnql.abdmmar.tech {
    // server:4000 is the docker container running the Node.js application, in this case it's exposed on port 4000

    reverse_proxy server:4000
  }
  ```

- Then, create volume because Caddy use the external data

  ```
  docker volume create caddy_data
  ```

- Finally, run the container

  ```
  docker-compose up -d --build
  ```

See [official documentation](https://caddyserver.com/docs) or [official image](https://hub.docker.com/_/caddy)
to learn more about Caddy

## Queries

| Query              | Desc                      |
| ------------------ | ------------------------- |
| `nationalParks`    | Get list of national park |
| `nationalPark(id)` | Get national park by id   |
| `images`           | Get list of image         |
| `image(id)`        | Get image by id           |

## Project Structure

```
prisma/ --> about database
  schema.prisma --> contains database schema
  seed.ts --> script to seed the database based on src/data/
  dev.db --> sqlite database
src/ --> root directory
  data/ --> containts data that used to populate database
  resolvers/ --> contains all resolvers
  typeDefs/ --> contains all schema definition
  types/ --> contains all types (NationalPark, Image, License, etc)
```

## Contributing

Feel free to [submit an issues](https://github.com/abdmmar/tn-ql/issues) and create
[pull requests](https://github.com/abdmmar/tn-ql/pulls).

## License

[MIT](LICENSE)
