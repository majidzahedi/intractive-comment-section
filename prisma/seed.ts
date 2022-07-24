import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

const main = async () => {
  const hashedPassword = await hash("admin", 10);

  await prisma.user.create({
    data: {
      name: "juliusomo",
      email: "juliusomo@email.com",
      password: { create: { hash: hashedPassword } },
    },
  });

  await prisma.user.create({
    data: {
      name: "amyrobson",
      email: "amyrobson@email.com",
      password: { create: { hash: hashedPassword } },
      comments: {
        create: {
          comment:
            "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
        },
      },
    },
  });

  await prisma.user.create({
    data: {
      name: "maxblagun",
      email: "maxblagun@email.com",
      password: { create: { hash: hashedPassword } },
      comments: {
        create: {
          comment:
            "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
          Children: {
            create: {
              comment:
                "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
              User: {
                create: {
                  name: "ramsesmiron",
                  email: "ramsesmiron@email.com",
                  password: { create: { hash: hashedPassword } },
                },
              },
            },
          },
        },
      },
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
