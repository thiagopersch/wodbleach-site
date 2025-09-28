-- CreateTable
CREATE TABLE `accounts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(32) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `premdays` INTEGER NOT NULL DEFAULT 0,
    `lastday` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `email` VARCHAR(255) NOT NULL DEFAULT '',
    `key` VARCHAR(32) NOT NULL DEFAULT '0',
    `blocked` BOOLEAN NOT NULL DEFAULT false,
    `warnings` INTEGER NOT NULL DEFAULT 0,
    `group_id` INTEGER NOT NULL DEFAULT 1,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `accounts_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `players` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `world_id` TINYINT NOT NULL DEFAULT 0,
    `group_id` INTEGER NOT NULL DEFAULT 1,
    `account_id` INTEGER NOT NULL,
    `level` INTEGER NOT NULL DEFAULT 1,
    `vocation` INTEGER NOT NULL DEFAULT 0,
    `health` INTEGER NOT NULL DEFAULT 150,
    `healthmax` INTEGER NOT NULL DEFAULT 150,
    `experience` BIGINT NOT NULL DEFAULT 0,
    `lookhead` INTEGER NOT NULL DEFAULT 0,
    `lookbody` INTEGER NOT NULL DEFAULT 0,
    `looklegs` INTEGER NOT NULL DEFAULT 0,
    `lookfeet` INTEGER NOT NULL DEFAULT 0,
    `looktype` INTEGER NOT NULL DEFAULT 136,
    `lookaddons` INTEGER NOT NULL DEFAULT 0,
    `maglevel` INTEGER NOT NULL DEFAULT 0,
    `mana` INTEGER NOT NULL DEFAULT 0,
    `manamax` INTEGER NOT NULL DEFAULT 0,
    `manaspent` INTEGER NOT NULL DEFAULT 0,
    `soul` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `town_id` INTEGER NOT NULL DEFAULT 0,
    `posx` INTEGER NOT NULL DEFAULT 0,
    `posy` INTEGER NOT NULL DEFAULT 0,
    `posz` INTEGER NOT NULL DEFAULT 0,
    `conditions` LONGBLOB NOT NULL,
    `cap` INTEGER NOT NULL DEFAULT 0,
    `sex` INTEGER NOT NULL DEFAULT 0,
    `lastlogin` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `lastip` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `save` BOOLEAN NOT NULL DEFAULT true,
    `skull` TINYINT UNSIGNED NOT NULL DEFAULT 0,
    `skulltime` INTEGER NOT NULL DEFAULT 0,
    `rank_id` INTEGER NOT NULL DEFAULT 0,
    `guildnick` VARCHAR(255) NOT NULL DEFAULT '',
    `lastlogout` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `blessings` TINYINT NOT NULL DEFAULT 0,
    `balance` BIGINT NOT NULL DEFAULT 0,
    `stamina` BIGINT NOT NULL DEFAULT 151200000,
    `direction` INTEGER NOT NULL DEFAULT 2,
    `loss_experience` INTEGER NOT NULL DEFAULT 100,
    `loss_mana` INTEGER NOT NULL DEFAULT 100,
    `loss_skills` INTEGER NOT NULL DEFAULT 100,
    `loss_containers` INTEGER NOT NULL DEFAULT 100,
    `loss_items` INTEGER NOT NULL DEFAULT 100,
    `premend` INTEGER NOT NULL DEFAULT 0,
    `online` BOOLEAN NOT NULL DEFAULT false,
    `marriage` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `promotion` INTEGER NOT NULL DEFAULT 0,
    `deleted` INTEGER NOT NULL DEFAULT 0,
    `description` VARCHAR(255) NOT NULL DEFAULT '',
    `cast` TINYINT NOT NULL DEFAULT 0,
    `castViewers` INTEGER NOT NULL DEFAULT 0,
    `castDescription` VARCHAR(255) NOT NULL DEFAULT '',
    `health_skill` INTEGER NOT NULL DEFAULT 0,
    `mana_skill` INTEGER NOT NULL DEFAULT 0,
    `bend_skill` INTEGER NOT NULL DEFAULT 0,
    `dodge_skill` INTEGER NOT NULL DEFAULT 0,
    `resets` INTEGER NOT NULL DEFAULT 0,
    `skill_points` INTEGER NOT NULL DEFAULT 0,
    `online_time` INTEGER NOT NULL DEFAULT 0,

    INDEX `players_account_id_idx`(`account_id`),
    INDEX `players_group_id_idx`(`group_id`),
    INDEX `players_online_idx`(`online`),
    INDEX `players_deleted_idx`(`deleted`),
    UNIQUE INDEX `players_name_deleted_key`(`name`, `deleted`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `monsters` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `race` ENUM('blood', 'energy', 'fire', 'venom', 'undead') NOT NULL,
    `experience` INTEGER NOT NULL DEFAULT 0,
    `speed` INTEGER NOT NULL DEFAULT 200,
    `manacost` INTEGER NOT NULL DEFAULT 0,
    `skull` INTEGER NOT NULL DEFAULT 0,
    `health_now` INTEGER NOT NULL DEFAULT 100,
    `health_max` INTEGER NOT NULL DEFAULT 100,
    `look_type_id` INTEGER NOT NULL DEFAULT 130,
    `look_head` INTEGER NOT NULL DEFAULT 0,
    `look_body` INTEGER NOT NULL DEFAULT 0,
    `look_legs` INTEGER NOT NULL DEFAULT 0,
    `look_feet` INTEGER NOT NULL DEFAULT 0,
    `look_addons` INTEGER NOT NULL DEFAULT 0,
    `look_typex` INTEGER NOT NULL DEFAULT 0,
    `look_mount` INTEGER NOT NULL DEFAULT 0,
    `look_corpse` INTEGER NOT NULL DEFAULT 0,
    `image_url` VARCHAR(500) NULL,
    `targetchange_interval` INTEGER NOT NULL DEFAULT 2000,
    `targetchange_chance` INTEGER NOT NULL DEFAULT 10,
    `is_strategy` BOOLEAN NOT NULL DEFAULT false,
    `strategy_attack` INTEGER NOT NULL DEFAULT 100,
    `strategy_defense` INTEGER NOT NULL DEFAULT 20,
    `flag_summonable` BOOLEAN NOT NULL DEFAULT false,
    `flag_attackable` BOOLEAN NOT NULL DEFAULT true,
    `flag_hostile` BOOLEAN NOT NULL DEFAULT true,
    `flag_illusionable` BOOLEAN NOT NULL DEFAULT true,
    `flag_convinceable` BOOLEAN NOT NULL DEFAULT false,
    `flag_pushable` BOOLEAN NOT NULL DEFAULT false,
    `flag_canpushitems` BOOLEAN NOT NULL DEFAULT false,
    `flag_canpushcreatures` BOOLEAN NOT NULL DEFAULT false,
    `flag_hidename` BOOLEAN NOT NULL DEFAULT false,
    `flag_hidehealth` BOOLEAN NOT NULL DEFAULT false,
    `flag_lightlevel` BOOLEAN NOT NULL DEFAULT false,
    `flag_lightcolor` BOOLEAN NOT NULL DEFAULT false,
    `flag_lootmessage` BOOLEAN NOT NULL DEFAULT false,
    `flag_lureable` BOOLEAN NOT NULL DEFAULT false,
    `flag_walkable` BOOLEAN NOT NULL DEFAULT false,
    `flag_shield` INTEGER NOT NULL DEFAULT 0,
    `flag_emblem` INTEGER NOT NULL DEFAULT 0,
    `flag_skull` INTEGER NOT NULL DEFAULT 0,
    `target_distance` INTEGER NOT NULL DEFAULT 1,
    `static_attack_chance` INTEGER NOT NULL DEFAULT 95,
    `run_health` INTEGER NOT NULL DEFAULT 0,
    `max_summons` INTEGER NOT NULL DEFAULT 0,
    `flees_health` INTEGER NOT NULL DEFAULT 0,
    `push_objects` BOOLEAN NOT NULL DEFAULT true,
    `push_creatures` BOOLEAN NOT NULL DEFAULT false,
    `target_change` INTEGER NOT NULL DEFAULT 0,
    `immunity_physical` BOOLEAN NOT NULL DEFAULT false,
    `immunity_energy` BOOLEAN NOT NULL DEFAULT false,
    `immunity_fire` BOOLEAN NOT NULL DEFAULT false,
    `immunity_poison` BOOLEAN NOT NULL DEFAULT false,
    `immunity_ice` BOOLEAN NOT NULL DEFAULT false,
    `immunity_holy` BOOLEAN NOT NULL DEFAULT false,
    `immunity_death` BOOLEAN NOT NULL DEFAULT false,
    `immunity_drown` BOOLEAN NOT NULL DEFAULT false,
    `immunity_lifedrain` BOOLEAN NOT NULL DEFAULT false,
    `immunity_manadrain` BOOLEAN NOT NULL DEFAULT false,
    `immunity_paralyze` BOOLEAN NOT NULL DEFAULT false,
    `immunity_outfit` BOOLEAN NOT NULL DEFAULT false,
    `immunity_drunk` BOOLEAN NOT NULL DEFAULT false,
    `immunity_invisible` BOOLEAN NOT NULL DEFAULT false,
    `elements_fire_percent` VARCHAR(5) NOT NULL,
    `elements_energy_percent` VARCHAR(5) NOT NULL,
    `elements_ice_percent` VARCHAR(5) NOT NULL,
    `elements_poison_percent` VARCHAR(5) NOT NULL,
    `elements_holy_percent` VARCHAR(5) NOT NULL,
    `elements_death_percent` VARCHAR(5) NOT NULL,
    `elements_drown_percent` VARCHAR(5) NOT NULL,
    `elements_physical_percent` VARCHAR(5) NOT NULL,
    `elements_lifedrain_percent` VARCHAR(5) NOT NULL,
    `elements_manadrain_percent` VARCHAR(5) NOT NULL,
    `elements_healing_percent` VARCHAR(5) NOT NULL,
    `elements_undefined_percent` VARCHAR(5) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `monsters_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `monster_attacks` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `monster_id` INTEGER NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `interval` INTEGER NOT NULL DEFAULT 2000,
    `chance` INTEGER NOT NULL DEFAULT 100,
    `range` INTEGER NOT NULL DEFAULT 1,
    `min` INTEGER NOT NULL DEFAULT 0,
    `max` INTEGER NOT NULL DEFAULT 0,
    `is_attack_simple` BOOLEAN NOT NULL DEFAULT false,
    `speedchange` INTEGER NOT NULL DEFAULT 0,
    `duration` INTEGER NOT NULL DEFAULT 0,
    `target` INTEGER NOT NULL DEFAULT 0,
    `attack_attribute_key` VARCHAR(100) NOT NULL DEFAULT '',
    `attack_attribute_value` VARCHAR(100) NOT NULL DEFAULT '',

    INDEX `monster_attacks_monster_id_idx`(`monster_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `monster_defenses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `monster_id` INTEGER NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `interval` INTEGER NOT NULL DEFAULT 2000,
    `chance` INTEGER NOT NULL DEFAULT 100,
    `min` INTEGER NOT NULL DEFAULT 0,
    `max` INTEGER NOT NULL DEFAULT 0,
    `speedchange` INTEGER NOT NULL DEFAULT 0,
    `duration` INTEGER NOT NULL DEFAULT 0,
    `attribute_key` VARCHAR(100) NOT NULL DEFAULT '',
    `attribute_value` VARCHAR(100) NOT NULL DEFAULT '',

    INDEX `monster_defenses_monster_id_idx`(`monster_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `monster_voices` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `monster_id` INTEGER NOT NULL,
    `interval` INTEGER NOT NULL DEFAULT 2000,
    `chance` INTEGER NOT NULL DEFAULT 100,
    `sentence` VARCHAR(255) NOT NULL,
    `yell` BOOLEAN NOT NULL DEFAULT false,

    INDEX `monster_voices_monster_id_idx`(`monster_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `monster_summons` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `monster_id` INTEGER NOT NULL,
    `max_summons` INTEGER NOT NULL DEFAULT 1,
    `name` VARCHAR(100) NOT NULL,
    `interval` INTEGER NOT NULL DEFAULT 1000,
    `chance` INTEGER NOT NULL DEFAULT 100,
    `max` INTEGER NOT NULL DEFAULT 1,

    INDEX `monster_summons_monster_id_idx`(`monster_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `monster_loot` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `monster_id` INTEGER NOT NULL,
    `is_loot` BOOLEAN NOT NULL DEFAULT true,
    `is_inside_container` BOOLEAN NOT NULL DEFAULT false,
    `item_id` INTEGER NULL,
    `item_name` VARCHAR(100) NULL,
    `chance` INTEGER NOT NULL DEFAULT 10000,
    `count_max` INTEGER NULL DEFAULT 1,

    INDEX `monster_loot_monster_id_idx`(`monster_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `monster_events` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `monster_id` INTEGER NOT NULL,
    `name` VARCHAR(100) NOT NULL,

    INDEX `monster_events_monster_id_idx`(`monster_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `account_viplist` (
    `account_id` INTEGER NOT NULL,
    `world_id` TINYINT NOT NULL DEFAULT 0,
    `player_id` INTEGER NOT NULL,

    INDEX `account_viplist_account_id_idx`(`account_id`),
    INDEX `account_viplist_player_id_idx`(`player_id`),
    INDEX `account_viplist_world_id_idx`(`world_id`),
    UNIQUE INDEX `account_viplist_account_id_player_id_key`(`account_id`, `player_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `player_deaths` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `player_id` INTEGER NOT NULL,
    `date` BIGINT UNSIGNED NOT NULL,
    `level` INTEGER UNSIGNED NOT NULL,

    INDEX `player_deaths_date_idx`(`date`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `player_depotitems` (
    `player_id` INTEGER NOT NULL,
    `sid` INTEGER NOT NULL,
    `pid` INTEGER NOT NULL DEFAULT 0,
    `itemtype` INTEGER NOT NULL,
    `count` INTEGER NOT NULL DEFAULT 0,
    `attributes` LONGBLOB NOT NULL,

    INDEX `player_depotitems_player_id_idx`(`player_id`),
    UNIQUE INDEX `player_depotitems_player_id_sid_key`(`player_id`, `sid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `player_items` (
    `player_id` INTEGER NOT NULL,
    `pid` INTEGER NOT NULL DEFAULT 0,
    `sid` INTEGER NOT NULL DEFAULT 0,
    `itemtype` INTEGER NOT NULL DEFAULT 0,
    `count` INTEGER NOT NULL DEFAULT 0,
    `attributes` LONGBLOB NOT NULL,

    INDEX `player_items_player_id_idx`(`player_id`),
    UNIQUE INDEX `player_items_player_id_sid_key`(`player_id`, `sid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `player_namelocks` (
    `player_id` INTEGER NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `new_name` VARCHAR(255) NOT NULL,
    `date` BIGINT NOT NULL DEFAULT 0,

    INDEX `player_namelocks_player_id_idx`(`player_id`),
    PRIMARY KEY (`player_id`, `date`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `player_skills` (
    `player_id` INTEGER NOT NULL,
    `skillid` TINYINT NOT NULL,
    `value` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `count` INTEGER UNSIGNED NOT NULL DEFAULT 0,

    INDEX `player_skills_player_id_idx`(`player_id`),
    UNIQUE INDEX `player_skills_player_id_skillid_key`(`player_id`, `skillid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `player_spells` (
    `player_id` INTEGER NOT NULL,
    `name` VARCHAR(255) NOT NULL,

    INDEX `player_spells_player_id_idx`(`player_id`),
    UNIQUE INDEX `player_spells_player_id_name_key`(`player_id`, `name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `player_storage` (
    `player_id` INTEGER NOT NULL,
    `key` INTEGER UNSIGNED NOT NULL,
    `value` VARCHAR(255) NOT NULL DEFAULT '0',

    INDEX `player_storage_player_id_idx`(`player_id`),
    UNIQUE INDEX `player_storage_player_id_key_key`(`player_id`, `key`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `player_viplist` (
    `player_id` INTEGER NOT NULL,
    `vip_id` INTEGER NOT NULL,

    INDEX `player_viplist_player_id_idx`(`player_id`),
    INDEX `player_viplist_vip_id_idx`(`vip_id`),
    UNIQUE INDEX `player_viplist_player_id_vip_id_key`(`player_id`, `vip_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `killers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `death_id` INTEGER NOT NULL,
    `final_hit` BOOLEAN NOT NULL DEFAULT false,
    `unjustified` BOOLEAN NOT NULL DEFAULT false,
    `war` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `player_killers` (
    `kill_id` INTEGER NOT NULL,
    `player_id` INTEGER NOT NULL,

    PRIMARY KEY (`kill_id`, `player_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `environment_killers` (
    `kill_id` INTEGER NOT NULL,
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`kill_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `houses` (
    `id` INTEGER UNSIGNED NOT NULL,
    `world_id` TINYINT NOT NULL DEFAULT 0,
    `owner` INTEGER NOT NULL,
    `paid` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `warnings` INTEGER NOT NULL DEFAULT 0,
    `lastwarning` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `name` VARCHAR(255) NOT NULL,
    `town` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `size` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `price` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `rent` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `doors` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `beds` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `tiles` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `guild` BOOLEAN NOT NULL DEFAULT false,
    `clear` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `houses_id_world_id_key`(`id`, `world_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `house_auctions` (
    `house_id` INTEGER UNSIGNED NOT NULL,
    `world_id` TINYINT NOT NULL DEFAULT 0,
    `player_id` INTEGER NOT NULL,
    `bid` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `limit` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `endtime` BIGINT UNSIGNED NOT NULL DEFAULT 0,

    UNIQUE INDEX `house_auctions_house_id_world_id_key`(`house_id`, `world_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `house_lists` (
    `house_id` INTEGER UNSIGNED NOT NULL,
    `world_id` TINYINT NOT NULL DEFAULT 0,
    `listid` INTEGER NOT NULL,
    `list` TEXT NOT NULL,

    UNIQUE INDEX `house_lists_house_id_world_id_listid_key`(`house_id`, `world_id`, `listid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `house_data` (
    `house_id` INTEGER UNSIGNED NOT NULL,
    `world_id` TINYINT NOT NULL DEFAULT 0,
    `data` LONGBLOB NOT NULL,

    UNIQUE INDEX `house_data_house_id_world_id_key`(`house_id`, `world_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tiles` (
    `id` INTEGER UNSIGNED NOT NULL,
    `world_id` TINYINT NOT NULL DEFAULT 0,
    `house_id` INTEGER UNSIGNED NOT NULL,
    `x` INTEGER UNSIGNED NOT NULL,
    `y` INTEGER UNSIGNED NOT NULL,
    `z` TINYINT UNSIGNED NOT NULL,

    INDEX `tiles_x_y_z_idx`(`x`, `y`, `z`),
    UNIQUE INDEX `tiles_id_world_id_key`(`id`, `world_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tile_items` (
    `tile_id` INTEGER UNSIGNED NOT NULL,
    `world_id` TINYINT NOT NULL DEFAULT 0,
    `sid` INTEGER NOT NULL,
    `pid` INTEGER NOT NULL DEFAULT 0,
    `itemtype` INTEGER NOT NULL,
    `count` INTEGER NOT NULL DEFAULT 0,
    `attributes` LONGBLOB NOT NULL,

    INDEX `tile_items_sid_idx`(`sid`),
    UNIQUE INDEX `tile_items_tile_id_world_id_sid_key`(`tile_id`, `world_id`, `sid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `guilds` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `world_id` TINYINT NOT NULL DEFAULT 0,
    `name` VARCHAR(255) NOT NULL,
    `ownerid` INTEGER NOT NULL,
    `creationdata` INTEGER NOT NULL,
    `checkdata` INTEGER NOT NULL,
    `motd` VARCHAR(255) NOT NULL,
    `balance` BIGINT UNSIGNED NOT NULL DEFAULT 0,

    UNIQUE INDEX `guilds_name_world_id_key`(`name`, `world_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `guild_invites` (
    `player_id` INTEGER NOT NULL,
    `guild_id` INTEGER NOT NULL,

    UNIQUE INDEX `guild_invites_player_id_guild_id_key`(`player_id`, `guild_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `guild_ranks` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `guild_id` INTEGER NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `level` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `guild_wars` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `guild_id` INTEGER NOT NULL,
    `enemy_id` INTEGER NOT NULL,
    `begin` BIGINT NOT NULL DEFAULT 0,
    `end` BIGINT NOT NULL DEFAULT 0,
    `frags` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `payment` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `guild_kills` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `enemy_kills` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `status` TINYINT UNSIGNED NOT NULL DEFAULT 0,

    INDEX `guild_wars_status_idx`(`status`),
    INDEX `guild_wars_guild_id_idx`(`guild_id`),
    INDEX `guild_wars_enemy_id_idx`(`enemy_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `guild_kills` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `guild_id` INTEGER NOT NULL,
    `war_id` INTEGER NOT NULL,
    `death_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bans` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `type` TINYINT NOT NULL,
    `value` INTEGER UNSIGNED NOT NULL,
    `param` INTEGER UNSIGNED NOT NULL DEFAULT 4294967295,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `expires` INTEGER NOT NULL,
    `added` INTEGER UNSIGNED NOT NULL,
    `admin_id` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `comment` TEXT NOT NULL,
    `reason` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `action` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `statement` VARCHAR(255) NOT NULL DEFAULT '',

    INDEX `bans_type_value_idx`(`type`, `value`),
    INDEX `bans_active_idx`(`active`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `global_storage` (
    `key` INTEGER UNSIGNED NOT NULL,
    `world_id` TINYINT NOT NULL DEFAULT 0,
    `value` VARCHAR(255) NOT NULL DEFAULT '0',

    UNIQUE INDEX `global_storage_key_world_id_key`(`key`, `world_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `server_config` (
    `config` VARCHAR(35) NOT NULL,
    `value` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `server_config_config_key`(`config`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `server_motd` (
    `id` INTEGER UNSIGNED NOT NULL,
    `world_id` TINYINT NOT NULL DEFAULT 0,
    `text` TEXT NOT NULL,

    UNIQUE INDEX `server_motd_id_world_id_key`(`id`, `world_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `server_record` (
    `record` INTEGER NOT NULL,
    `world_id` TINYINT NOT NULL DEFAULT 0,
    `timestamp` BIGINT NOT NULL,

    UNIQUE INDEX `server_record_record_world_id_timestamp_key`(`record`, `world_id`, `timestamp`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `server_reports` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `world_id` TINYINT NOT NULL DEFAULT 0,
    `player_id` INTEGER NOT NULL DEFAULT 1,
    `posx` INTEGER NOT NULL DEFAULT 0,
    `posy` INTEGER NOT NULL DEFAULT 0,
    `posz` INTEGER NOT NULL DEFAULT 0,
    `timestamp` BIGINT NOT NULL DEFAULT 0,
    `report` TEXT NOT NULL,
    `reads` INTEGER NOT NULL DEFAULT 0,

    INDEX `server_reports_world_id_idx`(`world_id`),
    INDEX `server_reports_reads_idx`(`reads`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `players` ADD CONSTRAINT `players_account_id_fkey` FOREIGN KEY (`account_id`) REFERENCES `accounts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `monster_attacks` ADD CONSTRAINT `monster_attacks_monster_id_fkey` FOREIGN KEY (`monster_id`) REFERENCES `monsters`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `monster_defenses` ADD CONSTRAINT `monster_defenses_monster_id_fkey` FOREIGN KEY (`monster_id`) REFERENCES `monsters`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `monster_voices` ADD CONSTRAINT `monster_voices_monster_id_fkey` FOREIGN KEY (`monster_id`) REFERENCES `monsters`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `monster_summons` ADD CONSTRAINT `monster_summons_monster_id_fkey` FOREIGN KEY (`monster_id`) REFERENCES `monsters`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `monster_loot` ADD CONSTRAINT `monster_loot_monster_id_fkey` FOREIGN KEY (`monster_id`) REFERENCES `monsters`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `monster_events` ADD CONSTRAINT `monster_events_monster_id_fkey` FOREIGN KEY (`monster_id`) REFERENCES `monsters`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `account_viplist` ADD CONSTRAINT `account_viplist_account_id_fkey` FOREIGN KEY (`account_id`) REFERENCES `accounts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `account_viplist` ADD CONSTRAINT `account_viplist_player_id_fkey` FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `player_deaths` ADD CONSTRAINT `player_deaths_player_id_fkey` FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `player_depotitems` ADD CONSTRAINT `player_depotitems_player_id_fkey` FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `player_items` ADD CONSTRAINT `player_items_player_id_fkey` FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `player_namelocks` ADD CONSTRAINT `player_namelocks_player_id_fkey` FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `player_skills` ADD CONSTRAINT `player_skills_player_id_fkey` FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `player_spells` ADD CONSTRAINT `player_spells_player_id_fkey` FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `player_storage` ADD CONSTRAINT `player_storage_player_id_fkey` FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `player_viplist` ADD CONSTRAINT `player_viplist_player_id_fkey` FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `player_viplist` ADD CONSTRAINT `player_viplist_vip_id_fkey` FOREIGN KEY (`vip_id`) REFERENCES `players`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `killers` ADD CONSTRAINT `killers_death_id_fkey` FOREIGN KEY (`death_id`) REFERENCES `player_deaths`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `player_killers` ADD CONSTRAINT `player_killers_kill_id_fkey` FOREIGN KEY (`kill_id`) REFERENCES `killers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `player_killers` ADD CONSTRAINT `player_killers_player_id_fkey` FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `environment_killers` ADD CONSTRAINT `environment_killers_kill_id_fkey` FOREIGN KEY (`kill_id`) REFERENCES `killers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `house_auctions` ADD CONSTRAINT `house_auctions_house_id_world_id_fkey` FOREIGN KEY (`house_id`, `world_id`) REFERENCES `houses`(`id`, `world_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `house_auctions` ADD CONSTRAINT `house_auctions_player_id_fkey` FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `house_lists` ADD CONSTRAINT `house_lists_house_id_world_id_fkey` FOREIGN KEY (`house_id`, `world_id`) REFERENCES `houses`(`id`, `world_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `house_data` ADD CONSTRAINT `house_data_house_id_world_id_fkey` FOREIGN KEY (`house_id`, `world_id`) REFERENCES `houses`(`id`, `world_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tiles` ADD CONSTRAINT `tiles_house_id_world_id_fkey` FOREIGN KEY (`house_id`, `world_id`) REFERENCES `houses`(`id`, `world_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tile_items` ADD CONSTRAINT `tile_items_tile_id_world_id_fkey` FOREIGN KEY (`tile_id`, `world_id`) REFERENCES `tiles`(`id`, `world_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `guild_invites` ADD CONSTRAINT `guild_invites_player_id_fkey` FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `guild_invites` ADD CONSTRAINT `guild_invites_guild_id_fkey` FOREIGN KEY (`guild_id`) REFERENCES `guilds`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `guild_ranks` ADD CONSTRAINT `guild_ranks_guild_id_fkey` FOREIGN KEY (`guild_id`) REFERENCES `guilds`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `guild_wars` ADD CONSTRAINT `guild_wars_guild_id_fkey` FOREIGN KEY (`guild_id`) REFERENCES `guilds`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `guild_wars` ADD CONSTRAINT `guild_wars_enemy_id_fkey` FOREIGN KEY (`enemy_id`) REFERENCES `guilds`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `guild_kills` ADD CONSTRAINT `guild_kills_guild_id_fkey` FOREIGN KEY (`guild_id`) REFERENCES `guilds`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `guild_kills` ADD CONSTRAINT `guild_kills_war_id_fkey` FOREIGN KEY (`war_id`) REFERENCES `guild_wars`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `guild_kills` ADD CONSTRAINT `guild_kills_death_fk` FOREIGN KEY (`death_id`) REFERENCES `player_deaths`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `guild_kills` ADD CONSTRAINT `guild_kills_killer_fk` FOREIGN KEY (`death_id`) REFERENCES `killers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `server_reports` ADD CONSTRAINT `server_reports_player_id_fkey` FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
