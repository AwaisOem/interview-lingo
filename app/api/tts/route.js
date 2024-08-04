import { NextResponse } from 'next/server';
import OpenAI from 'openai';
const OPEN_API_KEY = process.env.OPEN_API_KEY;

const openai = new OpenAI({
  apiKey: OPEN_API_KEY,
});

export async function POST(request) {
    try {
        const {text} = await request.json();

        if (!text) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }
        const wav = await openai.audio.speech.create({
            model: "tts-1",
            voice: "alloy", 
            input: text,
            response_format:"wav"
        });  

        const buffer= await wav.arrayBuffer()
        const base64 = btoa(new Uint8Array(buffer).reduce((data, byte) => data + String.fromCharCode(byte), ''));
        const audioSrc = `data:audio/wav;base64,${base64}`;
        return NextResponse.json({base64audio:audioSrc})
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error?.message);
        return NextResponse.json({ error: 'Error from Server' }, { status: 500 });
    }
}