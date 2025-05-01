ALTER TABLE "tickets" DROP CONSTRAINT "tickets_event_id_events_id_fk";
--> statement-breakpoint
ALTER TABLE "events" ALTER COLUMN "duration" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;