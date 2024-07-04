This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## How to run locally

1. Install all dependencies.
    ```bash
    bun install
    ```
2. Create a new `local/` folder inside `src/db/`.
3. Run a db server on your localhost. Keep this session running.
    ```bash
    bun run db:local
    ```
4. Run the DB migrations.
    ```bash
    bun run db:migrate
    ```
5. If this is your first time running the app in your localhost, run the DB seeding script.
    ```bash
    bun run db:seed
    ```

## DB Scripts
1. Create an sql file together with additional information needed for `drizzle-kit`. After generating those migrations, they won’t be applied to a database. You need to do it in the next step.
    ```bash
    bun run db:generate
    ```
2. On the other hand, `push` doesn’t need any migrations to be generated. It will simply sync your schema with the database schema. Please be careful when using it; we recommend it only for local development and local databases.
    ```bash
    bun run db:push
    ```
3. Apply migrations stored in you migrations folder and outputed by `drizzle-kit generate`
    ```bash
    bun run db:migrate
    ```
4.  Keep all metadata up to date.
    ```bash
    bun run db:up
    ```