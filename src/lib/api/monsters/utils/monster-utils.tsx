import { Monster } from '@/app/(pages)/gameplay/monsters/_hooks/schemas';

// Convert monster data to XML format
export function monsterToXml(monster: Monster): string {
  const generateAttackXml = (attack: Monster['attacks'][0]) => {
    const attributes = [
      `name="${attack.name}"`,
      `interval="${attack.interval}"`,
      attack.min !== 0 ? `min="${attack.min}"` : '',
      attack.max !== 0 ? `max="${attack.max}"` : '',
      attack.chance ? `chance="${attack.chance}"` : '',
      attack.range ? `range="${attack.range}"` : '',
      attack.skill ? `skill="${attack.skill}"` : '',
      attack.attack ? `attack="${attack.attack}"` : '',
      attack.radius ? `radius="${attack.radius}"` : '',
      attack.target ? `target="${attack.target}"` : '',
    ]
      .filter(Boolean)
      .join(' ');

    const attributeTags =
      attack.hasAttributes && attack.attributes
        ? attack.attributes
            .filter((attr) => attr.key && attr.value)
            .map(
              (attr) =>
                `    <attribute key="${attr.key}" value="${attr.value}" />`,
            )
            .join('\n')
        : '';

    return `<attack ${attributes}>${attributeTags ? `\n${attributeTags}\n  ` : ''}</attack>`;
  };

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<monster name="${monster.name}" nameDescription="${monster.description || `a ${monster.name.toLowerCase()}`}" race="${monster.race}" experience="${monster.experience}" speed="${monster.speed}"${monster.manacost > 0 ? ` manacost="${monster.manacost}"` : ''}>
  <health now="${monster.healthNow}" max="${monster.healthMax}" />
  <look type="${monster.look_type_id}"${monster.look_type_corpse > 0 ? ` corpse="${monster.look_type_corpse}"` : ''}${monster.look_type_head > 0 ? ` head="${monster.look_type_head}"` : ''}${monster.look_type_body > 0 ? ` body="${monster.look_type_body}"` : ''}${monster.look_type_legs > 0 ? ` legs="${monster.look_type_legs}"` : ''}${monster.look_type_feet > 0 ? ` feet="${monster.look_type_feet}"` : ''} />
  ${monster.targetchange_interval > 0 || monster.targetchange_chance > 0 ? `<targetchange interval="${monster.targetchange_interval}" chance="${monster.targetchange_chance}" />` : ''}
  ${monster.is_strategy ? `<strategy attack="${monster.strategy_attack}" defense="${monster.strategy_defense}" />` : ''}
  ${
    monster.is_monster_event_script && monster.events?.length > 0
      ? `<script>
    ${monster.events.map((event) => `<event name="${event.event_name}" />`).join('\n')}
  </script>`
      : ''
  }
  <flags>
    <flag summonable="${monster.flag_summonable ? '1' : '0'}" />
    <flag attackable="${monster.flag_attackable ? '1' : '0'}" />
    <flag hostile="${monster.flag_hostile ? '1' : '0'}" />
    <flag illusionable="${monster.flag_illusionable ? '1' : '0'}" />
    <flag convinceable="${monster.flag_convinceable ? '1' : '0'}" />
    <flag pushable="${monster.flag_pushable ? '1' : '0'}" />
    <flag canpushitems="${monster.flag_canpushitems ? '1' : '0'}" />
    <flag canpushcreatures="${monster.flag_canpushcreatures ? '1' : '0'}" />
    ${monster.flag_targetdistance > 0 ? `<flag targetdistance="${monster.flag_targetdistance}" />` : ''}
    ${monster.flag_staticattack > 0 ? `<flag staticattack="${monster.flag_staticattack}" />` : ''}
    ${monster.flag_runonhealth > 0 ? `<flag runonhealth="${monster.flag_runonhealth}" />` : ''}
  </flags>
  ${
    monster.is_attacks && monster.attacks && monster.attacks.length > 0
      ? `<attacks>
    ${monster.attacks.map((attack) => `  ${generateAttackXml(attack)}`).join('\n')}
  </attacks>`
      : ''
  }
  ${
    monster.is_defenses
      ? `<defenses armor="${monster.defenses_armor}" defense="${monster.defenses_defense}">
      ${monster.defenses
        .map(
          (
            defense,
          ) => `<defense name="${defense.defense_name}" interval="${defense.defense_interval}" chance="${defense.defense_chance}" min="${defense.defense_min}" max="${defense.defense_max}" />
  </defenses>`,
        )
        .join('\n')}`
      : ''
  }
  ${
    monster.is_elements
      ? `<elements>
    ${monster.element_fire_percent !== '0' ? `<element firePercent="${monster.element_fire_percent}" />` : ''}
    ${monster.element_energy_percent !== '0' ? `<element energyPercent="${monster.element_energy_percent}" />` : ''}
    ${monster.element_ice_percent !== '0' ? `<element icePercent="${monster.element_ice_percent}" />` : ''}
    ${monster.element_poison_percent !== '0' ? `<element earthPercent="${monster.element_poison_percent}" />` : ''}
    ${monster.element_holy_percent !== '0' ? `<element holyPercent="${monster.element_holy_percent}" />` : ''}
    ${monster.element_death_percent !== '0' ? `<element deathPercent="${monster.element_death_percent}" />` : ''}
    ${monster.element_drown_percent !== '0' ? `<element drownPercent="${monster.element_drown_percent}" />` : ''}
    ${monster.element_physical_percent !== '0' ? `<element physicalPercent="${monster.element_physical_percent}" />` : ''}
    ${monster.element_lifeDrain_percent !== '0' ? `<element lifeDrainPercent="${monster.element_lifeDrain_percent}" />` : ''}
    ${monster.element_manaDrain_percent !== '0' ? `<element manaDrainPercent="${monster.element_manaDrain_percent}" />` : ''}
    ${monster.element_healing_percent !== '0' ? `<element healingPercent="${monster.element_healing_percent}" />` : ''}
    ${monster.element_undefined_percent !== '0' ? `<element undefinedPercent="${monster.element_undefined_percent}" />` : ''}
  </elements>`
      : ''
  }
  ${
    monster.is_immunities
      ? `<immunities>
    ${monster.immunity_physical ? '<immunity physical="1" />' : '<immunity physical="0" />'}
    ${monster.immunity_energy ? '<immunity energy="1" />' : '<immunity energy="0" />'}
    ${monster.immunity_fire ? '<immunity fire="1" />' : '<immunity fire="0" />'}
    ${monster.immunity_poison ? '<immunity earth="1" />' : '<immunity earth="0" />'}
    ${monster.immunity_ice ? '<immunity ice="1" />' : '<immunity ice="0" />'}
    ${monster.immunity_holy ? '<immunity holy="1" />' : '<immunity holy="0" />'}
    ${monster.immunity_death ? '<immunity death="1" />' : '<immunity death="0" />'}
    ${monster.immunity_drown ? '<immunity drown="1" />' : '<immunity drown="0" />'}
    ${monster.immunity_lifedrain ? '<immunity lifedrain="1" />' : '<immunity lifedrain="0" />'}
    ${monster.immunity_manadrain ? '<immunity manadrain="1" />' : '<immunity manadrain="0" />'}
    ${monster.immunity_paralyze ? '<immunity paralyze="1" />' : '<immunity paralyze="0" />'}
    ${monster.immunity_outfit ? '<immunity outfit="1" />' : '<immunity outfit="0" />'}
    ${monster.immunity_drunk ? '<immunity drunk="1" />' : '<immunity drunk="0" />'}
    ${monster.immunity_invisible ? '<immunity invisible="1" />' : '<immunity invisible="0" />'}
  </immunities>`
      : ''
  }
  ${
    monster.is_summons && monster.summons?.length > 0
      ? `<summons maxSummons="${monster.summons_max}">
    ${monster.summons.map((summon) => `<summon name="${summon.summon_name}" interval="${summon.summon_interval}" chance="${summon.summon_chance}" max="${summon.summon_max}" />`)}
  </summons>`
      : ''
  }
  ${
    monster.is_voices && monster.voices?.length > 0
      ? `<voices interval="${monster.voices_interval}" chance="${monster.voices_chance}">
    ${monster.voices.map((voice) => `<voice sentence="${voice.voice_sentence}" yell="${voice.voice_yell ? '1' : '0'}" />`)}
  </voices>`
      : ''
  }
  ${
    monster.is_loot && monster.loot?.length > 0
      ? `<loot>
  ${
    monster.is_inside_container
      ? `<item id="1987" chance="100000">
          <inside>
          ${monster.loot.map(
            (loot) =>
              `<item id="${loot.loot_item_id}"${loot.loot_item_countmax > 0 ? ` countmax="${loot.loot_item_countmax}"` : null} chance="${loot.loot_item_chance}" />`,
          )}
          </inside>
        </item>`
      : monster.loot
          .map(
            (loot) =>
              `<item id="${loot.loot_item_id}"${loot.loot_item_countmax > 0 ? ` countmax="${loot.loot_item_countmax}"` : null} chance="${loot.loot_item_chance}" />`,
          )
          .join('\n')
  }
</loot>`
      : ''
  }
</monster>`;

  return xml;
}

// Get race color for UI
export function getRaceColor(race: string): string {
  const colors = {
    blood: 'text-red-400',
    energy: 'text-purple-400',
    fire: 'text-orange-400',
    venom: 'text-green-400',
    undead: 'text-gray-400',
  };
  return colors[race as keyof typeof colors] || 'text-gray-400';
}

// Get race background color
export function getRaceBackground(race: string): string {
  const colors = {
    blood: 'bg-red-500/10 border-red-500/20',
    energy: 'bg-purple-500/10 border-purple-500/20',
    fire: 'bg-orange-500/10 border-orange-500/20',
    venom: 'bg-green-500/10 border-green-500/20',
    undead: 'bg-gray-500/10 border-gray-500/20',
  };
  return (
    colors[race as keyof typeof colors] || 'bg-gray-500/10 border-gray-500/20'
  );
}

// Format experience with thousands separator
export function formatExperience(exp: number): string {
  return exp.toLocaleString('pt-BR');
}

// Get skull name
export function getSkullName(skull: number): string {
  const skulls = {
    0: 'Nenhuma',
    1: 'Amarela',
    2: 'Verde',
    3: 'Branca',
    4: 'Vermelha',
    5: 'Preta',
  };
  return skulls[skull as keyof typeof skulls] || 'Desconhecida';
}

// Calculate monster difficulty based on stats
type Difficulty = 'Easy' | 'Medium' | 'Hard' | 'Extreme' | 'God';
export function calculateDifficulty(monster: Monster): Difficulty {
  const score =
    monster.experience + monster.healthMax / 10 + monster.speed / 10;

  if (score < 1000) return 'Easy';
  if (score < 10000) return 'Medium';
  if (score < 50000) return 'Hard';
  if (score < 100000) return 'Extreme';
  return 'God';
}

// Get difficulty color
export function getDifficultyColor(difficulty: string): string {
  const colors = {
    Easy: 'text-green-400',
    Medium: 'text-yellow-400',
    Hard: 'text-orange-400',
    Extreme: 'text-red-400',
  };
  return colors[difficulty as keyof typeof colors] || 'text-gray-400';
}
