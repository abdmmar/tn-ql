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

  const newImage = await prisma.image.create({
    include: {
      license: true,
    },
    data: {
      link: 'https://id.wikipedia.org/wiki/Berkas:Gunung_Leuser_National_Park_Jungle_Life.jpg',
      title: 'Gunung Leuser National Park Jungle Life.jpg',
      width: 1000,
      height: 732,
      size: '616 KB',
      type: 'image/jpeg',
      date: new Date('2008-10-13'),
      original_source: 'https://www.flickr.com/photos/98073722@N00/2938561872/',
      author: 'flydime',
      src: 'https://upload.wikimedia.org/wikipedia/commons/3/3d/Gunung_Leuser_National_Park_Jungle_Life.jpg',
      license: {
        create: [
          {
            type: 'CC BY 2.0',
            link: 'https://creativecommons.org/licenses/by/2.0',
          },
        ],
      },
    },
  })

  const newPark = await prisma.nationalPark.create({
    include: {
      total_area: true,
      coordinate: true,
      intl_status: true,
    },
    data: {
      image: {
        connect: { id: newImage.id },
      },
      link: 'https://id.wikipedia.org/wiki/Taman_Nasional_Gunung_Leuser',
      name: 'Taman Nasional Gunung Leuser',
      year: 1980,
      total_area: { create: { km: 7927, miles: 3061 } },
      waters_percentages: 'none',
      intl_status: {
        create: [
          { status: 'Unit Situs Warisan Dunia' },
          { status: 'World Network of Biosphere Reserves' },
          { status: 'Taman Warisan ASEAN' },
        ],
      },
      region: 'Sumatra',
      description:
        'Taman Nasional Gunung Leuser biasa disingkat TNGL adalah salah satu Kawasan Pelestarian Alam di Indonesia seluas 1.094.692 hektare yang secara administrasi pemerintahan terletak di Provinsi Aceh dan Sumatra Utara. Provinsi Aceh yang terdeliniasi TNGL meliputi Kabupaten Subulussalam, Aceh Selatan, Aceh Singkil, Aceh Tengah, Aceh Tenggara, Gayo Lues, Bener Meriah, Aceh Tamiang, sedangkan Provinsi Sumatra Utara yang terdeliniasi TNGL meliputi Kabupaten Dairi, Karo, dan Langkat.[1]\nTaman nasional ini mengambil nama dari Gunung Leuser yang menjulang tinggi dengan ketinggian 3404 meter di atas permukaan laut di Aceh. Taman nasional ini meliputi ekosistem asli dari pantai sampai pegunungan tinggi yang diliputi oleh hutan lebat khas hujan tropis. Dikelola dengan sistem zonasi yang dimanfaatkan untuk tujuan penelitian, ilmu pengetahuan, pendidikan, menunjang budidaya, pariwisata, dan rekreasi.\nTaman Nasional Gunung Leuser memiliki 3 (tiga) fungsi yaitu:\n1. Perlindungan sistem penyangga kehidupan;\n2. Pengawetan keanekaragaman jenis tumbuhan dan satwa beserta ekosistemnya;\n3. Pemanfaatan secara lestari sumber daya alam hayati dan ekosistemnya.\nDiterimanya Warisan Hutan Hujan Tropis Sumatra ke daftar Situs Warisan Dunia pada tahun 2004, membuat Taman Nasional Gunung Leuser juga masuk dalam daftar Situs Warisan Dunia oleh UNESCO, bersama dengan Taman Nasional Kerinci Seblat dan Taman Nasional Bukit Barisan Selatan.\nSebagai dasar legalitas dalam rangkaian proses pengukuhan kawasan hutan telah dikeluarkan Keputusan Menteri Kehutanan Nomor: 276/Kpts-II/1997 tentang Penunjukan Taman Nasional Gunung Leuser seluas 1.094.692 hektare yang terletak di Provinsi daerah Istimewa Aceh dan Sumatra Utara. Dalam keputusan tersebut disebutkan bahwa Taman Nasional Gunung Leuser terdiri dari gabungan:\n1. Suaka Margasatwa Gunung Leuser: 416.500 hektare\n2. Suaka Margasatwa Kluet: 20.000 hektare\n3. Suaka Margasatwa Langkat Barat: 51.000 hektare\n4. Suaka Margasatwa Langkat Selatan: 82.985 hektare\n5. Suaka Margasatwa Sekundur: 60.600 hektare\n6. Suaka Margasatwa Kappi: 142.800 hektare\n7. Taman Wisata Gurah: 9.200 hektare\n8. Hutan Lindung dan Hutan Produksi Terbatas: 292.707 hektare\nSesuai Peraturan Menteri Kehutanan Nomor: P.03/Menhut-II/2007, Saat ini pengelola TNGL adalah Unit Pelaksana Teknis (UPT) Direktorat Jenderal Perlindungan Hutan dan Konservasi Alam (Ditjen PHKA)Departemen Kehutanan yaitu Balai Besar Taman Nasional Gunung Leuser (BBTNGL) yang dipimpin oleh Kepala Balai Besar (setingkat eselon II).\nSalah satu Objek dan Daya Tarik Wisata Alam (ODTWA) yang terkenal di dalam kawasan TNGL adalah Pusat Pengamatan Orangutan Sumatra - Bukit Lawang di Kawasan Wisata Alam Bukit Lawang - Bohorok, Kabupaten Langkat, Sumatra Utara.[2]\nPada sisi lain, taman nasional ini juga mendapat perhatian karena maraknya kasus penebangan pohon illegal di beberapa lokasi yang menyalahi reservasi lingkungan.[3] Sebagian besar kawasan TNGL memiliki topografi curam serta struktur dan tekstur tanah yang rentan terhadap longsor. Hal ini terbukti pada saat banjir bandang telah menghancurkan kawasan wisata alam Bukit Lawang beberapa tahun lalu. Untuk lebih menjaga TNGL\ndari kerusakan yang lebih parah, dibentuklah suatu kawasan yang disebut Kawasan Ekosistem Leuser. Kawasan yang memiliki luas 2,6 juta hektare ini meliputi area yang lebih datar di sekeliling TNGL dan berfungsi sebagai penyangga (buffer).\n',
      coordinate: { create: { latitude: '3°46′21.6″N', longitude: '97°14′43.5″E' } },
      map: 'https://id.wikipedia.org/wiki/Berkas:Indonesia_North_Sumatra_location_map.svg',
      location: 'Sumatera Utara, Indonesia',
      established: '1997',
      management: 'Balai Besar TN Gunung Leuser',
    },
  })

  console.log('Database seeded!')
}

main()
  .catch((e) => {
    console.error(e.message)
  })
  .finally(async () => {
    await prisma.$disconnect
  })
