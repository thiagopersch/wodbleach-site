// Database utilities for local storage (since no external DB integration)
export interface Monster {
  id?: string;
  name: string;
  description?: string;
  race: 'blood' | 'energy' | 'fire' | 'venom' | 'undead';
  experience: number;
  speed: number;
  manacost: number;
  skull: number;

  // Health
  healthNow: number;
  healthMax: number;

  // Look/Appearance
  look_type_id: number;
  look_type_head: number;
  look_type_body: number;
  look_type_legs: number;
  look_type_feet: number;
  look_type_addons: number;
  look_type_typex: number;
  look_type_mount: number;
  look_type_corpse: number;

  // Target Change
  targetchange_interval: number;
  targetchange_chance: number;

  // Strategy
  is_strategy: boolean;
  strategy_attack: number;
  strategy_defense: number;

  // Flags
  flag_summonable: boolean;
  flag_attackable: boolean;
  flag_hostile: boolean;
  flag_illusionable: boolean;
  flag_convinceable: boolean;
  flag_pushable: boolean;
  flag_canpushitems: boolean;
  flag_canpushcreatures: boolean;
  flag_hidename: boolean;
  flag_hidehealth: boolean;
  flag_lootmessage: number;
  flag_lightlevel: number;
  flag_lightcolor: number;
  flag_targetdistance: number;
  flag_staticattack: number;
  flag_runonhealth: number;
  flag_lureable: boolean;
  flag_walkable: boolean;
  flag_skull: number;
  flag_shield: number;
  flag_emblem: number;

  // Attacks
  is_attacks: boolean;
  is_attack_simple: boolean;
  attack_name?: string;
  attack_interval?: string;
  attack_min?: string;
  attack_max?: string;
  attack_chance: number;
  attack_range: number;
  attack_speedchange: number;
  attack_duration: number;
  attack_target: number;
  attack_attribute_key: number;
  attack_attribute_value?: string;

  // Defenses
  is_defenses: boolean;
  defenses_armor: number;
  defenses_defense: number;
  defense_name?: string;
  defense_interval: number;
  defense_chance: number;
  defense_min: number;
  defense_max: number;
  defense_speedchange: number;
  defense_duration: number;
  defense_atribute_key?: string;
  defense_attribute_value?: string;

  // Immunities
  is_immunities: boolean;
  immunity_physical: boolean;
  immunity_energy: boolean;
  immunity_fire: boolean;
  immunity_poison: boolean;
  immunity_ice: boolean;
  immunity_holy: boolean;
  immunity_death: boolean;
  immunity_drown: boolean;
  immunity_lifedrain: boolean;
  immunity_manadrain: boolean;
  immunity_paralyze: boolean;
  immunity_outfit: boolean;
  immunity_drunk: boolean;
  immunity_invisible: boolean;

  // Voices
  is_voices: boolean;
  voices_interval: number;
  voices_chance: number;
  voice_sentence?: string;
  voice_yell: boolean;

  // Elements
  is_elements: boolean;
  element_fire_percent: string;
  element_energy_percent: string;
  element_ice_percent: string;
  element_poison_percent: string;
  element_holy_percent: string;
  element_death_percent: string;
  element_drown_percent: string;
  element_physical_percent: string;
  element_lifeDrain_percent: string;
  element_manaDrain_percent: string;
  element_healing_percent: string;
  element_undefined_percent: string;

  // Summons
  is_summons: boolean;
  summons_max: number;
  summon_name?: string;
  summon_interval: number;
  summon_chance: number;
  summon_max: number;

  // Events
  is_monster_event_script: boolean;
  event_name?: string;

  // Loot
  is_loot: boolean;
  is_inside: boolean;
  loot_item_id: number;
  loot_item_name?: string;
  loot_item_chance: number;
  loot_item_countmax: number;

  // Timestamps
  created_at?: string;
  updated_at?: string;
}

const STORAGE_KEY = 'monsters_data';

// Initialize with sample data
const sampleMonsters: Monster[] = [
  {
    id: '1',
    name: 'Demon',
    description: 'a demon',
    race: 'fire',
    experience: 6000,
    speed: 280,
    manacost: 0,
    skull: 0,
    healthNow: 8200,
    healthMax: 8200,
    look_type_id: 35,
    look_type_head: 0,
    look_type_body: 0,
    look_type_legs: 0,
    look_type_feet: 0,
    look_type_addons: 0,
    look_type_typex: 0,
    look_type_mount: 0,
    look_type_corpse: 5995,
    targetchange_interval: 5000,
    targetchange_chance: 10,
    is_strategy: true,
    strategy_attack: 100,
    strategy_defense: 0,
    flag_summonable: false,
    flag_attackable: true,
    flag_hostile: true,
    flag_illusionable: false,
    flag_convinceable: false,
    flag_pushable: false,
    flag_canpushitems: true,
    flag_canpushcreatures: true,
    flag_hidename: false,
    flag_hidehealth: false,
    flag_lootmessage: 0,
    flag_lightlevel: 0,
    flag_lightcolor: 0,
    flag_targetdistance: 1,
    flag_staticattack: 90,
    flag_runonhealth: 0,
    flag_lureable: true,
    flag_walkable: false,
    flag_skull: 0,
    flag_shield: 0,
    flag_emblem: 0,
    is_attacks: true,
    is_attack_simple: true,
    attack_name: 'melee',
    attack_interval: '2000',
    attack_min: '80',
    attack_max: '120',
    attack_chance: 100,
    attack_range: 1,
    attack_speedchange: 0,
    attack_duration: 0,
    attack_target: 0,
    attack_attribute_key: 0,
    attack_attribute_value: '',
    is_defenses: true,
    defenses_armor: 30,
    defenses_defense: 30,
    defense_name: 'healing',
    defense_interval: 2000,
    defense_chance: 10,
    defense_min: 90,
    defense_max: 200,
    defense_speedchange: 0,
    defense_duration: 0,
    defense_atribute_key: 'areaEffect',
    defense_attribute_value: 'blueshimmer',
    is_immunities: true,
    immunity_physical: false,
    immunity_energy: false,
    immunity_fire: true,
    immunity_poison: false,
    immunity_ice: false,
    immunity_holy: false,
    immunity_death: false,
    immunity_drown: false,
    immunity_lifedrain: true,
    immunity_manadrain: false,
    immunity_paralyze: true,
    immunity_outfit: false,
    immunity_drunk: false,
    immunity_invisible: true,
    is_voices: true,
    voices_interval: 5000,
    voices_chance: 10,
    voice_sentence: 'MUHAHAHAHA!',
    voice_yell: true,
    is_elements: true,
    element_fire_percent: '100',
    element_energy_percent: '50',
    element_ice_percent: '-12',
    element_poison_percent: '0',
    element_holy_percent: '-12',
    element_death_percent: '20',
    element_drown_percent: '0',
    element_physical_percent: '25',
    element_lifeDrain_percent: '0',
    element_manaDrain_percent: '0',
    element_healing_percent: '0',
    element_undefined_percent: '0',
    is_summons: true,
    summons_max: 1,
    summon_name: 'fire elemental',
    summon_interval: 4000,
    summon_chance: 10,
    summon_max: 1,
    is_monster_event_script: true,
    event_name: 'KillingInTheNameOf',
    is_loot: true,
    is_inside: false,
    loot_item_id: 2148,
    loot_item_name: 'gold coin',
    loot_item_chance: 40000,
    loot_item_countmax: 90,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export class MonsterDB {
  static getAll(): Monster[] {
    if (typeof window === 'undefined') return sampleMonsters;

    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleMonsters));
      return sampleMonsters;
    }
    return JSON.parse(stored);
  }

  static getById(id: string): Monster | null {
    const monsters = this.getAll();
    return monsters.find((m) => m.id === id) || null;
  }

  static create(monster: Omit<Monster, 'id' | 'created_at' | 'updated_at'>): Monster {
    const monsters = this.getAll();
    const newMonster: Monster = {
      ...monster,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    monsters.push(newMonster);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(monsters));
    return newMonster;
  }

  static update(id: string, updates: Partial<Monster>): Monster | null {
    const monsters = this.getAll();
    const index = monsters.findIndex((m) => m.id === id);

    if (index === -1) return null;

    monsters[index] = {
      ...monsters[index],
      ...updates,
      updated_at: new Date().toISOString(),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(monsters));
    return monsters[index];
  }

  static delete(id: string): boolean {
    const monsters = this.getAll();
    const filtered = monsters.filter((m) => m.id !== id);

    if (filtered.length === monsters.length) return false;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  }
}
