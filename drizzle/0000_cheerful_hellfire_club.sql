CREATE TYPE "public"."borrowStatus" AS ENUM('BORROWED', 'RETURNED');--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('USER', 'ADMIN');--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('PENDING', 'APPROVED', 'REJECTED');--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"fullName" varchar(255) NOT NULL,
	"email" text NOT NULL,
	"universityId" integer NOT NULL,
	"password" text NOT NULL,
	"universityCard" text NOT NULL,
	"status" "status" DEFAULT 'PENDING',
	"role" "role" DEFAULT 'USER',
	"lastActivityDate" date DEFAULT now(),
	"createdAt" timestamp with time zone DEFAULT now(),
	CONSTRAINT "users_id_unique" UNIQUE("id"),
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_universityId_unique" UNIQUE("universityId")
);
