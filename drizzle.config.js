export default {
    schema: "./lib/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: process.env.NEXT_PUBLIC_DRIZZLE_DATABASE_URL
    }
  };