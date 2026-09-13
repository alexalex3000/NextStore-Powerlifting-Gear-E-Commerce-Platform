CREATE TYPE "public"."sizes" AS ENUM('XS', 'S', 'M', 'L', 'XL', 'XXL');--> statement-breakpoint
ALTER TABLE "product" ADD COLUMN "size" "sizes";