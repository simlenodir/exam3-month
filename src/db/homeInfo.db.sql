drop table home_detail cascade ;    
CREATE TABLE "home_detail" (
   home_id uuid default gen_random_uuid() PRIMARY KEY,
  "branch_id" uuid ,
  "room" integer,
  "square" integer,
  "sum_square" integer ,
  FOREIGN KEY (branch_id) REFERENCES branches_company(id) on delete set null 
);

update


ALTER TABLE "complex_company" ADD FOREIGN KEY ("id") REFERENCES "home_detail" ("complex_id");

insert into home_detail(branch_id, room, square, sum_square) values('3597d9fa-83ae-438b-a925-3eb4d9ebf9bf', 3, 70, 6000000);
insert into home_detail(branch_id, room, square, sum_square) values('b5927fab-0183-49d2-b911-10603a63300e', $2, $2, $3, $4);