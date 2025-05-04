CREATE TABLE "events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"title" varchar NOT NULL,
	"description" text,
	"location" varchar,
	"start_time" timestamp NOT NULL,
	"duration" integer DEFAULT 60,
	"capacity" integer DEFAULT 0,
	"price" integer DEFAULT 0,
	"cover_image" varchar
);
--> statement-breakpoint
CREATE TABLE "profile" (
	"uid" uuid PRIMARY KEY NOT NULL,
	"first_name" varchar NOT NULL,
	"last_name" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tickets" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"event_id" uuid,
	"user_id" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "profile" ADD CONSTRAINT "profile_uid_users_id_fk" FOREIGN KEY ("uid") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_user_id_profile_uid_fk" FOREIGN KEY ("user_id") REFERENCES "public"."profile"("uid") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE VIEW "public"."tickets_view" AS (select "tickets"."id", "tickets"."event_id", "tickets"."user_id", "events"."title", "events"."location", "events"."start_time", "events"."duration", "events"."price" from "tickets" left join "events" on "tickets"."event_id" = "events"."id");