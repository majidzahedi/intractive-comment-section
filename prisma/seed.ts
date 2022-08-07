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
            "چشمگیر! اگرچه به نظر می رسد ویژگی کشیدن می تواند بهبود یابد. اما در کل باور نکردنی به نظر می رسد. شما طراحی را ثابت کرده اید و پاسخگویی در نقاط شکست مختلف واقعاً خوب عمل می کند.",
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
            "وای، پروژه شما عالی به نظر می رسد! چند وقته که کدنویسی میکنی؟ من هنوز تازه کار هستم، اما فکر می کنم می خواهم به زودی وارد React نیز شوم. شاید بتوانید اطلاعاتی در مورد اینکه کجا می توانم React را یاد بگیرم به من بدهید؟ با تشکر!",
          children: {
            create: {
              comment:
                "اگر هنوز تازه کار هستید، توصیه می‌کنم قبل از بررسی React روی اصول HTML، CSS و JS تمرکز کنید. این بسیار وسوسه انگیز است که به جلو بپرید اما ابتدا یک پایه محکم بگذارید.",
              user: {
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
