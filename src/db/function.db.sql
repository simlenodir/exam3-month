update banks
    set name = case 
        when name is NULL or name=''
            then name
                else $1
end,
     max_sum = case
        when max_sum is NULL or max_sum = ''
            then max_sum
                else $2
end,
    initial_percent = case 
        when initial_percent is NULL or initial_percent = 0 
            then initial_percent
                else $3
end,
     max_year = case
        when max_year is NULL or max_year = 0
            then max_year
               else $4
end            
where id = '0a408e22-a6f9-4d13-8e9a-ff6f4ba2b1a6';                        


CREATE TABLE "banks" (
  "id" uuid default gen_random_uuid(),
  "name" varchar(64) NOT NULL,
  "max_sum" varchar(64) NOT NULL,
  "initial_percent" integer NOT NULL,
  "max_year" integer NOT NULL
);

CREATE OR REPLACE FUNCTION calc( name varchar(64), max_sum varchar(64) , initial_percent int, max_year int  )
returns int
language plpgsql
as
$$
begin

    if
       name = '' or is NULL
    then 
    return   
        num + num1; 
    elsif
        sp = '*'
    then 
    return
        num*num1;
    elsif
        sp='/'
    then 
    return
        num/num1;
    elsif 
        sp ='-'
    then
    return
        num-num1;
    else
        return 0;    
    end if;
end
$$;    