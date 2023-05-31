import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);

  try {
    const site = await prisma.site.create({
      data: {
        // Development ID
        name: "Test site",
        subdomain: "test",
        customDomain: "customdomain.com",
      },
    });
    console.log(`Created site with id: ${site.id}`);

    await prisma.post.create({
      data: {
        title: "First post",
        description: "Required",
        content: "Required",
        slug: "first-post",
        published: true,
        site: {
          connect: {
            id: site.id,
          },
        },
      },
    });
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
