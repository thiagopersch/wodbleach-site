import { z } from 'zod';

// Race enum
export const raceSchema = z.enum([
  'blood',
  'energy',
  'fire',
  'venom',
  'undead',
]);

// Skull enum
export const skullSchema = z.number().min(0).max(5);

export const lootSchema = z
  .object({
    useItemId: z.boolean().default(true),
    loot_item_id: z.number().min(0),
    loot_item_name: z.string().max(100),
    loot_item_chance: z
      .number()
      .min(0)
      .max(100, { error: 'Chance deve ser entre 0 e 100' }),
    loot_item_countmax: z.number().min(0),
  })
  .refine(
    (data) => {
      if (data.useItemId) {
        return data.loot_item_id > 0 && !data.loot_item_name;
      }
      return data.loot_item_name && data.loot_item_id === 0;
    },
    {
      message: 'Preencha apenas o ID ou o nome do item, não ambos',
      path: ['loot_item_id', 'loot_item_name'],
    },
  );

export const summonsSchema = z.object({
  summon_name: z.string().max(100).optional(),
  summon_interval: z.number().min(0).default(0),
  summon_chance: z.number().min(0).max(100).default(0),
  summon_max: z.number().min(0).default(0),
});

export const defensesSchema = z.object({
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

export const eventSchema = z.object({
  event_name: z.string().max(100).optional(),
});

export const voiceSchema = z.object({
  voice_sentence: z.string().max(100).optional(),
  voice_yell: z.boolean().default(false),
});

// Attack schema
export const attackSchema = z
  .object({
    name: z.string().max(30, 'Nome do ataque deve ter no máximo 30 caracteres'),
    interval: z.number().min(0, 'Intervalo deve ser positivo'),
    min: z.number().min(0, 'Dano mínimo deve ser positivo'),
    max: z.number().min(0, 'Dano máximo deve ser positivo'),
    chance: z.number().min(0).max(100).optional(),
    range: z.number().min(0).optional(),
    skill: z.number().min(0).optional(),
    attack: z.number().min(0).optional(),
    radius: z.number().min(0).optional(),
    target: z.number().min(0).optional(),
    isSimple: z.boolean().default(true),
    hasAttributes: z.boolean().default(false),
    attributes: z
      .array(
        z.object({
          key: z.string().max(30).optional(),
          value: z.string().max(30).optional(),
        }),
      )
      .optional(),
  })
  .refine(
    (data) => {
      if (data.hasAttributes) {
        return (
          data.attributes &&
          data.attributes.every((attr) => attr.key && attr.value)
        );
      }
      return true;
    },
    {
      message:
        'Atributos devem ter chave e valor preenchidos quando habilitados',
      path: ['attributes'],
    },
  );

// Complete monster schema
export const monsterSchema = z
  .object({
    id: z.string(),
    created_at: z.string().optional(),
    updated_at: z.string().optional(),
    name: z
      .string()
      .min(1, 'Nome é obrigatório')
      .max(100, 'Nome deve ter no máximo 100 caracteres'),
    description: z
      .string()
      .max(100, 'Descrição deve ter no máximo 100 caracteres')
      .optional(),
    race: raceSchema,
    experience: z.number().min(0, 'Experiência deve ser positiva').default(0),
    speed: z.number().min(1, 'Velocidade deve ser maior que 0').default(200),
    manacost: z.number().min(0, 'Custo de mana deve ser positivo').default(0),
    skull: skullSchema.default(0),
    healthNow: z.number().min(0, 'HP atual deve ser positivo').default(100),
    healthMax: z.number().min(1, 'HP máximo deve ser maior que 0').default(100),
    look_type_id: z.number().min(0).default(0),
    look_type_head: z.number().min(0).default(0),
    look_type_body: z.number().min(0).default(0),
    look_type_legs: z.number().min(0).default(0),
    look_type_feet: z.number().min(0).default(0),
    look_type_addons: z.number().min(0).default(0),
    look_type_typex: z.number().min(0).default(0),
    look_type_mount: z.number().min(0).default(0),
    look_type_corpse: z.number().min(0).default(0),
    targetchange_interval: z.number().min(0).default(0),
    targetchange_chance: z.number().min(0).max(100).default(0),
    is_strategy: z.boolean().default(true),
    strategy_attack: z.number().min(0).max(100).default(0),
    strategy_defense: z.number().min(0).max(100).default(0),
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
    is_elements: z.boolean().default(true),
    element_fire_percent: z.string().optional().default('0'),
    element_energy_percent: z.string().optional().default('0'),
    element_ice_percent: z.string().optional().default('0'),
    element_poison_percent: z.string().optional().default('0'),
    element_holy_percent: z.string().optional().default('0'),
    element_death_percent: z.string().optional().default('0'),
    element_drown_percent: z.string().optional().default('0'),
    element_physical_percent: z.string().optional().default('0'),
    element_lifeDrain_percent: z.string().optional().default('0'),
    element_manaDrain_percent: z.string().optional().default('0'),
    element_healing_percent: z.string().optional().default('0'),
    element_undefined_percent: z.string().optional().default('0'),
    defenses_armor: z.number().min(0).default(0),
    defenses_defense: z.number().min(0).default(0),
    voices_interval: z.number().min(0).default(0),
    voices_chance: z.number().min(0).max(100).default(0),
    summons_max: z.number().min(0).default(0),
    is_attacks: z.boolean().default(true),
    is_loot: z.boolean().default(false),
    useItemId: z.boolean().default(true),
    is_summons: z.boolean().default(false),
    is_defenses: z.boolean().default(true),
    is_monster_event_script: z.boolean().default(false),
    is_voices: z.boolean().default(false),
    is_inside_container: z.boolean().default(false),
    events: z.array(eventSchema).default([]),
    voices: z.array(voiceSchema).default([]),
    attacks: z.array(attackSchema).default([]),
    defenses: z.array(defensesSchema).default([]),
    summons: z.array(summonsSchema).default([]),
    loot: z.array(lootSchema).default([]),
  })
  .refine(
    (data) => {
      return data.healthNow <= data.healthMax;
    },
    {
      message: 'HP atual não pode ser maior que HP máximo',
      path: ['healthNow'],
    },
  );

export const monsterFormSchema = monsterSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
});

export type Monster = z.infer<typeof monsterSchema>;
export type MonsterFormData = z.infer<typeof monsterFormSchema>;
export type Race = z.infer<typeof raceSchema>;

export const basicInfoSchema = z.object({
  name: z
    .string()
    .min(1, 'Nome é obrigatório')
    .max(100, 'Nome deve ter no máximo 100 caracteres'),
  description: z
    .string()
    .max(100, 'Descrição deve ter no máximo 100 caracteres')
    .optional(),
  race: raceSchema,
  experience: z.number().min(0, 'Experiência deve ser positiva'),
  speed: z.number().min(1, 'Velocidade deve ser maior que 0'),
  manacost: z.number().min(0, 'Custo de mana deve ser positivo'),
  skull: skullSchema,
});

export const healthSchema = z.object({
  healthNow: z.number().min(0, 'HP atual deve ser positivo'),
  healthMax: z.number().min(1, 'HP máximo deve ser maior que 0'),
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

export const formSectionSchemas = {
  basicInfo: basicInfoSchema,
  health: healthSchema,
  look: lookSchema,
} as const;

export const defaultMonsterValues: MonsterFormData = {
  name: '',
  description: '',
  race: 'blood',
  experience: 0,
  speed: 200,
  manacost: 0,
  skull: 0,
  healthNow: 100,
  healthMax: 100,
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
  defenses_armor: 0,
  defenses_defense: 0,
  voices_interval: 0,
  voices_chance: 0,
  summons_max: 0,
  is_voices: false,
  is_attacks: true,
  is_defenses: true,
  is_loot: false,
  is_summons: false,
  is_monster_event_script: false,
  useItemId: true,
  is_inside_container: false,
  voices: [],
  attacks: [],
  defenses: [],
  summons: [],
  events: [],
  loot: [],
};
