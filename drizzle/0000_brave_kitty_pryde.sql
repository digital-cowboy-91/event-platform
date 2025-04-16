CREATE TABLE "events" (
	"id" uuid PRIMARY KEY NOT NULL,
	"updatedAt" timestamp,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"title" varchar NOT NULL,
	"description" text,
	"location" varchar,
	"startTime" timestamp NOT NULL,
	"duration" integer DEFAULT 60 NOT NULL,
	"capacity" integer DEFAULT 0,
	"price" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE "tickets" (
	"id" uuid PRIMARY KEY NOT NULL,
	"eventId" uuid,
	"userId" uuid,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"firstName" varchar NOT NULL,
	"lastName" varchar NOT NULL
);
--> statement-breakpoint
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_eventId_events_id_fk" FOREIGN KEY ("eventId") REFERENCES "public"."events"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;