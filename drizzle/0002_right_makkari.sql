ALTER TABLE "events" RENAME COLUMN "updatedAt" TO "updated_at";--> statement-breakpoint
ALTER TABLE "events" RENAME COLUMN "createdAt" TO "created_at";--> statement-breakpoint
ALTER TABLE "events" RENAME COLUMN "startTime" TO "start_time";--> statement-breakpoint
ALTER TABLE "tickets" RENAME COLUMN "eventId" TO "event_id";--> statement-breakpoint
ALTER TABLE "tickets" RENAME COLUMN "userId" TO "user_id";--> statement-breakpoint
ALTER TABLE "tickets" RENAME COLUMN "createdAt" TO "created_at";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "firstName" TO "first_name";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "lastName" TO "last_name";--> statement-breakpoint
ALTER TABLE "tickets" DROP CONSTRAINT "tickets_eventId_events_id_fk";
--> statement-breakpoint
ALTER TABLE "tickets" DROP CONSTRAINT "tickets_userId_users_id_fk";
--> statement-breakpoint
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;