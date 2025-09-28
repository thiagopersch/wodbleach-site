import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create default account
  const hashedPassword = await bcrypt.hash('1', 10); // SHA1 equivalent for testing

  const account = await prisma.account.upsert({
    where: { name: 'admin' },
    update: {},
    create: {
      name: 'admin',
      password: hashedPassword,
      email: 'admin@example.com',
      premdays: 365,
      groupId: 1,
    },
  });

  // Create sample monster
  const demon = await prisma.monster.upsert({
    where: { name: 'Demon' },
    update: {},
    create: {
      name: 'Demon',
      description: 'A powerful demon from the depths of hell.',
      race: 'fire',
      experience: 6000,
      speed: 280,
      manacost: 0,
      skull: 0,
      healthNow: 8200,
      healthMax: 8200,
      lookTypeId: 35,
      lookHead: 0,
      lookBody: 0,
      lookLegs: 0,
      lookFeet: 0,
      lookAddons: 0,
      lookMount: 0,
      flag_targetDistance: 1,
      flag_staticAttackChance: 90,
      flag_maxSummons: 0,
      flag_fleesHealth: 0,
      flag_pushable: false,
      flag_attackable: true,
      flag_hostile: true,
      flag_illusionable: false,
      flag_convinceable: false,
      flag_pushObjects: true,
      flag_pushCreatures: false,
      targetchangeChance: 0,
      flag_runonHealth: 0,
      immunity_physical: false,
      immunity_energy: false,
      immunity_fire: false,
      immunity_poison: false,
      immunity_ice: false,
      immunity_holy: false,
      immunity_death: false,
      immunity_drown: false,
      immunity_lifedrain: false,
      immunity_manadrain: false,
      immunity_paralyze: false,
      immunity_outfit: false,
      immunity_drunk: false,
      immunity_invisible: false,
      elements_fire_percent: '0',
      elements_energy_percent: '0',
      elements_ice_percent: '0',
      elements_poison_percent: '0',
      elements_holy_percent: '0',
      elements_death_percent: '0',
      elements_drown_percent: '0',
      elements_physical_percent: '0',
      elements_lifedrain_percent: '0',
      elements_manadrain_percent: '0',
      elements_healing_percent: '0',
      elements_undefined_percent: '0',
      attacks: {
        create: [
          {
            name: 'melee',
            interval: 2000,
            chance: 100,
            range: 1,
            min: 0,
            max: 580,
            target: 1,
            speedchange: 4000,
            duration: 2000,
            is_attack_simple: false,
          },
          {
            name: 'fire wave',
            interval: 2000,
            chance: 15,
            range: 7,
            min: 300,
            max: 750,
            target: 1,
          },
        ],
      },
      defenses: {
        create: [
          {
            name: 'healing',
            interval: 2000,
            chance: 15,
            min: 200,
            max: 400,
          },
        ],
      },
      voices: {
        create: [
          { sentence: 'MUHAHAHAHA!', yell: true },
          { sentence: 'I SMELL FEEEEEAR!', yell: true },
        ],
      },
      loot: {
        create: [
          { itemId: 2148, itemName: 'gold coin', chance: 100000, countMax: 100 },
          { itemId: 2666, itemName: 'meat', chance: 50000, countMax: 3 },
          { itemId: 2462, itemName: 'devil helmet', chance: 1000, countMax: 1 },
        ],
      },
    },
  });

  console.log('Database seeded successfully!');
  console.log({ account, demon });
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
