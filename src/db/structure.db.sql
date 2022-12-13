CREATE TABLE "banks" (
  "id" uuid,
  "name" varchar(64),
  "max_sum" varchar(64),
  "initial_percent" integer,
  "max_year" integer
);

CREATE TABLE "companies" (
  "id" uuid PRIMARY KEY,
  "name" varchar(64)
);

CREATE TABLE "complex_company" (
  "id" uuid PRIMARY KEY,
  "comp_id" uuid,
  "user_id" varchar,
  "name" varchar(64),
  "country" varchar(128),
  "city" varchar(128)
);

CREATE TABLE "home_detail" (
  "uuid" uuid PRIMARY KEY,
  "complex_id" uuid ,
  "room" integer,
  "square" integer,
  "sum_square" integer
);

CREATE TABLE "users_bank" (
  "id" uuid,
  "name" varchar(64),
  "password" varchar(64),
  "phone" varchar(64),
  "email" text UNIQUE
);

CREATE TABLE "booking" (
  "id" uuid PRIMARY KEY,
  "user_id" varchar(64),
  "start_date" date,
  "end_date" date,
  "sum" varchar
);

ALTER TABLE "companies" ADD FOREIGN KEY ("id") REFERENCES "complex_company" ("comp_id");

ALTER TABLE "users_bank" ADD FOREIGN KEY ("id") REFERENCES "booking" ("user_id");

ALTER TABLE "complex_company" ADD FOREIGN KEY ("id") REFERENCES "home_detail" ("complex_id");

ALTER TABLE "users_bank" ADD FOREIGN KEY ("id") REFERENCES "complex_company" ("user_id");