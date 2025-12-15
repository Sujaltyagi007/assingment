import prisma from "@/lib/prisma";

async function main() {
  const user = await prisma.user.upsert({
    where: { email: "RootAdmin@gmail.com" },
    update: {},
    create: {
      email: "RootAdmin@gmail.com",
      role: "SUPERADMIN",
      username: "RootAdmin",
      password: await bcrypt.hash("RootAdmin#@123", 10),
    },
  });
  console.log({ user });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
