CREATE TABLE "feedback" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar,
	"date" timestamp NOT NULL,
	"product_id" uuid
);
--> statement-breakpoint
CREATE TABLE "product" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"type" varchar NOT NULL,
	"title" varchar,
	"price" integer NOT NULL,
	"old_price" integer,
	"assestment" integer,
	"num_of_feedbacks" integer
);
--> statement-breakpoint
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_product_id_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."product"("id") ON DELETE no action ON UPDATE no action;