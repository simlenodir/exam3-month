drop table complex_company if exists  cascade;
CREATE TABLE "branches_company" (
  "id" uuid default gen_random_uuid() PRIMARY KEY,
  "comp_id" uuid ,
  "name" varchar(64),
  "country" varchar(128),
  "city" varchar(128),
  FOREIGN KEY (comp_id) REFERENCES companies(id)
);

insert into complex_company(comp_id, name, country, city) values('1b0e10c8-2ebb-49d9-a479-96c96c093119' ,'Nest One', 'Uzbekistan', 'Tashkent');
-- ALTER TABLE "companies" ADD FOREIGN KEY ("id") REFERENCES "complex_company" ("comp_id");

update complex_company
    set comp_id = case 
        when comp_id is NULL 
            then comp_id
                else $1
end,
     name = case
        when name is NULL or name = ''
            then name
                else $2
end,
    country = case 
        when country is NULL or country = '' 
            then country
                else $3
end,
     city = case
        when city is NULL or city = ''
            then city
               else $4
end            
where id = $5;

select 
    c.name,
    cc.name,
    cc.country,
    cc.city
from 
    companies as c
full join 
    complex_company as cc
on 
    c.id = cc.comp_id;        