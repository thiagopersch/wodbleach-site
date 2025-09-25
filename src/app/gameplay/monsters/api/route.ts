import { type NextRequest, NextResponse } from 'next/server';

import { MonsterDB } from '@/lib/db';

import { monsterFormSchema } from '@/lib/api/monsters/schemas';
import { z } from 'zod';

// GET /api/monsters - Get all monsters
export async function GET() {
  try {
    const monsters = MonsterDB.getAll();
    return NextResponse.json(monsters);
  } catch (error) {
    console.error('Error fetching monsters:', error);
    return NextResponse.json({ error: 'Failed to fetch monsters' }, { status: 500 });
  }
}

// POST /api/monsters - Create new monster
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const validatedData = monsterFormSchema.parse(body);

    // Create monster
    const monster = MonsterDB.create(validatedData);

    return NextResponse.json(monster, { status: 201 });
  } catch (error: any) {
    console.error('Error creating monster:', error);

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

    return NextResponse.json({ error: 'Failed to create monster' }, { status: 500 });
  }
}
