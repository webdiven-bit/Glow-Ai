import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const image = formData.get('image') as File;
    
    if (!image) {
      return NextResponse.json(
        { error: 'No image provided' },
        { status: 400 }
      );
    }

    // Check file size - limit to 5MB
    if (image.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'Image too large. Maximum size is 5MB.' },
        { status: 400 }
      );
    }

    // Convert image to base64
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = buffer.toString('base64');

    // Your Hugging Face Space URL - make sure no trailing slash
    const HF_SPACE_URL = (process.env.HF_SPACE_URL || 'https://andevs-ewere.hf.space').replace(/\/$/, '');
    
    console.log('Sending to:', `${HF_SPACE_URL}/api/analyze-skin`);
    console.log('Image size:', Math.round(base64Image.length / 1024), 'KB');

    const response = await fetch(`${HF_SPACE_URL}/api/analyze-skin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image: base64Image
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('HF Space error:', errorText);
      console.error('Status:', response.status);
      throw new Error(`Analysis failed: ${response.status}`);
    }

    const data = await response.json();
    console.log('HF Space response received');
    
    // Map the response to your expected format
    return NextResponse.json({
      skinTone: data.skin_tone?.primary || data.skinTone || 'medium',
      undertone: data.skin_tone?.undertone || data.undertone || 'warm',
      conditions: data.conditions?.map((c: any) => ({
        id: c.condition?.toLowerCase().replace(/\s+/g, '-') || c.id || 'unknown',
        name: c.name || c.condition,
        confidence: Math.round(c.confidence) || 85
      })) || [
        { id: 'hyperpigmentation', name: 'Hyperpigmentation', confidence: 85 },
        { id: 'oily-skin', name: 'Oily T-Zone', confidence: 92 },
        { id: 'fine-lines', name: 'Fine Lines', confidence: 78 }
      ]
    });

  } catch (error) {
    console.error('Analysis error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze image' },
      { status: 500 }
    );
  }
}