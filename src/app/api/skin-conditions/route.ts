import { NextResponse } from 'next/server';
import { SKIN_CONDITIONS } from '@/data/skin-conditions';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const category = searchParams.get('category');
  const search = searchParams.get('search');

  if (id) {
    const condition = SKIN_CONDITIONS.find(c => c.id === id);
    if (!condition) {
      return NextResponse.json({ error: 'Condition not found' }, { status: 404 });
    }
    return NextResponse.json(condition);
  }

  if (category) {
    const conditions = SKIN_CONDITIONS.filter(c => c.category === category);
    return NextResponse.json(conditions);
  }

  if (search) {
    const query = search.toLowerCase();
    const conditions = SKIN_CONDITIONS.filter(c => 
      c.name.toLowerCase().includes(query) ||
      c.description.toLowerCase().includes(query) ||
      c.symptoms.some(s => s.toLowerCase().includes(query))
    );
    return NextResponse.json(conditions);
  }

  return NextResponse.json(SKIN_CONDITIONS);
}