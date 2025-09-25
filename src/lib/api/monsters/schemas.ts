import { z } from 'zod';

// Race enum
export const raceSchema = z.enum(['blood', 'energy', 'fire', 'venom', 'undead']);

// Skull enum (0: nenhuma, 1: Amarela, 2: Verde, 3: Branca, 4: Vermelha, 5: Preta)
export const skullSchema = z.number().min(0).max(5);

// Basic monster information schema
export const basicInfoSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório').max(100, 'Nome deve ter no máximo 100 caracteres'),
  description: z.string().max(100, 'Descrição deve ter no máximo 100 caracteres').optional(),
  race: raceSchema,
  experience: z.number().min(0, 'Experiência deve ser positiva').default(0),
  speed: z.number().min(1, 'Velocidade deve ser maior que 0').default(200),
  manacost: z.number().min(0, 'Custo de mana deve ser positivo').default(0),
  skull: skullSchema.default(0),
});

// Health schema
export const healthSchema = z.object({
  health_now: z.number().min(0, 'HP atual deve ser positivo').default(0),
  health_max: z.number().min(1, 'HP máximo deve ser maior que 0').default(100),
});

// Look/Appearance schema
export const lookSchema = z.object({
  look_type_id: z.number().min(0).default(0),
  look_type_head: z.number().min(0).default(0),
  look_type_body: z.number().min(0).default(0),
  look_type_legs: z.number().min(0).default(0),
  look_type_feet: z.number().min(0).default(0),
  look_type_addons: z.number().min(0).default(0),
  look_type_typex: z.number().min(0).default(0),
  look_type_mount: z.number().min(0).default(0),
  look_type_corpse: z.number().min(0).default(0),
});

// Target change schema
export const targetChangeSchema = z.object({
  targetchange_interval: z.number().min(0).default(0),
  targetchange_chance: z.number().min(0).max(100).default(0),
});

// Strategy schema
export const strategySchema = z.object({
  is_strategy: z.boolean().default(true),
  strategy_attack: z.number().min(0).max(100).default(0),
  strategy_defense: z.number().min(0).max(100).default(0),
});

// Flags schema
export const flagsSchema = z.object({
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
  flag_lootmessage: z.number().min(0).max(100).default(0),
  flag_lightlevel: z.number().min(0).default(0),
  flag_lightcolor: z.number().min(0).default(0),
  flag_targetdistance: z.number().min(0).max(10).default(0),
  flag_staticattack: z.number().min(0).max(100).default(0),
  flag_runonhealth: z.number().min(0).max(100).default(0),
  flag_lureable: z.boolean().default(true),
  flag_walkable: z.boolean().default(false),
  flag_skull: skullSchema.default(0),
  flag_shield: z.number().min(0).default(0),
  flag_emblem: z.number().min(0).default(0),
});

// Attacks schema
export const attacksSchema = z.object({
  is_attacks: z.boolean().default(true),
  is_attack_simple: z.boolean().default(true),
  attack_name: z.string().max(30).optional(),
  attack_interval: z.string().max(10).optional(),
  attack_min: z.string().max(10).optional(),
  attack_max: z.string().max(10).optional(),
  attack_chance: z.number().min(0).max(100).default(0),
  attack_range: z.number().min(0).default(0),
  attack_speedchange: z.number().default(0),
  attack_duration: z.number().min(0).default(0),
  attack_target: z.number().min(0).default(0),
  attack_attribute_key: z.number().min(0).default(0),
  attack_attribute_value: z.string().max(30).optional(),
});

// Defenses schema
export const defensesSchema = z.object({
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
});

// Immunities schema
export const immunitiesSchema = z.object({
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
});

// Voices schema
export const voicesSchema = z.object({
  is_voices: z.boolean().default(false),
  voices_interval: z.number().min(0).default(0),
  voices_chance: z.number().min(0).max(100).default(0),
  voice_sentence: z.string().max(100).optional(),
  voice_yell: z.boolean().default(false),
});

// Elements schema
export const elementsSchema = z.object({
  is_elements: z.boolean().default(true),
  element_firePercent: z.string().default('0'),
  element_energyPercent: z.string().default('0'),
  element_icePercent: z.string().default('0'),
  element_poisonPercent: z.string().default('0'),
  element_holyPercent: z.string().default('0'),
  element_deathPercent: z.string().default('0'),
  element_drownPercent: z.string().default('0'),
  element_physicalPercent: z.string().default('0'),
  element_lifeDrainPercent: z.string().default('0'),
  element_manaDrainPercent: z.string().default('0'),
  element_healingPercent: z.string().default('0'),
  element_undefinedPercent: z.string().default('0'),
});

// Summons schema
export const summonsSchema = z.object({
  is_summons: z.boolean().default(false),
  summons_max: z.number().min(0).default(0),
  summon_name: z.string().max(100).optional(),
  summon_interval: z.number().min(0).default(0),
  summon_chance: z.number().min(0).max(100).default(0),
  summon_max: z.number().min(0).default(0),
});

// Events schema
export const eventsSchema = z.object({
  is_monster_event_script: z.boolean().default(false),
  event_name: z.string().max(100).optional(),
});

// Loot schema
export const lootSchema = z.object({
  is_loot: z.boolean().default(true),
  is_inside: z.boolean().default(false),
  loot_item_id: z.number().min(0).default(0),
  loot_item_name: z.string().max(100).optional(),
  loot_item_chance: z.number().min(0).max(100000).default(0),
  loot_item_countmax: z.number().min(0).default(0),
});

// Complete monster schema
export const monsterSchema = z
  .object({
    id: z.string().optional(),
    ...basicInfoSchema.shape,
    ...healthSchema.shape,
    ...lookSchema.shape,
    ...targetChangeSchema.shape,
    ...strategySchema.shape,
    ...flagsSchema.shape,
    ...attacksSchema.shape,
    ...defensesSchema.shape,
    ...immunitiesSchema.shape,
    ...voicesSchema.shape,
    ...elementsSchema.shape,
    ...summonsSchema.shape,
    ...eventsSchema.shape,
    ...lootSchema.shape,
    created_at: z.string().optional(),
    updated_at: z.string().optional(),
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

// Form schema for creating/editing monsters
export const monsterFormSchema = monsterSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
});

// Export types
export type Monster = z.infer<typeof monsterSchema>;
export type MonsterFormData = z.infer<typeof monsterFormSchema>;
export type Race = z.infer<typeof raceSchema>;

// Helper schemas for form sections
export const formSectionSchemas = {
  basicInfo: basicInfoSchema,
  health: healthSchema,
  look: lookSchema,
  targetChange: targetChangeSchema,
  strategy: strategySchema,
  flags: flagsSchema,
  attacks: attacksSchema,
  defenses: defensesSchema,
  immunities: immunitiesSchema,
  voices: voicesSchema,
  elements: elementsSchema,
  summons: summonsSchema,
  events: eventsSchema,
  loot: lootSchema,
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
  health_now: 100,
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
  flag_lootmessage: 0,
  flag_lightlevel: 0,
  flag_lightcolor: 0,
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
  attack_interval: '',
  attack_min: '',
  attack_max: '',
  attack_chance: 0,
  attack_range: 0,
  attack_speedchange: 0,
  attack_duration: 0,
  attack_target: 0,
  attack_attribute_key: 0,
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
  element_firePercent: '0',
  element_energyPercent: '0',
  element_icePercent: '0',
  element_poisonPercent: '0',
  element_holyPercent: '0',
  element_deathPercent: '0',
  element_drownPercent: '0',
  element_physicalPercent: '0',
  element_lifeDrainPercent: '0',
  element_manaDrainPercent: '0',
  element_healingPercent: '0',
  element_undefinedPercent: '0',
  is_summons: false,
  summons_max: 0,
  summon_name: '',
  summon_interval: 0,
  summon_chance: 0,
  summon_max: 0,
  is_monster_event_script: false,
  event_name: '',
  is_loot: true,
  is_inside: false,
  loot_item_id: 0,
  loot_item_name: '',
  loot_item_chance: 0,
  loot_item_countmax: 0,
};
