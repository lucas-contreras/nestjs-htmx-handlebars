import 'reflect-metadata';
import 'dotenv/config';
import { DataSource } from 'typeorm';
import { Make } from './make/entity/make.entity';
import { Vehicle, VehicleColor } from './vehicle/entity/vehicle.entity';

const randInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const randomFrom = <T>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

const modelsByManufacturer: Record<string, string[]> = {
  toyota: ['Corolla', 'Camry', 'RAV4', 'Highlander', 'Prius', 'C-HR'],
  volkswagen: ['Golf', 'Passat', 'Tiguan', 'Polo', 'Jetta', 'Arteon'],
  hyundai: ['Elantra', 'Sonata', 'Santa Fe', 'Tucson', 'Kona', 'Palisade'],
  'fiat chrysler': [
    'Chrysler 300',
    'Dodge Charger',
    'Jeep Wrangler',
    'Ram 1500',
    'Dodge Durango',
  ],
  chevrolet: ['Silverado', 'Malibu', 'Equinox', 'Tahoe', 'Camaro', 'Trax'],
  cadillac: ['CT4', 'CT5', 'Escalade', 'XT4', 'XT5'],
  ford: ['F-150', 'Focus', 'Mustang', 'Explorer', 'Escape', 'Edge'],
  honda: ['Civic', 'Accord', 'CR-V', 'Pilot', 'HR-V', 'Fit'],
  nissan: ['Sentra', 'Altima', 'Leaf', 'Rogue', 'Murano', 'Pathfinder'],
  suzuki: ['Swift', 'Vitara', 'Ignis', 'SX4', 'Baleno'],
  bmw: ['3 Series', '5 Series', 'X3', 'X5', '2 Series', 'i3'],
  mercedes: ['C-Class', 'E-Class', 'GLC', 'GLE', 'A-Class'],
  renault: ['Clio', 'Megane', 'Captur', 'Kangoo', 'Zoe'],
  tesla: ['Model S', 'Model 3', 'Model X', 'Model Y'],
};

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [Make, Vehicle],
  synchronize: false,
  logging: false,
});

async function seed() {
  await AppDataSource.initialize();

  const makeRepo = AppDataSource.getRepository(Make);
  const vehicleRepo = AppDataSource.getRepository(Vehicle);

  const makes = await makeRepo.find();

  if (makes.length === 0) {
    await makeRepo.save([
      makeRepo.create({
        manufacturer: 'Toyota',
        description: 'Japanese car manufacturer',
      }),
      makeRepo.create({
        manufacturer: 'Volkswagen Group',
        description: 'German automotive manufacturer',
      }),
      makeRepo.create({
        manufacturer: 'Hyundai Motor Group',
        description: 'South Korean automotive manufacturer',
      }),
      makeRepo.create({
        manufacturer: 'Fiat Chrysler Automobiles',
        description: 'Italian-American automotive manufacturer',
      }),
      makeRepo.create({
        manufacturer: 'Chevrolet',
        description: 'American automotive manufacturer',
      }),
      makeRepo.create({
        manufacturer: 'Cadillac',
        description: 'American luxury automotive manufacturer',
      }),
      makeRepo.create({
        manufacturer: 'Ford Motor Company',
        description: 'American luxury automotive manufacturer',
      }),
      makeRepo.create({
        manufacturer: 'Honda Motor Co., Ltd.',
        description: 'Japanese automotive manufacturer',
      }),
      makeRepo.create({
        manufacturer: 'Nissan Motor Corporation',
        description: 'Japanese automotive manufacturer',
      }),
      makeRepo.create({
        manufacturer: 'Suzuki Motor Corporation',
        description: 'Japanese automotive manufacturer',
      }),
      makeRepo.create({
        manufacturer: 'BMW AG',
        description: 'German luxury automotive manufacturer',
      }),
      makeRepo.create({
        manufacturer: 'Mercedes-Benz Group',
        description: 'German luxury automotive manufacturer',
      }),
      makeRepo.create({
        manufacturer: 'Renault SA',
        description: 'French automotive manufacturer',
      }),
      makeRepo.create({
        manufacturer: 'Tesla, Inc.',
        description: 'American electric vehicle manufacturer',
      }),
    ]);
  } else {
    console.log(`Makes already seeded (${makes.length} records)`);
  }

  const vehicles = await vehicleRepo.find();

  if (vehicles.length === 0) {
    const colors = Object.values(VehicleColor);
    const vehiclesToSave: any[] = [];

    for (const make of makes) {
      const key = (make.manufacturer || '').toLowerCase();

      // find matching model list by checking known keys (substring match)
      const modelsForMake = Object.entries(modelsByManufacturer).find(([k]) =>
        key.includes(k),
      )?.[1] ?? ['Standard', 'LX', 'Sport', 'SE'];

      // 2 new vehicles (mileage = 0)
      for (let i = 0; i < 2; i++) {
        vehiclesToSave.push(
          vehicleRepo.create({
            make,
            model: randomFrom(modelsForMake),
            year: randInt(2019, 2025),
            color: randomFrom(colors),
            mileage: 0,
            available: true,
          }),
        );
      }

      // 3 used vehicles with random mileage
      for (let i = 0; i < 3; i++) {
        vehiclesToSave.push(
          vehicleRepo.create({
            make,
            model: randomFrom(modelsForMake),
            year: randInt(2019, 2025),
            color: randomFrom(colors),
            mileage: randInt(300, 150000),
            available: Math.random() < 0.9, // most available
          }),
        );
      }
    }

    await vehicleRepo.save(vehiclesToSave);
  } else {
    console.log(`Vehicles already seeded (${vehicles.length} records)`);
  }

  await AppDataSource.destroy();
  console.log('Seeding complete');
}

seed().catch((err) => {
  console.error('Seed error', err);
  process.exit(1);
});
