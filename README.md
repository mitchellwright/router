# Router.so

## Description

This is a simple router for forms.

# Self-Hosting router

## Prerequisites

Before starting, ensure you have the following:

- An account with [Resend](https://resend.com/)
- An account with [Vercel](https://vercel.com/)

## Environment Variables

Create a `.env` file in the root of your project and add the following environment variables:
RESEND_API_KEY=your_resend_api_key
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=your_nextauth_url

POSTGRES_URL=your_postgres_url
POSTGRES_PRISMA_URL=your_postgres_prisma_url
POSTGRES_URL_NO_SSL=your_postgres_url_no_ssl
POSTGRES_URL_NON_POOLING=your_postgres_url_non_pooling
POSTGRES_USER=your_postgres_user
POSTGRES_HOST=your_postgres_host
POSTGRES_PASSWORD=your_postgres_password
POSTGRES_DATABASE=your_postgres_database

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
