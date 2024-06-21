# Router.so

## Description

This is a simple router for forms.

# Self-Hosting router

## Prerequisites

Before starting, ensure you have the following:

- An account with [Resend](https://resend.com/)
- An account with [Vercel](https://vercel.com/)
- A PostgreSQL database (we recommend [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres))

## Environment Variables

After creating your accounts, update your `.env.example` to be `.env.local` for running the application locally. Then update the keys for each value.

## Step-by-Step Instructions

1. **Clone the Repository**

   ```sh
   git clone https://github.com/9d8dev/router.git
   cd router/main
   ```

2. **Install Dependencies**

   ```sh
   npm install
   ```

3. **Set Up Environment Variables**

   Ensure your `.env` file is correctly configured as mentioned above.

4. **Generate the Database Migrations**

   ```sh
   npm drizzle-kit generate
   ```

5. **Run the Databse Migrations**

   ```sh
   npm tsx lib/db/migrate.ts
   ```

6. **Start the Development Server**

   ```sh
   npm run dev
   ```

## Deploying to Vercel

- Push your code to a GitHub repository.
- Connect your repository to Vercel.
- Set the environment variables in Vercel's dashboard under "Settings > Environment Variables".

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Resend Documentation](https://resend.com/docs)

For any issues or questions, please open an issue on the [GitHub repository](https://github.com/9d8dev/router).
