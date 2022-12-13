    -- \connnect exam3month

create table users_bank(
    id uuid default gen_random_uuid() PRIMARY KEY,
    name varchar(64) UNIQUE,
    password varchar(64),
    "email" text UNIQUE
);

CREATE TABLE "banks" (
  "id" uuid default gen_random_uuid(),
  "name" varchar(64) NOT NULL,
  "max_sum" varchar(64) NOT NULL,
  "initial_percent" integer NOT NULL,
  "max_year" integer NOT NULL
);
-- CREATE USERS
insert into users_bank(name, password, email) values('Jasur', crypt('1221', gen_salt('bf')), n'odirsmailov0@gmail.com');

ALTER TABLE users_bank ADD COLUMN role varchar(64) NOT NULL default 'user';
-- CREATE BANK 
insert into banks(name, max_sum, initial_percent, max_year) values('SQB', '400 000 000', 7, 10);
insert into banks(name, max_sum, initial_percent, max_year) values('TBC', '450 000 000', 8, 15);
insert into banks(name, max_sum, initial_percent, max_year) values('Xalq banki', '450 000 000', 8, 15);
insert into banks(name, max_sum, initial_percent, max_year) values('Xamkor banki', '450 000 000', 6, 10);
insert into banks(name, max_sum, initial_percent, max_year) values('Xamkor banki', '500 000 000', 6, 20);

-- CREATE TABLE ARCHIVE BANK_CREATED

-- here for create


-- CREATE TABLE UPDATE
CREATE TABLE archive_updated_banks (
    id uuid ,
    description text,
    last_update date DEFAULT now()
);

-- create function for update banks
create or replace function updateBankFn()
returns trigger
language plpgsql
as
$$
begin
    if
        new.name <> old.name
    then
        insert into archive_updated_banks(id, description) values(old.id, old.name || ' ' || new.name || ' ga o`zgardi');
    end if;
    return new;        
end
$$;
-- CREATE TRIGGER
create trigger updateBankTrigger
before update
on archive_updated_banks
for each row
execute procedure updateBankFn();


-- CREATE ARCHIVE TABLE
CREATE TABLE archive_deleted_banks (
    id uuid ,
    name varchar(16),
    last_update date DEFAULT now()
);

-- CREATE ARCHIVE FUNCTION
create or replace function deleteBankFn()
returns trigger
language plpgsql
as
$$
begin
    insert into archive_deleted_banks(id, name) values(old.id, old.name);
    return old;
end
$$;

create trigger deleteBankTrigger
after delete 
on banks 
for each row
execute procedure deleteBankFn();