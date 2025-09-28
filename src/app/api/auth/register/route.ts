import { registerSchema } from '@/app/(pages)/account/_hooks/validations';
import { prisma } from '@/lib/prisma';
import { createHash } from 'crypto';
import { type NextRequest, NextResponse } from 'next/server';

// SHA1 hash function
function sha1Hash(password: string): string {
  return createHash('sha1').update(password).digest('hex');
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { accountname, password, email } = registerSchema.parse(body);

    // Check if account already exists
    const existingAccount = await prisma.account.findUnique({
      where: { name: accountname },
    });

    if (existingAccount) {
      return NextResponse.json({ error: 'Account name already exists' }, { status: 400 });
    }

    // Create new account with SHA1 hashed password
    const hashedPassword = sha1Hash(password);

    const account = await prisma.account.create({
      data: {
        name: accountname,
        password: hashedPassword,
        email: email || '',
        premdays: 0,
        groupId: 1,
      },
    });

    return NextResponse.json({
      message: 'Account created successfully',
      accountId: account.id,
    });
  } catch (error) {
    console.error('Registration error:', error);

    if (error instanceof Error && error.message.includes('validation')) {
      return NextResponse.json({ error: 'Invalid input data' }, { status: 400 });
    }

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
