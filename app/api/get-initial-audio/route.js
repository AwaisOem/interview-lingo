import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request) {
    try {
        
        const audioFilePath = path.join(process.cwd(), './public/audio.mp3'); // Assuming audio file is in the same directory as the route
        const audio = fs.readFileSync(audioFilePath);
        
        // const audioSrc = `data:audio/wav;base64,${base64}`;
        return NextResponse.json({base64audio:`data:audio/mpeg;base64,${audio.toString("base64")}`})
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error?.message);
        return NextResponse.json({ error: 'Error from Server' }, { status: 500 });
    }
}