import { monsterFormSchema } from '@/app/(pages)/gameplay/monsters/_hooks/schemas';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { type NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

// GET /api/monsters/[id] - Get monster by ID
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const monster = await prisma.monster.findUnique({
      where: { id: Number.parseInt(id) },
      include: {
        attacks: true,
        defenses: true,
        voices: true,
        summons: true,
        loot: true,
      },
    });

    if (!monster) {
      return NextResponse.json({ error: 'Monster not found' }, { status: 404 });
    }

    return NextResponse.json(monster);
  } catch (error) {
    console.error('Error fetching monster:', error);
    return NextResponse.json(
      { error: 'Failed to fetch monster' },
      { status: 500 },
    );
  }
}

// PUT /api/monsters/[id] - Update monster
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = monsterFormSchema.partial().parse(body);
    const { id } = await params;

    // Update monster with related data
    const monster = await prisma.monster.update({
      where: { id: Number.parseInt(id) },
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

        // Event script
        events:
          validatedData.is_monster_event_script && validatedData.event_name
            ? {
                create: [
                  {
                    name: validatedData.event_name,
                  },
                ],
              }
            : undefined,

        // Update related data
        attacks:
          validatedData.is_attacks !== undefined && validatedData.attack_name
            ? {
                // Example: updateMany or createMany depending on your logic
                // Here we use updateMany if you want to update existing attacks by some unique field (e.g., name)
                updateMany: [
                  {
                    where: { name: validatedData.attack_name },
                    data: {
                      is_attack_simple: validatedData.is_attack_simple || false,
                      interval: validatedData.attack_interval
                        ? Number(validatedData.attack_interval)
                        : undefined,
                      min: validatedData.attack_min,
                      max: validatedData.attack_max,
                      chance: validatedData.attack_chance || 0,
                      range: validatedData.attack_range || 0,
                      speedchange: validatedData.attack_speedchange || 0,
                      duration: validatedData.attack_duration || 0,
                      target: validatedData.attack_target || 0,
                      attack_attribute_key:
                        validatedData.attack_attribute_key || '',
                      attack_attribute_value:
                        validatedData.attack_attribute_value ?? '',
                    },
                  },
                ],
                // If you want to create a new attack if not exists, use createMany
                createMany: {
                  data: [
                    {
                      is_attack_simple: validatedData.is_attack_simple || false,
                      name: validatedData.attack_name,
                      interval: validatedData.attack_interval
                        ? Number(validatedData.attack_interval)
                        : undefined,
                      min: validatedData.attack_min,
                      max: validatedData.attack_max,
                      chance: validatedData.attack_chance || 0,
                      range: validatedData.attack_range || 0,
                      speedchange: validatedData.attack_speedchange || 0,
                      duration: validatedData.attack_duration || 0,
                      target: validatedData.attack_target || 0,
                      attack_attribute_key:
                        validatedData.attack_attribute_key || '',
                      attack_attribute_value:
                        validatedData.attack_attribute_value ?? '',
                    },
                  ],
                  skipDuplicates: true,
                },
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

    return NextResponse.json(monster);
  } catch (error) {
    console.error('Error updating monster:', error);

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
      { error: 'Failed to update monster' },
      { status: 500 },
    );
  }
}

// DELETE /api/monsters/[id] - Delete monster
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    // Delete monster (cascade will handle related records)
    await prisma.monster.delete({
      where: { id: Number.parseInt(id) },
    });

    return NextResponse.json({ message: 'Monster deleted successfully' });
  } catch (error) {
    console.error('Error deleting monster:', error);
    return NextResponse.json(
      { error: 'Failed to delete monster' },
      { status: 500 },
    );
  }
}
