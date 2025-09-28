import { MonsterDB } from '@/lib/db';
import { type NextRequest, NextResponse } from 'next/server';

import { defaultMonsterValues, monsterFormSchema } from '@/lib/api/monsters/schemas';
import { z } from 'zod';

// POST /api/monsters/import - Import monster from XML
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { xml } = body;

    if (!xml || typeof xml !== 'string') {
      return NextResponse.json({ error: 'XML content is required' }, { status: 400 });
    }

    // Parse XML and convert to monster data
    const monsterData = parseXmlToMonster(xml);

    // Validate parsed data
    const validatedData = monsterFormSchema.parse(monsterData);

    // Create monster
    const monster = MonsterDB.create(validatedData as any);

    return NextResponse.json(monster, { status: 201 });
  } catch (error) {
    console.error('Error importing monster:', error);

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

    if (error instanceof Error && error.message.includes('XML')) {
      return NextResponse.json({ error: 'Invalid XML format' }, { status: 400 });
    }

    return NextResponse.json({ error: 'Failed to import monster' }, { status: 500 });
  }
}

// Helper function to parse XML to monster data
function parseXmlToMonster(xml: string) {
  try {
    // Basic XML parsing (simplified for demo - in production use a proper XML parser)
    const monsterData = { ...defaultMonsterValues };

    // Extract monster attributes
    const monsterMatch = xml.match(/<monster\s+([^>]+)>/i);
    if (monsterMatch) {
      const attributes = monsterMatch[1];

      // Parse name
      const nameMatch = attributes.match(/name="([^"]+)"/i);
      if (nameMatch) monsterData.name = nameMatch[1];

      // Parse description
      const descMatch = attributes.match(/nameDescription="([^"]+)"/i);
      if (descMatch) monsterData.description = descMatch[1];

      // Parse race
      const raceMatch = attributes.match(/race="([^"]+)"/i);
      if (raceMatch) {
        const race = raceMatch[1] as any;
        if (['blood', 'energy', 'fire', 'venom', 'undead'].includes(race)) {
          monsterData.race = race;
        }
      }

      // Parse experience
      const expMatch = attributes.match(/experience="(\d+)"/i);
      if (expMatch) monsterData.experience = Number.parseInt(expMatch[1]);

      // Parse speed
      const speedMatch = attributes.match(/speed="(\d+)"/i);
      if (speedMatch) monsterData.speed = Number.parseInt(speedMatch[1]);

      // Parse manacost
      const manaMatch = attributes.match(/manacost="(\d+)"/i);
      if (manaMatch) monsterData.manacost = Number.parseInt(manaMatch[1]);
    }

    // Extract health
    const healthMatch = xml.match(/<health\s+([^>]+)>/i);
    if (healthMatch) {
      const attributes = healthMatch[1];

      const nowMatch = attributes.match(/now="(\d+)"/i);
      if (nowMatch) monsterData.health_now = Number.parseInt(nowMatch[1]);

      const maxMatch = attributes.match(/max="(\d+)"/i);
      if (maxMatch) monsterData.health_max = Number.parseInt(maxMatch[1]);
    }

    // Extract look
    const lookMatch = xml.match(/<look\s+([^>]+)>/i);
    if (lookMatch) {
      const attributes = lookMatch[1];

      const typeMatch = attributes.match(/type="(\d+)"/i);
      if (typeMatch) monsterData.look_type_id = Number.parseInt(typeMatch[1]);

      const corpseMatch = attributes.match(/corpse="(\d+)"/i);
      if (corpseMatch) monsterData.look_type_corpse = Number.parseInt(corpseMatch[1]);
    }

    // Extract strategy
    const strategyMatch = xml.match(/<strategy\s+([^>]+)>/i);
    if (strategyMatch) {
      const attributes = strategyMatch[1];

      const attackMatch = attributes.match(/attack="(\d+)"/i);
      if (attackMatch) monsterData.strategy_attack = Number.parseInt(attackMatch[1]);

      const defenseMatch = attributes.match(/defense="(\d+)"/i);
      if (defenseMatch) monsterData.strategy_defense = Number.parseInt(defenseMatch[1]);
    }

    // Extract flags
    const flagMatches = xml.match(/<flag\s+([^>]+)>/gi);
    if (flagMatches) {
      flagMatches.forEach((flagMatch) => {
        const attributes = flagMatch.replace(/<flag\s+|>/gi, '');

        if (attributes.includes('summonable=')) {
          const match = attributes.match(/summonable="([^"]+)"/i);
          if (match) monsterData.flag_summonable = match[1] === '1';
        }

        if (attributes.includes('attackable=')) {
          const match = attributes.match(/attackable="([^"]+)"/i);
          if (match) monsterData.flag_attackable = match[1] === '1';
        }

        if (attributes.includes('hostile=')) {
          const match = attributes.match(/hostile="([^"]+)"/i);
          if (match) monsterData.flag_hostile = match[1] === '1';
        }

        if (attributes.includes('convinceable=')) {
          const match = attributes.match(/convinceable="([^"]+)"/i);
          if (match) monsterData.flag_convinceable = match[1] === '1';
        }

        if (attributes.includes('pushable=')) {
          const match = attributes.match(/pushable="([^"]+)"/i);
          if (match) monsterData.flag_pushable = match[1] === '1';
        }

        if (attributes.includes('targetdistance=')) {
          const match = attributes.match(/targetdistance="(\d+)"/i);
          if (match) monsterData.flag_targetdistance = Number.parseInt(match[1]);
        }

        if (attributes.includes('staticattack=')) {
          const match = attributes.match(/staticattack="(\d+)"/i);
          if (match) monsterData.flag_staticattack = Number.parseInt(match[1]);
        }
      });
    }

    // Extract defenses
    const defensesMatch = xml.match(/<defenses\s+([^>]+)>/i);
    if (defensesMatch) {
      const attributes = defensesMatch[1];

      const armorMatch = attributes.match(/armor="(\d+)"/i);
      if (armorMatch) monsterData.defenses_armor = Number.parseInt(armorMatch[1]);

      const defenseMatch = attributes.match(/defense="(\d+)"/i);
      if (defenseMatch) monsterData.defenses_defense = Number.parseInt(defenseMatch[1]);
    }

    // Extract elements
    const elementMatches = xml.match(/<element\s+([^>]+)>/gi);
    if (elementMatches) {
      elementMatches.forEach((elementMatch) => {
        const attributes = elementMatch.replace(/<element\s+|>/gi, '');

        if (attributes.includes('firePercent=')) {
          const match = attributes.match(/firePercent="([^"]+)"/i);
          if (match) monsterData.element_fire_percent = match[1];
        }

        if (attributes.includes('physicalPercent=')) {
          const match = attributes.match(/physicalPercent="([^"]+)"/i);
          if (match) monsterData.element_physical_percent = match[1];
        }

        if (attributes.includes('energyPercent=')) {
          const match = attributes.match(/energyPercent="([^"]+)"/i);
          if (match) monsterData.element_energy_percent = match[1];
        }

        if (attributes.includes('icePercent=')) {
          const match = attributes.match(/icePercent="([^"]+)"/i);
          if (match) monsterData.element_ice_percent = match[1];
        }

        if (attributes.includes('holyPercent=')) {
          const match = attributes.match(/holyPercent="([^"]+)"/i);
          if (match) monsterData.element_holy_percent = match[1];
        }

        if (attributes.includes('deathPercent=')) {
          const match = attributes.match(/deathPercent="([^"]+)"/i);
          if (match) monsterData.element_death_percent = match[1];
        }
      });
    }

    // Extract voices
    const voicesMatch = xml.match(/<voices\s+([^>]+)>/i);
    if (voicesMatch) {
      const attributes = voicesMatch[1];

      const intervalMatch = attributes.match(/interval="(\d+)"/i);
      if (intervalMatch) {
        monsterData.voices_interval = Number.parseInt(intervalMatch[1]);
        monsterData.is_voices = true;
      }

      const chanceMatch = attributes.match(/chance="(\d+)"/i);
      if (chanceMatch) monsterData.voices_chance = Number.parseInt(chanceMatch[1]);
    }

    const voiceMatch = xml.match(/<voice\s+([^>]+)>/i);
    if (voiceMatch) {
      const attributes = voiceMatch[1];

      const sentenceMatch = attributes.match(/sentence="([^"]+)"/i);
      if (sentenceMatch) monsterData.voice_sentence = sentenceMatch[1];

      const yellMatch = attributes.match(/yell="([^"]+)"/i);
      if (yellMatch) monsterData.voice_yell = yellMatch[1] === '1';
    }

    return monsterData;
  } catch (error) {
    throw new Error(`XML parsing failed: ${error}`);
  }
}
