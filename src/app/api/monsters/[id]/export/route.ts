import { monsterToXml } from '@/lib/api/monsters/utils/monster-utils';
import { MonsterDB } from '@/lib/db';
import { type NextRequest, NextResponse } from 'next/server';

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

// GET /api/monsters/[id]/export - Export monster to XML
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const monster = MonsterDB.getById(id);

    if (!monster) {
      return NextResponse.json({ error: 'Monster not found' }, { status: 404 });
    }

    const xml = monsterToXml(monster as any);

    return NextResponse.json({ xml, monster });
  } catch (error) {
    console.error('Error exporting monster:', error);
    return NextResponse.json({ error: 'Failed to export monster' }, { status: 500 });
  }
}

// GET /api/monsters/[id]/export?download=true - Download XML file
export async function GET_DOWNLOAD(request: NextRequest, { params }: RouteParams) {
  try {
    const { searchParams } = new URL(request.url);
    const download = searchParams.get('download') === 'true';

    if (!download) {
      // Redirect to regular export endpoint
      return GET(request, { params });
    }

    const { id } = await params;
    const monster = MonsterDB.getById(id);

    if (!monster) {
      return NextResponse.json({ error: 'Monster not found' }, { status: 404 });
    }

    const xml = monsterToXml(monster as any);
    const filename = `${monster.name.toLowerCase().replace(/\s+/g, '_')}.xml`;

    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error('Error downloading monster XML:', error);
    return NextResponse.json({ error: 'Failed to download monster XML' }, { status: 500 });
  }
}
