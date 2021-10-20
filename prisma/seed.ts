import path from 'path'
import * as fsp from 'fs/promises'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function deleteAll() {
  await prisma.license.deleteMany({})
  await prisma.image.deleteMany({})
  await prisma.internationalStatus.deleteMany({})
  await prisma.totalArea.deleteMany({})
  await prisma.coordinate.deleteMany({})
  await prisma.nationalPark.deleteMany({})
}

async function main() {
  await deleteAll()
  await seed()

  console.log('Database seeded!')
}

async function seed() {
  try {
    const parks = await readFile(path.join(process.cwd(), 'src/data/national-parks.json'))

    for (const park of parks) {
      const include = {}

      const data = {
        link: park.link,
        name: park.name,
        year: park.year,
        waters_percentages: park.waters_percentages,
        region: park.region,
        description: park?.description,
        map: park?.map,
        location: park?.location,
        established: park?.established,
        visitors: park?.visitors,
        management: park?.management,
      }

      if (park.image != null) {
        const newImage = await prisma.image.create({
          include: { license: true },
          data: {
            link: park.image.link,
            title: park.image.title,
            width: park.image.width,
            height: park.image.height,
            size: park.image.size,
            type: park.image.type,
            date: new Date(park.image.date),
            original_source: park.image.original_source,
            author: park.image.author,
            src: park.image.src,
            license: {
              connectOrCreate: park.image.license?.map(
                (license: { id: number; type: string; name: string; link: string }) => {
                  return {
                    where: { type: license.type },
                    create: {
                      type: license.type,
                      name: license.name,
                      link: license.link,
                    },
                  }
                },
              ),
            },
          },
        })

        Object.assign(data, { image: { connect: { id: newImage.id } } })
      }

      if (park.total_area != null) {
        Object.assign(include, { total_area: true })

        Object.assign(data, {
          total_area: {
            create: {
              km: park.total_area.km,
              miles: park.total_area.miles,
            },
          },
        })
      }

      if (park.coordinate != null && park.coordinate.latitude != null) {
        Object.assign(include, { coordinate: true })

        Object.assign(data, {
          coordinate: {
            create: { latitude: park.coordinate.latitude, longitude: park.coordinate.longitude },
          },
        })
      }

      if (park.intl_status != null && park.intl_status !== 'none') {
        Object.assign(include, { intl_status: true })

        Object.assign(data, {
          intl_status: {
            connectOrCreate: park.intl_status?.map((status: { id: number; name: string; link: string }) => {
              return {
                where: { link: status.link },
                create: {
                  name: status.name,
                  link: status.link,
                },
              }
            }),
          },
        })
      }

      try {
        await prisma.nationalPark.create({
          include,
          data,
        })
      } catch (error) {
        console.error(error)
      }
    }
  } catch (error) {
    console.error(error)
  }
}

async function readFile(filename: string) {
  const buffer = await fsp.readFile(filename, 'utf-8')
  const data = JSON.parse(buffer.toString())
  return data
}

main()
  .catch((e) => {
    console.error(e.message)
  })
  .finally(async () => {
    await prisma.$disconnect
  })
