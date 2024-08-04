import axios from 'axios';
import { NextResponse } from 'next/server';

const AI71_API_KEY = process.env.AI71_API_KEY;
export async function POST(request) {
    try {
     
        const {
            evaluation_title,
            evaluation_type,
            user_details,
            question_answers
        } = await request.json();
        console.log(question_answers)
        
        if (!evaluation_title || !evaluation_type || !user_details || !question_answers) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const system_prompt = {
            role: "system",
            content: `You are a professional interviewer specializing in ${evaluation_type}. Your task is to generate a comprehensive analysis based on the provided questions and answers. You will perform sentiment analysis, skill analysis, and any other necessary evaluations. Based on your analysis, you will generate exactly 5 metrics relevant to the interview type and assign a rating out of 100 to each metric. Finally, you will provide detailed recommendations for improvement.`
        };
        
        const user_prompt = {
                role: "user",
                content: `You are generating analysis after an interview titled '${evaluation_title}' in the category of ${evaluation_type}. Here are the user's details:
                - Profile: ${user_details}
        
                The following are the questions and user's answers:
                ${JSON.stringify(question_answers, null, 4)}
        
                Analyze these answers and questions and generate exactly 5 metrics
                The output should be in json format:
                Example for Personality Development: {
                    "metrics": [
                        { "metric": "Professionalism", "rating": 80 },
                        { "metric": "Communication", "rating": 90 },
                        { "metric": "Patience", "rating": 60 },
                        { "metric": "Knowledge", "rating": 30 },
                        { "metric": "Positivity", "rating": 10 }
                    ],
                    "recommendations": "Provide recommendations and feedback for improvement, ensuring they are more than 100 words."
                }
                This Example is for Personality Development Evaluation, Metrics should be different for every type of interview`
        }

        
        const data = {model: "tiiuae/falcon-180B-chat",messages: [system_prompt,user_prompt]};
        let response = await axios.post('https://api.ai71.ai/v1/chat/completions', data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${AI71_API_KEY}`
            }
        })
        let results = response.data.choices[0].message.content;
        return NextResponse.json(results, { status: 200 });
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error?.message);
        return NextResponse.json({ error: 'Error from Server' }, { status: 500 });
    }
}