import axios from 'axios';
import { NextResponse } from 'next/server';
const AI71_API_KEY = process.env.AI71_API_KEY;

export async function POST(request) {
    try {
        const {
            evaluation_title,
            evaluation_type,
            user_details,
            user_age,
            user_id,
            user_resume,
        } = await request.json();


        if (!evaluation_title || !evaluation_type || !user_details || !user_age || !user_id) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }


        const system_prompt = {
            role: "system",
            content: `You are a professional interviewer specializing in ${evaluation_type}. Your task is to conduct an interview based on the provided details and generate questions that are tailored to the user's profile. You will be given variables such as 'interview_title', 'user_age', 'user_details', 'user_cv' (optional), and 'previous questions' (optional). Ensure that your questions are relevant and avoid repeating any from the previous set if provided.`
        }

        const user_prompt = {
            role: "user",
            content: `You are preparing for an interview titled '${evaluation_title}'. Here are your details:
            - Age: ${user_age}
            - Profile: ${user_details}
            ${user_resume ? `- CV: ${user_resume}` : ''}

            Please generate a set of interview questions specific to this interview type and title. Ensure the questions are suitable for the user's profile and do not repeat any from the previous questions if provided. Output the questions in the following JSON format:
            Example:
            [
            {
                "question": "What is HTML?",
                "order": 0
            },
            {
                "question": "What is CSS?",
                "order": 1
            }
            ...
            ]`
        };

    
        
        const data = {model: "tiiuae/falcon-180B-chat",messages: [system_prompt,user_prompt]};
        let response = await axios.post('https://api.ai71.ai/v1/chat/completions', data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${AI71_API_KEY}`
            }
        })
        let questions = response.data.choices[0].message.content;
        return NextResponse.json(questions);
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error?.message);
        return NextResponse.json({ error: 'Error from Server' }, { status: 500 });
    }
}