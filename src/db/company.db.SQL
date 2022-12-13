drop table if exists "companies";    
CREATE TABLE "companies" (
    "id" uuid default gen_random_uuid() PRIMARY KEY,
    "name" varchar(64) UNIQUE,
    url varchar(1056) not null
  );

-- ADD COMPANIES
insert into COMPANIES(name, url) values('Murad Buildings', 'https://www.mbc.uz/includes/images/new_layout/logo.svg');
insert into COMPANIES(name, url) values('Golden House', 'https://i.mycdn.me/i?r=AyH4iRPQ2q0otWIFepML2LxR98w0WE5C4WBjGn5LGwQmww');
insert into COMPANIES(name, url) values('Xon Saroy', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXNX97P_ASVYw9H0PBn6b3ucxz3vF-vwJcKE9kLQyZZGvd_dkyhCGnj1OKMJ1wbvopR7U&usqp=CAU');
insert into COMPANIES(name, url) values('Ackay city', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLd2B7hPX6PlPrjSlIFIx5Y2yHnTS_4mOVgrt51NiBhyocizP58zAUlyLTGle7ta50TS4&usqp=CAU');

-- UPDATE COMPANIES

update companies
        set name = case
            when name is null or name = ''
              then name
                else 'Golden house' 
end,
        url = case
          when url is null or url = ''
            then url
              else 'https://i.mycdn.me/i?r=AyH4iRPQ2q0otWIFepML2LxR98w0WE5C4WBjGn5LGwQmww'
end
          where id = 'ef9a986c-b79c-4eef-80ce-ff6b496f45e6';                                    
