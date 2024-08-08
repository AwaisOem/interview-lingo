
# InterviewLingo

AI assistant which help with interviews, hiring, personality development and communication skills

## main functionalities:
- AI chat based mock evaluation(interview) 
- AI voice based mock evaluation(interview) 
- Job recommendations based on your resume 

## Video Demo

<video src="" width="320" height="240" controls></video>
[![Watch the video](https://raw.githubusercontent.com/username/repository/branch/path/to/thumbnail.jpg)](https://raw.githubusercontent.com/username/repository/branch/path/to/video.mp4)

[asd](https://raw.githubusercontent.com/interview-lingo/blob/main/public/mockview-demo.mp4)


## Tech Stack

**Client:** Next.js, TailwindCSS, Shadcn, Clerk, Analytics

**Server:** Next.js API, Whisper OpenAI, AI71, pdf-parse

**Database:** PostgreSQL (Neon), Drizzle ORM


## Run on Local Machine

To deploy this project run:

- first create `.env.local` in root and add these

- get `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY`from clerk dashboard after creating fresh project.

- create postgres DB anywhere you want ([neon](https://github.com/neondatabase/neon) recommended) and then paste url in `NEXT_PUBLIC_DRIZZLE_DATABASE_URL`

- get `AI71_API_KEY` from [ai71.ai](https://ai71.ai/)

- `JSEARCH_API_KEY` from [job search api](https://rapidapi.com/letscrape-6bRBa3QguO5/api/jsearch)

- get `OPEN_API_KEY` from [openai.com](https://openai.com/)

```bash
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=secret
    CLERK_SECRET_KEY=secret
    NEXT_PUBLIC_DRIZZLE_DATABASE_URL=secret
    AI71_API_KEY=secret
    JSEARCH_API_KEY=secret
    OPEN_API_KEY=secret
```

- in `drizzle.config.js` change `process.env.NEXT_PUBLIC_DRIZZLE_DATABASE_URL` to your real database url, bcz env variables don't work in this file  

- after that run these commmands in row

```bash
  npm i
```
```bash
  npm run db:push
```
```bash
  npm run dev
```
- to see and manage DB entries, run this

```bash
  npm run db:studio
```

Congradulations Your Local Setup is Ready

## Authors

- [@awaisoem](https://www.github.com/awaisoem)
- [@arsalanahmad123](https://www.github.com/arsalanahmad123)
- [@Ameer-Hamza289](https://www.github.com/Ameer-Hamza289)

