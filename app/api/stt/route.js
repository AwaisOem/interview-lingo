import { NextResponse } from 'next/server';
import OpenAI from 'openai';
const OPEN_API_KEY = process.env.OPEN_API_KEY;
const openai = new OpenAI({
  apiKey: OPEN_API_KEY,
});

export async function POST(request) {
    try {
        const formData = await request.formData();
        const audio = formData.get('audio');

        if (!audio) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const transcription = await openai.audio.transcriptions.create({
            file: audio,
            model: "whisper-1",
        });
        return NextResponse.json({text: transcription.text});
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error?.message);
        return NextResponse.json({ error: 'Error from Server' }, { status: 500 });
    }
}