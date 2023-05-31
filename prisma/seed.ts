import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);

  try {
    const subdomains = ["example-one", "example-two", "example-three"];

    for (const subdomain of subdomains) {
      const site = await prisma.site.create({
        data: {
          // Development ID
          name: `Website ${subdomain}`,
          subdomain: subdomain,
          customDomain: `${subdomain}.com`,
        },
      });
      console.log(`Created site with id: ${site.id}`);

      await prisma.post.createMany({
        data: [
          {
            title: faker.lorem.words(3),
            description: faker.lorem.sentence(),
            content: faker.lorem.sentences(3),
            slug: "first-post",
            published: true,
            siteId: site.id,
            image: "https://unsplash.it/640/425",
          },
          {
            title: faker.lorem.words(3),
            description: faker.lorem.sentence(),
            content: faker.lorem.sentences(3),
            slug: "second-post",
            published: true,
            siteId: site.id,
            image: "https://unsplash.it/640/425",
          },
          {
            title: faker.lorem.words(3),
            description: faker.lorem.sentence(),
            content: faker.lorem.sentences(3),
            slug: "third-post",
            published: true,
            siteId: site.id,
            image: "https://unsplash.it/640/425",
          },
        ],
      });
    }
  } catch (err) {
    console.log(`Error seeding site`, (err as Error).message);
  }

  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
