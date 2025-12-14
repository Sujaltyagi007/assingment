import { PrismaClient } from "@/lib/generated/prisma/client.js";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const { email, password, username } = await req.json();
  const prisma = new PrismaClient();
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    });
    return NextResponse.json(
      { message: "User created successfully" },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  } finally {
    await prisma.$disconnect();
  }
}
