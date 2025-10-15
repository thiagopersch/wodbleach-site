import { MonsterDB } from '@/lib/db';
import { NextResponse } from 'next/server';

// GET /api/monsters/stats - Get monster statistics
export async function GET() {
  try {
    const monsters = MonsterDB.getAll();

    // Calculate statistics
    const stats = {
      total: monsters.length,
      byRace: monsters.reduce(
        (acc, monster) => {
          acc[monster.race] = (acc[monster.race] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>,
      ),
      byDifficulty: monsters.reduce(
        (acc, monster) => {
          const score =
            monster.experience + monster.healthMax / 10 + monster.speed / 10;
          let difficulty: string;

          if (score < 100) difficulty = 'Easy';
          else if (score < 1000) difficulty = 'Medium';
          else if (score < 5000) difficulty = 'Hard';
          else difficulty = 'Extreme';

          acc[difficulty] = (acc[difficulty] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>,
      ),
      averageExperience:
        monsters.length > 0
          ? Math.round(
              monsters.reduce((sum, monster) => sum + monster.experience, 0) /
                monsters.length,
            )
          : 0,
      averageHealth:
        monsters.length > 0
          ? Math.round(
              monsters.reduce((sum, monster) => sum + monster.healthMax, 0) /
                monsters.length,
            )
          : 0,
      totalExperience: monsters.reduce(
        (sum, monster) => sum + monster.experience,
        0,
      ),
      mostPowerful:
        monsters.length > 0
          ? monsters.reduce((max, monster) =>
              monster.experience > max.experience ? monster : max,
            )
          : null,
      recentlyCreated: monsters
        .sort(
          (a, b) =>
            new Date(b.created_at ?? 0).getTime() -
            new Date(a.created_at ?? 0).getTime(),
        )
        .slice(0, 5),
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching monster stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch monster statistics' },
      { status: 500 },
    );
  }
}
