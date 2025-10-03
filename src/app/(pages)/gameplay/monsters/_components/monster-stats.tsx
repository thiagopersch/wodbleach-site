'use client';

import { useMonsters } from '@/app/(pages)/gameplay/monsters/_hooks/useMonsters';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  calculateDifficulty,
  formatExperience,
  getRaceBackground,
  getRaceColor,
} from '@/lib/api/monsters/utils/monster-utils';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#8dd1e1'];

export function MonsterStats() {
  const { data: monsters = [], isLoading } = useMonsters();

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-muted h-32 animate-pulse rounded" />
        ))}
      </div>
    );
  }

  // Calculate statistics
  const raceStats = monsters.reduce(
    (acc, monster) => {
      acc[monster.race] = (acc[monster.race] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const difficultyStats = monsters.reduce(
    (acc, monster) => {
      const difficulty = calculateDifficulty(monster);
      acc[difficulty] = (acc[difficulty] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const raceChartData = Object.entries(raceStats).map(([race, count]) => ({
    race,
    count,
    percentage: ((count / monsters.length) * 100).toFixed(1),
  }));

  const difficultyChartData = Object.entries(difficultyStats).map(([difficulty, count]) => ({
    difficulty,
    count,
    percentage: ((count / monsters.length) * 100).toFixed(1),
  }));

  const topMonsters = monsters.sort((a, b) => b.experience - a.experience).slice(0, 5);

  const averageStats = {
    experience:
      monsters.length > 0 ? Math.round(monsters.reduce((sum, m) => sum + m.experience, 0) / monsters.length) : 0,
    health: monsters.length > 0 ? Math.round(monsters.reduce((sum, m) => sum + m.health_max, 0) / monsters.length) : 0,
    speed: monsters.length > 0 ? Math.round(monsters.reduce((sum, m) => sum + m.speed, 0) / monsters.length) : 0,
  };

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">XP Médio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatExperience(averageStats.experience)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">HP Médio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageStats.health.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Velocidade Média</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageStats.speed}</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Race Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Distribuição por Raça</CardTitle>
            <CardDescription>Quantidade de monstros por raça</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={raceChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="race" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Difficulty Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Distribuição por Dificuldade</CardTitle>
            <CardDescription>Quantidade de monstros por nível de dificuldade</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={difficultyChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ difficulty, percentage }) => `${difficulty} (${percentage}%)`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {difficultyChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Race Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Detalhamento por Raça</CardTitle>
          <CardDescription>Estatísticas detalhadas de cada raça</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(raceStats).map(([race, count]) => {
              const percentage = (count / monsters.length) * 100;
              return (
                <div key={race} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge className={getRaceBackground(race)}>
                      <span className={getRaceColor(race)}>{race}</span>
                    </Badge>
                    <span className="font-mono text-sm">
                      {count} ({percentage.toFixed(1)}%)
                    </span>
                  </div>
                  <Progress value={percentage} className="h-2" />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Top Monsters */}
      <Card>
        <CardHeader>
          <CardTitle>Top 5 Monstros (por XP)</CardTitle>
          <CardDescription>Os monstros que dão mais experiência</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topMonsters.map((monster, index) => (
              <div key={monster.id} className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center gap-3">
                  <div className="bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-medium">{monster.name}</div>
                    <div className="text-muted-foreground text-sm">
                      <Badge className={getRaceBackground(monster.race)} variant="secondary">
                        <span className={getRaceColor(monster.race)}>{monster.race}</span>
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono font-bold">{formatExperience(monster.experience)} XP</div>
                  <div className="text-muted-foreground text-sm">{monster.health_max} HP</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
