import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";


const prisma = new PrismaClient();

const main = async () => {
  const hashedPassword = await hash("admin", 10);
  await prisma.user.create({
    data: {
      name: "Majid Zahedi",
      email: "majidzahedi@hotmail.com",
      password: { create: { hash: hashedPassword } },
    },
  });

};

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
