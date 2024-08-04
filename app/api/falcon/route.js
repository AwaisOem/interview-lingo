import { db } from "@/lib/db";
import { MockEval } from "@/lib/schema";
import axios from "axios";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
const AI71_API_KEY = process.env.AI71_API_KEY;


export async function POST(request) {
  try {
    const { mockID, conversation } = await request.json();

    if (!conversation || !mockID) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const mockEval = await db.select().from(MockEval).where(eq(MockEval.mockID,mockID)).limit(1).execute();
    let { mockTitle: evaluation_title ,mockType:  evaluation_type,mockUserAge: user_age, mockDesc : user_details,mockCVText: user_cv ,isCall } = mockEval[0]
    if(!isCall){
        return NextResponse.json(
            { error: "This mock id is not for call" },
            { status: 400 }
          );
    }
    

    const system_prompt = {
      role: "system",
      content: `You are a professional interviewer conducting interviews in the field of ${evaluation_type}. You are an expert in this area and can evaluate candidates effectively. You will be provided with the following variables:

interview_title: ${evaluation_title}.
user_age: ${user_age}.
user_details: ${user_details}.
user_cv: ${user_cv} (optional).
Your tasks are as follows:

Greet the user warmly and professionally.
Ask the user to introduce themselves.
Conduct the interview by asking questions one by one based on the provided interview type.
Capture the user's responses without revealing any answers.
Maintain a natural flow, as the interview will be conducted via voice.
don't use any names or placeholders
don't exceed your question's length then 100
you should ask questions one by one(first you ask one question then user give reply to that then you should ask another question)

Interview Flow:
Greeting:

Greet the user.
Ask the user to introduce themselves.
Interview Questions:

Ask questions relevant to the ${evaluation_type} category.
Allow the user time to respond to each question.
Proceed to the next question based on the user's response.

Concluding the Interview:
Thank the user for their time and responses.
Inform the user about the next steps or any follow-up actions if applicable.

Sample Prompts:
Greeting and Introduction:
"Hello, thank you for joining this interview. I will be conducting this interview for the position of ${evaluation_title}. To start, could you please introduce yourself?"

Remember, as the interviewer, to maintain a conversational and engaging tone throughout the interview.`,
    };

    const data = {
      model: "tiiuae/falcon-180B-chat",
      temperature:0.2,
      max_tokens:100,
      messages: [system_prompt, ...conversation],
    };
    let response = await axios.post(
      "https://api.ai71.ai/v1/chat/completions",
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AI71_API_KEY}`,
        },
      }
    );
    let results = response.data.choices[0].message.content;
    return NextResponse.json({ text: results }, { status: 200 });
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error?.message
    );
    return NextResponse.json({ error: "Error from Server" }, { status: 500 });
  }
}
