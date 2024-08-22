import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const hashPassword = async (password: string) => {
  const hashRounds = parseInt(process.env.HASH_ROUNDS as string);
  return await bcrypt.hash(password, hashRounds);
};

const main = async () => {
  await prisma.user.create({
    data: {
      email: 'admin@example.com',
      password: await hashPassword('admin123'),
    },
  });
};

main();
