import { monsterFormSchema } from '@/app/(pages)/gameplay/monsters/_hooks/schemas';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { type NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// GET /api/monsters - Get all monsters
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const monsters = await prisma.monster.findMany({
      include: {
        attacks: true,
        defenses: true,
        voices: true,
        summons: true,
        loot: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(monsters);
  } catch (error) {
    console.error('Error fetching monsters:', error);
    return NextResponse.json(
      { error: 'Failed to fetch monsters' },
      { status: 500 },
    );
  }
}

// POST /api/monsters - Create new monster
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    // Validate request body
    const validatedData = monsterFormSchema.parse(body);

    const existingMonster = await prisma.monster.findFirst({
      where: { name: validatedData.name },
    });

    if (existingMonster) {
      return NextResponse.json(
        { error: 'Já existe um monstro com este nome' },
        { status: 400 },
      );
    }

    // Create monster with related data
    const monster = await prisma.monster.create({
      data: {
        // Basic info
        name: validatedData.name,
        description: validatedData.description,
        race: validatedData.race,
        experience: validatedData.experience,
        speed: validatedData.speed,
        manacost: validatedData.manacost,
        skull: validatedData.skull,

        // Health
        healthNow: validatedData.healthNow,
        healthMax: validatedData.healthMax,

        // Look/Appearance
        lookTypeId: validatedData.look_type_id,
        lookHead: validatedData.look_type_head,
        lookBody: validatedData.look_type_body,
        lookLegs: validatedData.look_type_legs,
        lookFeet: validatedData.look_type_feet,
        lookAddons: validatedData.look_type_addons,
        lookTypex: validatedData.look_type_typex,
        lookMount: validatedData.look_type_mount,
        lookCorpse: validatedData.look_type_corpse,

        // Target Change
        targetchangeInterval: validatedData.targetchange_interval,
        targetchangeChance: validatedData.targetchange_chance,

        // Strategy
        isStrategy: validatedData.is_strategy,
        strategyAttack: validatedData.strategy_attack,
        strategyDefense: validatedData.strategy_defense,

        // Flags
        flag_summonable: validatedData.flag_summonable,
        flag_attackable: validatedData.flag_attackable,
        flag_hostile: validatedData.flag_hostile,
        flag_illusionable: validatedData.flag_illusionable,
        flag_convinceable: validatedData.flag_convinceable,
        flag_pushable: validatedData.flag_pushable,
        flag_canpushitems: validatedData.flag_canpushitems,
        flag_canpushcreatures: validatedData.flag_canpushcreatures,
        flag_hidename: validatedData.flag_hidename,
        flag_hidehealth: validatedData.flag_hidehealth,
        flag_lootmessage: validatedData.flag_lootmessage,
        flag_lightlevel: validatedData.flag_lightlevel,
        flag_lightcolor: validatedData.flag_lightcolor,
        flag_targetDistance: validatedData.flag_targetdistance,
        flag_staticAttackChance: validatedData.flag_staticattack,
        flag_runonHealth: validatedData.flag_runonhealth,
        flag_lureable: validatedData.flag_lureable,
        flag_walkable: validatedData.flag_walkable,
        flag_skull: validatedData.flag_skull,
        flag_shield: validatedData.flag_shield,
        flag_emblem: validatedData.flag_emblem,

        // Immunities
        immunity_physical: validatedData.immunity_physical,
        immunity_energy: validatedData.immunity_energy,
        immunity_fire: validatedData.immunity_fire,
        immunity_poison: validatedData.immunity_poison,
        immunity_ice: validatedData.immunity_ice,
        immunity_holy: validatedData.immunity_holy,
        immunity_death: validatedData.immunity_death,
        immunity_drown: validatedData.immunity_drown,
        immunity_lifedrain: validatedData.immunity_lifedrain,
        immunity_manadrain: validatedData.immunity_manadrain,
        immunity_paralyze: validatedData.immunity_paralyze,
        immunity_outfit: validatedData.immunity_outfit,
        immunity_drunk: validatedData.immunity_drunk,
        immunity_invisible: validatedData.immunity_invisible,

        // Elements
        elements_fire_percent: validatedData.element_fire_percent,
        elements_energy_percent: validatedData.element_energy_percent,
        elements_ice_percent: validatedData.element_ice_percent,
        elements_poison_percent: validatedData.element_poison_percent,
        elements_holy_percent: validatedData.element_holy_percent,
        elements_death_percent: validatedData.element_death_percent,
        elements_drown_percent: validatedData.element_drown_percent,
        elements_physical_percent: validatedData.element_physical_percent,
        elements_lifedrain_percent: validatedData.element_lifeDrain_percent,
        elements_manadrain_percent: validatedData.element_manaDrain_percent,
        elements_healing_percent: validatedData.element_healing_percent,
        elements_undefined_percent: validatedData.element_undefined_percent,

        // Create related data if enabled
        attacks:
          validatedData.is_attacks && validatedData.attacks?.length
            ? {
                create: validatedData.attacks.map((attack) => ({
                  is_attack_simple: attack.isSimple ?? false,
                  name: attack.name,
                  interval: attack.interval,
                  min: attack.min,
                  max: attack.max,
                  chance: attack.chance ?? 0,
                  range: attack.range ?? 0,
                  skill: attack.skill ?? 0,
                  attack: attack.attack ?? 0,
                  radius: attack.radius ?? 0,
                  target: attack.target ?? 0,
                  attributes:
                    attack.hasAttributes && attack.attributes?.length
                      ? {
                          create: attack.attributes
                            .filter((attr) => attr.key && attr.value)
                            .map((attr) => ({
                              key: attr.key!,
                              value: attr.value!,
                            })),
                        }
                      : undefined,
                })),
              }
            : undefined,

        defenses:
          validatedData.is_defenses !== undefined &&
          validatedData.defenses?.length
            ? {
                create: validatedData.defenses.map((defense) => ({
                  name: defense.defense_name ?? '',
                  interval: defense.defense_interval,
                  chance: defense.defense_chance,
                  min: defense.defense_min,
                  max: defense.defense_max,
                  speedchange: defense.defense_speedchange,
                  duration: defense.defense_duration,
                  attribute_key: defense.defense_atribute_key,
                  attribute_value: defense.defense_attribute_value,
                })),
              }
            : undefined,

        // Removed immunities property because it does not exist in the Monster model

        voices:
          validatedData.is_voices !== undefined && validatedData.voices?.length
            ? {
                create: validatedData.voices.map((voice) => ({
                  interval: validatedData.voices_interval,
                  chance: validatedData.voices_chance,
                  sentence: voice.voice_sentence ?? '',
                  yell: voice.voice_yell,
                })),
              }
            : undefined,

        summons:
          validatedData.is_summons !== undefined &&
          validatedData.summons?.length
            ? {
                create: validatedData.summons.map((summon) => ({
                  maxSummons: validatedData.summons_max,
                  name: summon.summon_name ?? '',
                  interval: summon.summon_interval,
                  chance: summon.summon_chance,
                  max: summon.summon_max,
                })),
              }
            : undefined,

        loot:
          validatedData.is_loot && validatedData.loot.length
            ? {
                create: validatedData.loot.map((item) => ({
                  is_inside_container: validatedData.is_inside_container,
                  itemId: item.loot_item_id,
                  itemName: item.loot_item_name,
                  chance: item.loot_item_chance,
                  countMax: item.loot_item_countmax,
                })),
              }
            : undefined,

        // Event script
        events:
          validatedData.is_monster_event_script && validatedData.events.length
            ? {
                create: validatedData.events.map((event) => ({
                  name: event.event_name ?? '',
                })),
              }
            : undefined,
      },
      include: {
        attacks: true,
        defenses: true,
        voices: true,
        summons: true,
        loot: true,
      },
    });

    return NextResponse.json(monster, { status: 201 });
  } catch (error) {
    console.error('Error creating monster:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: error.issues.map((err) => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { error: 'Failed to create monster' },
      { status: 500 },
    );
  }
}
