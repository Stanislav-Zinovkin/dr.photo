import { PrismaClient } from "@prisma/client";
import { serviceConfig } from "@/data/services";

const prisma = new PrismaClient();

async function main() {
    for ( const service of serviceConfig) {
        await prisma.service.upsert({
            where: { id: service.id },
            update: {
                price: service.price,
                title: service.title,
            },
            create: {
                id: service.id,
                title: service.title,
                price: service.price,
            },
        });
    }

}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  } );