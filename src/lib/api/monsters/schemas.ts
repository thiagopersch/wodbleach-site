import { z } from 'zod';

// Race enum
export const raceSchema = z.enum(['blood', 'energy', 'fire', 'venom', 'undead']);

// Skull enum (0: nenhuma, 1: Amarela, 2: Verde, 3: Branca, 4: Vermelha, 5: Preta)
export const skullSchema = z.number().min(0).max(5);

// Complete monster schema - built directly instead of using spread
export const monsterSchema = z
  .object({
    // System fields
    id: z.string(),
    created_at: z.string().optional(),
    updated_at: z.string().optional(),

    // Basic info
    name: z.string().min(1, 'Nome é obrigatório').max(100, 'Nome deve ter no máximo 100 caracteres'),
    description: z.string().max(100, 'Descrição deve ter no máximo 100 caracteres').optional(),
    race: raceSchema,
    experience: z.number().min(0, 'Experiência deve ser positiva').default(0),
    speed: z.number().min(1, 'Velocidade deve ser maior que 0').default(200),
    manacost: z.number().min(0, 'Custo de mana deve ser positivo').default(0),
    skull: skullSchema.default(0),

    // Health
    health_now: z.number().min(0, 'HP atual deve ser positivo').default(0),
    health_max: z.number().min(1, 'HP máximo deve ser maior que 0').default(100),

    // Look/Appearance
    look_type_id: z.number().min(0).default(0),
    look_type_head: z.number().min(0).default(0),
    look_type_body: z.number().min(0).default(0),
    look_type_legs: z.number().min(0).default(0),
    look_type_feet: z.number().min(0).default(0),
    look_type_addons: z.number().min(0).default(0),
    look_type_typex: z.number().min(0).default(0),
    look_type_mount: z.number().min(0).default(0),
    look_type_corpse: z.number().min(0).default(0),

    // Target change
    targetchange_interval: z.number().min(0).default(0),
    targetchange_chance: z.number().min(0).max(100).default(0),

    // Strategy
    is_strategy: z.boolean().default(true),
    strategy_attack: z.number().min(0).max(100).default(0),
    strategy_defense: z.number().min(0).max(100).default(0),

    // Flags
    flag_summonable: z.boolean().default(true),
    flag_attackable: z.boolean().default(true),
    flag_hostile: z.boolean().default(true),
    flag_illusionable: z.boolean().default(true),
    flag_convinceable: z.boolean().default(true),
    flag_pushable: z.boolean().default(true),
    flag_canpushitems: z.boolean().default(true),
    flag_canpushcreatures: z.boolean().default(true),
    flag_hidename: z.boolean().default(false),
    flag_hidehealth: z.boolean().default(false),
    flag_lootmessage: z.boolean().default(true),
    flag_lightlevel: z.boolean().default(false),
    flag_lightcolor: z.boolean().default(false),
    flag_targetdistance: z.number().min(0).max(10).default(0),
    flag_staticattack: z.number().min(0).max(100).default(0),
    flag_runonhealth: z.number().min(0).max(100).default(0),
    flag_lureable: z.boolean().default(true),
    flag_walkable: z.boolean().default(false),
    flag_skull: skullSchema.default(0),
    flag_shield: z.number().min(0).default(0),
    flag_emblem: z.number().min(0).default(0),

    // Attacks
    is_attacks: z.boolean().default(true),
    is_attack_simple: z.boolean().default(true),
    attack_name: z.string().max(30).optional(),
    attack_interval: z.number().min(0).optional(),
    attack_min: z.number().min(0).default(0),
    attack_max: z.number().min(0).default(0),
    attack_chance: z.number().min(0).max(100).default(0),
    attack_range: z.number().min(0).default(0),
    attack_speedchange: z.number().default(0),
    attack_duration: z.number().min(0).default(0),
    attack_target: z.number().min(0).default(0),
    attack_attribute_key: z.string().max(0).default(''),
    attack_attribute_value: z.string().max(30).optional(),

    // Defenses
    is_defenses: z.boolean().default(true),
    defenses_armor: z.number().min(0).default(0),
    defenses_defense: z.number().min(0).default(0),
    defense_name: z.string().max(30).optional(),
    defense_interval: z.number().min(0).default(0),
    defense_chance: z.number().min(0).max(100).default(0),
    defense_min: z.number().min(0).default(0),
    defense_max: z.number().min(0).default(0),
    defense_speedchange: z.number().default(0),
    defense_duration: z.number().min(0).default(0),
    defense_atribute_key: z.string().max(30).optional(),
    defense_attribute_value: z.string().max(30).optional(),

    // Immunities
    is_immunities: z.boolean().default(true),
    immunity_physical: z.boolean().default(false),
    immunity_energy: z.boolean().default(false),
    immunity_fire: z.boolean().default(false),
    immunity_poison: z.boolean().default(false),
    immunity_ice: z.boolean().default(false),
    immunity_holy: z.boolean().default(false),
    immunity_death: z.boolean().default(false),
    immunity_drown: z.boolean().default(false),
    immunity_lifedrain: z.boolean().default(false),
    immunity_manadrain: z.boolean().default(false),
    immunity_paralyze: z.boolean().default(false),
    immunity_outfit: z.boolean().default(false),
    immunity_drunk: z.boolean().default(false),
    immunity_invisible: z.boolean().default(false),

    // Voices
    is_voices: z.boolean().default(false),
    voices_interval: z.number().min(0).default(0),
    voices_chance: z.number().min(0).max(100).default(0),
    voice_sentence: z.string().max(100).optional(),
    voice_yell: z.boolean().default(false),

    // Elements
    is_elements: z.boolean().default(true),
    element_fire_percent: z.string().default('0'),
    element_energy_percent: z.string().default('0'),
    element_ice_percent: z.string().default('0'),
    element_poison_percent: z.string().default('0'),
    element_holy_percent: z.string().default('0'),
    element_death_percent: z.string().default('0'),
    element_drown_percent: z.string().default('0'),
    element_physical_percent: z.string().default('0'),
    element_lifeDrain_percent: z.string().default('0'),
    element_manaDrain_percent: z.string().default('0'),
    element_healing_percent: z.string().default('0'),
    element_undefined_percent: z.string().default('0'),

    // Summons
    is_summons: z.boolean().default(false),
    summons_max: z.number().min(0).default(0),
    summon_name: z.string().max(100).optional(),
    summon_interval: z.number().min(0).default(0),
    summon_chance: z.number().min(0).max(100).default(0),
    summon_max: z.number().min(0).default(0),

    // Events
    is_monster_event_script: z.boolean().default(false),
    event_name: z.string().max(100).optional(),

    // Loot
    is_loot: z.boolean().default(true),
    is_inside_container: z.boolean().default(false),
    loot_item_id: z.number().min(0).default(0),
    loot_item_name: z.string().max(100).optional(),
    loot_item_chance: z.number().min(0).max(100000).default(0),
    loot_item_countmax: z.number().min(0).default(0),
  })
  .refine(
    (data) => {
      // Validate that health_now doesn't exceed health_max
      return data.health_now <= data.health_max;
    },
    {
      message: 'HP atual não pode ser maior que HP máximo',
      path: ['health_now'],
    },
  );

// Form schema for creating/editing monsters - created manually without system fields
export const monsterFormSchema = z
  .object({
    // Basic info
    name: z.string().min(1, 'Nome é obrigatório').max(100, 'Nome deve ter no máximo 100 caracteres'),
    description: z.string().max(100, 'Descrição deve ter no máximo 100 caracteres').optional(),
    race: raceSchema,
    experience: z.number().min(0, 'Experiência deve ser positiva'),
    speed: z.number().min(1, 'Velocidade deve ser maior que 0'),
    manacost: z.number().min(0, 'Custo de mana deve ser positivo'),
    skull: skullSchema,

    // Health
    health_now: z.number().min(0, 'HP atual deve ser positivo'),
    health_max: z.number().min(1, 'HP máximo deve ser maior que 0'),

    // Look/Appearance
    look_type_id: z.number().min(0),
    look_type_head: z.number().min(0),
    look_type_body: z.number().min(0),
    look_type_legs: z.number().min(0),
    look_type_feet: z.number().min(0),
    look_type_addons: z.number().min(0),
    look_type_typex: z.number().min(0),
    look_type_mount: z.number().min(0),
    look_type_corpse: z.number().min(0),

    // Target change
    targetchange_interval: z.number().min(0),
    targetchange_chance: z.number().min(0).max(100),

    // Strategy
    is_strategy: z.boolean(),
    strategy_attack: z.number().min(0).max(100),
    strategy_defense: z.number().min(0).max(100),

    // Flags
    flag_summonable: z.boolean(),
    flag_attackable: z.boolean(),
    flag_hostile: z.boolean(),
    flag_illusionable: z.boolean(),
    flag_convinceable: z.boolean(),
    flag_pushable: z.boolean(),
    flag_canpushitems: z.boolean(),
    flag_canpushcreatures: z.boolean(),
    flag_hidename: z.boolean(),
    flag_hidehealth: z.boolean(),
    flag_lootmessage: z.boolean(),
    flag_lightlevel: z.boolean(),
    flag_lightcolor: z.boolean(),
    flag_targetdistance: z.number().min(0).max(10),
    flag_staticattack: z.number().min(0).max(100),
    flag_runonhealth: z.number().min(0).max(100),
    flag_lureable: z.boolean(),
    flag_walkable: z.boolean(),
    flag_skull: skullSchema,
    flag_shield: z.number().min(0),
    flag_emblem: z.number().min(0),

    // Attacks
    is_attacks: z.boolean(),
    is_attack_simple: z.boolean(),
    attack_name: z.string().max(30).optional(),
    attack_interval: z.number().max(10).optional(),
    attack_min: z.number().min(0).optional(),
    attack_max: z.number().min(0).optional(),
    attack_chance: z.number().min(0).max(100),
    attack_range: z.number().min(0),
    attack_speedchange: z.number().min(0),
    attack_duration: z.number().min(0),
    attack_target: z.number().min(0),
    attack_attribute_key: z.string().max(30).optional(),
    attack_attribute_value: z.string().max(30).optional(),

    // Defenses
    is_defenses: z.boolean(),
    defenses_armor: z.number().min(0),
    defenses_defense: z.number().min(0),
    defense_name: z.string().max(30).optional(),
    defense_interval: z.number().min(0),
    defense_chance: z.number().min(0).max(100),
    defense_min: z.number().min(0),
    defense_max: z.number().min(0),
    defense_speedchange: z.number(),
    defense_duration: z.number().min(0),
    defense_atribute_key: z.string().max(30).optional(),
    defense_attribute_value: z.string().max(30).optional(),

    // Immunities
    is_immunities: z.boolean(),
    immunity_physical: z.boolean(),
    immunity_energy: z.boolean(),
    immunity_fire: z.boolean(),
    immunity_poison: z.boolean(),
    immunity_ice: z.boolean(),
    immunity_holy: z.boolean(),
    immunity_death: z.boolean(),
    immunity_drown: z.boolean(),
    immunity_lifedrain: z.boolean(),
    immunity_manadrain: z.boolean(),
    immunity_paralyze: z.boolean(),
    immunity_outfit: z.boolean(),
    immunity_drunk: z.boolean(),
    immunity_invisible: z.boolean(),

    // Voices
    is_voices: z.boolean(),
    voices_interval: z.number().min(0),
    voices_chance: z.number().min(0).max(100),
    voice_sentence: z.string().max(100).optional(),
    voice_yell: z.boolean(),

    // Elements
    is_elements: z.boolean(),
    element_fire_percent: z.string(),
    element_energy_percent: z.string(),
    element_ice_percent: z.string(),
    element_poison_percent: z.string(),
    element_holy_percent: z.string(),
    element_death_percent: z.string(),
    element_drown_percent: z.string(),
    element_physical_percent: z.string(),
    element_lifeDrain_percent: z.string(),
    element_manaDrain_percent: z.string(),
    element_healing_percent: z.string(),
    element_undefined_percent: z.string(),

    // Summons
    is_summons: z.boolean(),
    summons_max: z.number().min(0),
    summon_name: z.string().max(100).optional(),
    summon_interval: z.number().min(0),
    summon_chance: z.number().min(0).max(100),
    summon_max: z.number().min(0),

    // Events
    is_monster_event_script: z.boolean(),
    event_name: z.string().max(100).optional(),

    // Loot
    is_loot: z.boolean(),
    is_inside_container: z.boolean(),
    loot_item_id: z.number().min(0).optional(),
    loot_item_name: z.string().max(100).optional(),
    loot_item_chance: z.number().min(0).max(100000),
    loot_item_countmax: z.number().min(0).optional(),
  })
  .refine(
    (data) => {
      // Validate that health_now doesn't exceed health_max
      return data.health_now <= data.health_max;
    },
    {
      message: 'HP atual não pode ser maior que HP máximo',
      path: ['health_now'],
    },
  );

// Export types
export type Monster = z.infer<typeof monsterSchema>;
export type MonsterFormData = z.infer<typeof monsterFormSchema>;
export type Race = z.infer<typeof raceSchema>;

// Individual section schemas for form organization
export const basicInfoSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório').max(100, 'Nome deve ter no máximo 100 caracteres'),
  description: z.string().max(100, 'Descrição deve ter no máximo 100 caracteres').optional(),
  race: raceSchema,
  experience: z.number().min(0, 'Experiência deve ser positiva'),
  speed: z.number().min(1, 'Velocidade deve ser maior que 0'),
  manacost: z.number().min(0, 'Custo de mana deve ser positivo'),
  skull: skullSchema,
});

export const healthSchema = z.object({
  health_now: z.number().min(0, 'HP atual deve ser positivo'),
  health_max: z.number().min(1, 'HP máximo deve ser maior que 0'),
});

export const lookSchema = z.object({
  look_type_id: z.number().min(0),
  look_type_head: z.number().min(0),
  look_type_body: z.number().min(0),
  look_type_legs: z.number().min(0),
  look_type_feet: z.number().min(0),
  look_type_addons: z.number().min(0),
  look_type_typex: z.number().min(0),
  look_type_mount: z.number().min(0),
  look_type_corpse: z.number().min(0),
});

// Helper schemas for form sections
export const formSectionSchemas = {
  basicInfo: basicInfoSchema,
  health: healthSchema,
  look: lookSchema,
} as const;

// Default values for new monster
export const defaultMonsterValues: MonsterFormData = {
  name: '',
  description: '',
  race: 'blood',
  experience: 0,
  speed: 200,
  manacost: 0,
  skull: 0,
  health_now: 0,
  health_max: 100,
  look_type_id: 0,
  look_type_head: 0,
  look_type_body: 0,
  look_type_legs: 0,
  look_type_feet: 0,
  look_type_addons: 0,
  look_type_typex: 0,
  look_type_mount: 0,
  look_type_corpse: 0,
  targetchange_interval: 0,
  targetchange_chance: 0,
  is_strategy: true,
  strategy_attack: 0,
  strategy_defense: 0,
  flag_summonable: true,
  flag_attackable: true,
  flag_hostile: true,
  flag_illusionable: true,
  flag_convinceable: true,
  flag_pushable: true,
  flag_canpushitems: true,
  flag_canpushcreatures: true,
  flag_hidename: false,
  flag_hidehealth: false,
  flag_lootmessage: false,
  flag_lightlevel: false,
  flag_lightcolor: false,
  flag_targetdistance: 0,
  flag_staticattack: 0,
  flag_runonhealth: 0,
  flag_lureable: true,
  flag_walkable: false,
  flag_skull: 0,
  flag_shield: 0,
  flag_emblem: 0,
  is_attacks: true,
  is_attack_simple: true,
  attack_name: '',
  attack_interval: 0,
  attack_min: 0,
  attack_max: 0,
  attack_chance: 0,
  attack_range: 0,
  attack_speedchange: 0,
  attack_duration: 0,
  attack_target: 0,
  attack_attribute_key: '',
  attack_attribute_value: '',
  is_defenses: true,
  defenses_armor: 0,
  defenses_defense: 0,
  defense_name: '',
  defense_interval: 0,
  defense_chance: 0,
  defense_min: 0,
  defense_max: 0,
  defense_speedchange: 0,
  defense_duration: 0,
  defense_atribute_key: '',
  defense_attribute_value: '',
  is_immunities: true,
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
  is_voices: false,
  voices_interval: 0,
  voices_chance: 0,
  voice_sentence: '',
  voice_yell: false,
  is_elements: true,
  element_fire_percent: '',
  element_energy_percent: '',
  element_ice_percent: '',
  element_poison_percent: '',
  element_holy_percent: '',
  element_death_percent: '',
  element_drown_percent: '',
  element_physical_percent: '',
  element_lifeDrain_percent: '',
  element_manaDrain_percent: '',
  element_healing_percent: '',
  element_undefined_percent: '',
  is_summons: false,
  summons_max: 0,
  summon_name: '',
  summon_interval: 0,
  summon_chance: 0,
  summon_max: 0,
  is_monster_event_script: false,
  event_name: '',
  is_loot: true,
  is_inside_container: false,
  loot_item_id: 0,
  loot_item_name: '',
  loot_item_chance: 0,
  loot_item_countmax: 0,
};
