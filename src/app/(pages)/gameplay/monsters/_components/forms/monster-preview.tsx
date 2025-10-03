'use client';

import type { MonsterFormData } from '@/app/(pages)/gameplay/monsters/_hooks/schemas';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  calculateDifficulty,
  formatExperience,
  getDifficultyColor,
  getRaceBackground,
  getRaceColor,
  getSkullName,
} from '@/lib/api/monsters/utils/monster-utils';
import { Heart, Shield, Sword, Zap } from 'lucide-react';

interface MonsterPreviewProps {
  data: MonsterFormData;
}

export function MonsterPreview({ data }: MonsterPreviewProps) {
  const healthPercentage =
    data.healthMax > 0 ? (data.healthNow / data.healthMax) * 100 : 0;
  const difficulty = calculateDifficulty(data as any);

  return (
    <div className="space-y-4">
      {/* Monster Header */}
      <div className="space-y-2 text-center">
        <h3 className="text-xl font-bold text-balance">
          {data.name || 'Novo Monstro'}
        </h3>
        {data.description && (
          <p className="text-muted-foreground text-sm text-pretty">
            {data.description}
          </p>
        )}
        <div className="flex items-center justify-center gap-2">
          <Badge className={getRaceBackground(data.race)}>
            <span className={getRaceColor(data.race)}>{data.race}</span>
          </Badge>
          <Badge variant="outline" className={getDifficultyColor(difficulty)}>
            {difficulty}
          </Badge>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="p-3">
          <div className="flex items-center gap-2">
            <Heart className="h-4 w-4 text-red-400" />
            <div className="flex-1">
              <div className="text-muted-foreground text-xs">HP</div>
              <div className="font-mono text-sm">
                {data.healthNow}/{data.healthMax}
              </div>
              <Progress value={healthPercentage} className="mt-1 h-1" />
            </div>
          </div>
        </Card>

        <Card className="p-3">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-yellow-400" />
            <div className="flex-1">
              <div className="text-muted-foreground text-xs">XP</div>
              <div className="font-mono text-sm">
                {formatExperience(data.experience)}
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-3">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-blue-400" />
            <div className="flex-1">
              <div className="text-muted-foreground text-xs">Defesa</div>
              <div className="font-mono text-sm">
                {data.defenses_armor}/{data.defenses_defense}
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-3">
          <div className="flex items-center gap-2">
            <Sword className="h-4 w-4 text-orange-400" />
            <div className="flex-1">
              <div className="text-muted-foreground text-xs">Velocidade</div>
              <div className="font-mono text-sm">{data.speed}</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Additional Info */}
      <div className="space-y-2 text-xs">
        {data.skull > 0 && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">Skull:</span>
            <span>{getSkullName(data.skull)}</span>
          </div>
        )}
        {data.manacost > 0 && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">Mana Cost:</span>
            <span>{data.manacost}</span>
          </div>
        )}
        {data.look_type_id > 0 && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">Look ID:</span>
            <span>{data.look_type_id}</span>
          </div>
        )}
      </div>

      {/* Flags Preview */}
      <div className="space-y-2">
        <div className="text-muted-foreground text-xs font-medium">
          Flags Ativas:
        </div>
        <div className="flex flex-wrap gap-1">
          {data.flag_summonable && (
            <Badge variant="secondary" className="text-xs">
              Summonable
            </Badge>
          )}
          {data.flag_attackable && (
            <Badge variant="secondary" className="text-xs">
              Attackable
            </Badge>
          )}
          {data.flag_hostile && (
            <Badge variant="secondary" className="text-xs">
              Hostile
            </Badge>
          )}
          {data.flag_convinceable && (
            <Badge variant="secondary" className="text-xs">
              Convinceable
            </Badge>
          )}
          {data.flag_pushable && (
            <Badge variant="secondary" className="text-xs">
              Pushable
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}
