import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis;
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const equipmentCount = await prisma.equipment.count();
      const logsCount = await prisma.maintenanceLog.count();

      // Placeholder KPI metrics integrated with DB existence logic
      const data = {
        PA: equipmentCount > 0 ? 85.5 : 0,
        UA: equipmentCount > 0 ? 75.0 : 0,
        EU: equipmentCount > 0 ? 64.1 : 0,
        MTTR: logsCount > 0 ? 4.2 : 0,
        MTBF: logsCount > 0 ? 120.5 : 0,
        equipmentCount,
        logsCount
      };

      return res.status(200).json(data);
    } catch (error) {
      console.error('Error fetching KPIs:', error);
      return res.status(500).json({ error: 'Failed to fetch KPI data' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
