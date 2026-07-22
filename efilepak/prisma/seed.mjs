// Seeds a staff/admin account so the team can access the admin queue.
// Run: npm run db:seed
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const email = process.env.SEED_ADMIN_EMAIL || "admin@efilepak.pk";
const password = process.env.SEED_ADMIN_PASSWORD || "ChangeMe123!";

const passwordHash = await bcrypt.hash(password, 10);

await prisma.user.upsert({
  where: { email },
  update: { role: "STAFF" },
  create: {
    email,
    name: "eFile Pak Admin",
    role: "STAFF",
    passwordHash,
  },
});

console.log(`Seeded STAFF user: ${email}`);
await prisma.$disconnect();
