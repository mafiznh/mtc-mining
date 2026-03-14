import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis;
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const equipment = await prisma.equipment.findMany({
        orderBy: { updatedAt: 'desc' },
      });
      return res.status(200).json(equipment);
    } catch (error) {
      console.error('Error fetching equipment:', error);
      return res.status(500).json({ error: 'Failed to fetch equipment data' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
