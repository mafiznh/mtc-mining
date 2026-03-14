import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);

  // Clear existing data (optional, but good for resetting)
  await prisma.maintenanceLog.deleteMany();
  await prisma.equipment.deleteMany();

  const equipments = [
    {
      name: 'Excavator EX-2000',
      type: 'Excavator',
      status: 'Operational',
      location: 'Pit A West',
    },
    {
      name: 'Dump Truck DT-01',
      type: 'Haul Truck',
      status: 'Maintenance',
      location: 'Workshop 1',
    },
    {
      name: 'Dump Truck DT-02',
      type: 'Haul Truck',
      status: 'Operational',
      location: 'Pit A East',
    },
    {
      name: 'Dozer DZ-05',
      type: 'Dozer',
      status: 'Breakdown',
      location: 'Pit B North',
    },
    {
      name: 'Grader GR-12',
      type: 'Grader',
      status: 'Operational',
      location: 'Haul Road Main',
    },
  ];

  for (const eq of equipments) {
    const createdEquipment = await prisma.equipment.create({
      data: eq,
    });
    console.log(`Created equipment with id: ${createdEquipment.id}`);

    // Create some sample logs for each equipment
    if (eq.status === 'Maintenance' || eq.status === 'Breakdown') {
      await prisma.maintenanceLog.create({
        data: {
          equipmentId: createdEquipment.id,
          type: eq.status === 'Maintenance' ? 'PM' : 'CM', // PM = Preventive, CM = Corrective
          description: eq.status === 'Maintenance' ? 'Routine 500H Service' : 'Hydraulic pump failure',
          startTime: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
          status: 'In Progress',
        },
      });
    } else {
      // For operational equipment, add some completed logs
      await prisma.maintenanceLog.create({
        data: {
          equipmentId: createdEquipment.id,
          type: 'PM',
          description: 'Routine 250H Service',
          startTime: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
          endTime: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
          status: 'Completed',
        },
      });
    }
  }

  console.log(`Seeding finished.`);
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
