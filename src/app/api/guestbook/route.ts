import { NextRequest, NextResponse } from 'next/server';
import { readJsonFile, writeJsonFile } from '@/lib/utils/jsonStorage';

interface Signature {
  id: string;
  name?: string;
  message: string;
  date: string;
}

export async function GET() {
  try {
    const data = await readJsonFile<{ signatures: Signature[] }>('guestbook.json');
    // Handle case where file doesn't exist or is empty
    if (!data || !data.signatures) {
      return NextResponse.json({ signatures: [] }, { status: 200 });
    }
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading guestbook:', error);
    return NextResponse.json({ signatures: [] }, { status: 200 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, message } = body;

    if (!message || !message.trim()) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Basic content filtering to prevent obvious vandalism
    const blockedWords = ['spam', 'hack', 'delete', 'remove', 'destroy'];
    const messageLower = message.toLowerCase();
    if (blockedWords.some(word => messageLower.includes(word))) {
      return NextResponse.json(
        { error: 'Message contains inappropriate content' },
        { status: 400 }
      );
    }

    const newSignature: Signature = {
      id: Date.now().toString(),
      name: name?.trim() || undefined,
      message: message.trim(),
      date: new Date().toISOString(),
    };

    let data: { signatures: Signature[] };
    try {
      data = await readJsonFile<{ signatures: Signature[] }>('guestbook.json');
    } catch {
      data = { signatures: [] };
    }
    
    const signatures = data.signatures || [];
    signatures.unshift(newSignature); // Add to beginning

    await writeJsonFile('guestbook.json', { signatures });

    return NextResponse.json(newSignature, { status: 201 });
  } catch (error) {
    console.error('Error saving signature:', error);
    return NextResponse.json(
      { error: 'Failed to save signature' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'ID is required' },
        { status: 400 }
      );
    }

    let data: { signatures: Signature[] };
    try {
      data = await readJsonFile<{ signatures: Signature[] }>('guestbook.json');
    } catch {
      data = { signatures: [] };
    }
    
    const signatures = (data.signatures || []).filter(sig => sig.id !== id);

    await writeJsonFile('guestbook.json', { signatures });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error deleting signature:', error);
    return NextResponse.json(
      { error: 'Failed to delete signature' },
      { status: 500 }
    );
  }
}

