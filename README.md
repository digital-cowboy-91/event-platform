# Events Platform

This is a Post Graduation JavaScript project which purpose is to build a fully functional MVP based on specific criteria in 40hrs.

## Overview

A small community business has reached out to you to create a platform where they can create and share events with members of the community.

You have been tasked with building and hosting a platform (web app or progressive web app) that allows community members to view, sign up for, and add events to their own personal calendars. Staff members should have additional functionality to create and manage events.

## Minimum Viable Product (MVP)

- Display a list of events for users to browse.
- Allow users to sign up for an event.
- Allow users to add events to their Calendar after signing up.
- Enable staff members to sign-in to create and manage events.

## Tech Stack

- Fullstack: TypeScript, Next.js, Zod
- Backend: Drizzle ORM
- Frontend: Radix UI, Tailwind, React QR Code, Tanstack Form
- Database + CDN: Supabase
- Hosting: Digital Ocean Droplet, Nginx, PM2

## Features

1. Public
   1. See the list of events
   1. See detail of single event
   1. Add event to the calendar using generated ICS file => wider compatibility, simpler implementation
   1. Creation of an account
1. Private (User)
   1. Sign In
   1. Edit user profile
   1. Delete user profile => account
   1. Get tickets for an event
   1. List tickets user is registered for, represented by QR codes
1. Private (CMS)
   1. List events in table
   1. Create, Update, Delete Event
   1. Upload picture for an event => one try only, reupload will currently fail for duplication reason

## Live Service

Hosted at [syt.colaia.dev](https://syt.colaia.dev)

### Testing Credentials

| email                         | password             | access     |
| ----------------------------- | -------------------- | ---------- |
| admin@syt.com                 | Admin123\*           | User + CMS |
| ida.toy@hotmail.com           | User123\*            | User       |
| earnest.sporer@gmail.com      | User123\*            | User       |
| henrietta.fritsch@hotmail.com | User123\*            | User       |
| _your_test_email_             | _your_test_password_ | User       |

## Run Your Own Copy

### Step 1 - Clone the repo and install dependencies

```
git clone https://github.com/digital-cowboy-91/event-platform
cd event-platform
npm install
```

### Step 2 - Supabase

1. Setup [Supabase](https://supabase.com/) account and project
1. Create a public bucket called `media`
1. Link Supabase to local project `npx supabase link`

### Step 3 - Link Supabase with project using env variables

1. In project directory create .env.local file
1. Put the following env variables to the created file and change their values with those retrieved from your Supabase project

```
DATABASE_URL=[POSTGRES_CONNECTION_URI]
SUPABASE_SERVICE_KEY=[SERVICE_KEY]
NEXT_PUBLIC_SUPABASE_URL=https://[PROJECT_ID].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[ANON_KEY]
NEXT_PUBLIC_SUPABASE_PUBLIC_BUCKET=media
```

### Step 4 - Initialize database

1. Initialize database using drizzle kit

```
npm run db:generate
npm run db:migrate
```

### Step 5 - Run the project and Seed database

1. Run the project using `npm run dev`
2. To Seed the database visit the following endpoint `http://localhost:[YOUR_PORT]/api/danger_zone/seed`

**Note:** Seeded data will be always the same. If you want to change the number of items and/or their data, open the `app/_lib/db/seeding/seed.ts` and change arguments passed to `getUsersSeed` and/or `getEventsSeed` (First argument represents the number of items you want to generate and the second argument the seed number that ensures your seeded data are always the same, but changing the number will change the randomness). Seeding tickets must by tweaked manually from `line 66`.

## Resetting the database (Optional)

`npm run db:reset` then seed again

## Issues

### Unable to upload an image => getting row level policy validation error

This will most probably occur after db reset. To fix that, run following SQL instructions in your **Supabase > SQL Editor**

```
DROP POLICY IF EXISTS "Allow authenticated inserts" ON storage.objects;

CREATE POLICY "Allow authenticated inserts"
ON storage.objects FOR INSERT
TO authenticated -- Role for logged-in users
WITH CHECK (
  auth.role() = 'authenticated'
);
```
