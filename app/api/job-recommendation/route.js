import axios from 'axios';

const AI71_API_KEY = process.env.AI71_API_KEY;
const JSEARCH_API_KEY = process.env.JSEARCH_API_KEY;

async function getJobTitle(cvText) {
  const messages = [
    {
      role: "system",
      content: "You are an expert in analyzing CVs and extracting the most suitable job title based on the skills, experiences, and qualifications listed.",
    },
    {
      role: "user",
      content: `Analyze the following CV text and respond with only the most appropriate job title: ${cvText}`,
    },
  ];

  try {
    const response = await axios.post(
      'https://api.ai71.ai/v1/chat/completions',
      {
        model: "tiiuae/falcon-180b-chat",
        messages: messages,
      },
      {
        headers: {
          'Authorization': `Bearer ${AI71_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const data = response.data;
    if (data.choices && data.choices[0] && data.choices[0].message) {
      return data.choices[0].message.content.trim();
    } else {
      throw new Error('Invalid response format');
    }
  } catch (error) {
    console.error('Error fetching job title:', error);
    return '';
  }
}

async function searchJobs(jobTitle) {
  const jobTitleQuery = encodeURIComponent(jobTitle);
  const url = `https://JSearch.proxy-production.allthingsdev.co/v1/search?query=${jobTitleQuery}&page=1&num_pages=1`;

  try {
    const response = await axios.get(url, {
      headers: {
        'x-apihub-key': JSEARCH_API_KEY,
        'x-apihub-host': 'JSearch.allthingsdev.co',
        'x-apihub-endpoint': '9c9baf06-30e7-41cf-84a4-db6f55e5634b',
      },
    });

    const jobsData = response.data;
    const jobs = jobsData.data.map(job => ({
      title: job.job_title || 'No Title',
      company: job.employer_name || 'No Company',
      logo: job.employer_logo || 'No Logo',
      apply_link: job.job_apply_link || 'No Link',
      company_website: job.employer_website || 'No Website',
      company_linkedin: job.employer_linkedin || 'No LinkedIn',
    }));

    return jobs;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return [];
  }
}

export async function POST(request) {
  const { cv_text } = await request.json();

  if (!cv_text) {
    return new Response(JSON.stringify({ error: 'No CV text provided' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  try {
    const jobTitle = await getJobTitle(cv_text);
    const jobs = await searchJobs(jobTitle);

    // Limit to 5 jobs if there are more than 5
    const limitedJobs = jobs.slice(0, 5);

    return new Response(JSON.stringify({ jobs: limitedJobs }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error('Error processing request:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
