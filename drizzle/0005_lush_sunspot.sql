ALTER TABLE "events" ALTER COLUMN "cover_image" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "events" ALTER COLUMN "cover_image" DROP NOT NULL;