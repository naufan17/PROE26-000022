import { v4 as uuidv4 } from 'uuid';
import prisma from '../../src/config/database';
import bcrypt from 'bcryptjs';

async function main() {
  await prisma.users.createMany({
    data: [
      { id: uuidv4(), name: 'John Doe', email: 'john@example.com', role: 'admin', password: await bcrypt.hash('Password1234', 10) },
      { id: uuidv4(), name: 'Jane Doe', email: 'jane@example.com', role: 'user', password:  await bcrypt.hash('Password1234', 10) },
      { id: uuidv4(), name: 'Bob Smith', email: 'bob@example.com', role: 'user', password: await bcrypt.hash('Password1234', 10) },
      { id: uuidv4(), name: 'Alice Johnson', email: 'alice@example.com', role: 'user', password: await bcrypt.hash('Password1234', 10) },
    ],
  });

  // await prisma.accounts.createMany({
  //   data: [
  //     { id: uuidv4(), userId: 1, account_number: '1234567890', bank_name: "BPD DIY", balance: 1000000 },
  //   ],
  // });

  // await prisma.bills.createMany({
  //   data: [
  //     { id: uuidv4(), userId: 1, due_date: new Date('2024-12-31'), isPaid: false, accountId: 1, amount: 500000, dueDate: new Date('2024-12-31'), status: 'unpaid' },
  //     { id: uuidv4(), userId: 1, due_date: new Date('2024-12-31'), isPaid: true, accountId: 1, amount: 500000, dueDate: new Date('2024-12-31'), status: 'unpaid' },
  //   ],
  // });

  // await prisma.products.createMany({
  //   data: [
  //     { id: uuidv4(), name: 'SPP', price: 100000 },
  //     { id: uuidv4(), name: 'Praktikum', price: 200000 },
  //   ],
  // });

  console.log('Database seeded successfully');
}

main()
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });