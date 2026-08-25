# Pablo Taquechel Insurance

The independent source code for Pablo Taquechel's We Insure Miami website. The site is a TanStack Start application deployed on Vercel, with quote requests stored in Supabase and transactional notifications sent through Resend.

## Local development

Requirements: Node.js 22+ and npm.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Populate the environment variables in `.env.local` from the Vercel project. Never commit real credentials or customer quote data.

## Commands

```bash
npm run test
npm run typecheck
npm run lint
npm run build
```

## Runtime services

- **Vercel** builds and hosts the application. GitHub pull requests create previews; changes pushed to `main` deploy automatically.
- **Supabase** stores `quote_requests`. Apply the two SQL files in `supabase/migrations` in filename order to a new project.
- **Resend** sends quote notifications to `QUOTE_NOTIFICATION_EMAIL`. Verify the sender domain before setting `QUOTE_FROM_EMAIL` in production.
- **Vercel Blob** stores the published team roster and uploaded team photos.

Required variables:

| Variable                        | Exposure      | Purpose                                          |
| ------------------------------- | ------------- | ------------------------------------------------ |
| `SUPABASE_URL`                  | Server        | Supabase project URL                             |
| `SUPABASE_SERVICE_ROLE_KEY`     | Server secret | Inserts quote requests; never use in the browser |
| `VITE_SUPABASE_URL`             | Public        | Browser Supabase URL                             |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Public        | Browser publishable key                          |
| `RESEND_API_KEY`                | Server secret | Sends quote notifications                        |
| `QUOTE_FROM_EMAIL`              | Server        | Verified Resend sender                           |
| `QUOTE_NOTIFICATION_EMAIL`      | Server        | Notification recipient                           |
| `BLOB_READ_WRITE_TOKEN`         | Server secret | Team roster and photo storage                    |
| `ADMIN_PASSWORD_HASH`           | Server secret | Scrypt password hash; never store plaintext      |
| `ADMIN_SESSION_SECRET`          | Server secret | Signs eight-hour admin sessions                  |

## Team admin

Open `/admin` on the production site and enter the private password. Set `ADMIN_PASSWORD_HASH` in Vercel to the password directly for the simple setup, or use a `scrypt$...` hash for stronger protection. Admin sessions use an HttpOnly, Secure, SameSite cookie and all writes require a per-session CSRF token. Photos must be JPG, PNG, or WebP files smaller than 5 MB.

## Data migration

Historical quote rows contain customer PII. Move them directly between database providers using an authenticated export/import, verify schema and row counts, and never place the export in Git or deployment logs.

The original Lovable project should remain online until the Vercel production site, database insert, and email delivery have all been verified.

## Images

The source connector did not provide portable JPEG bytes. The migrated app therefore references the same publicly available Pablo portrait from We Insure and the matching Miami-home image used by the original design. Replace either URL with a repository-owned licensed asset when available.

## Making changes

Create a branch, make the change, run the four verification commands above, and open a pull request into `main`. Do not commit `.env.local`, Supabase exports, or customer information.
