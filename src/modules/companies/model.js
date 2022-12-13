// CREATE COMPANIES TABLE
// ADD COMPANIES 

import { fetchData } from "../../utils/postgres.js"

const ALL_COMPANIES =
`
    select * from companies;
`
// create company
const CRETE_COMP = 
`
  insert into COMPANIES(name, url) values($1, $2);
`
// update company
const UPDATE_COMPANY =
`
update companies
        set name = case
            when name is null or name = ''
              then name
                else $1 
end,
        url = case
          when url is null or url = ''
            then url
              else $2
end
          where id = $3;  
`

// delete Company
const DELETE_COMPANY =
 `
    delete from companies where id = $1
`


export const allCompnies =() => fetchData(ALL_COMPANIES)
export const createComp = (name, url) => fetchData(CRETE_COMP, name, url)
export const updateFoundCompany = (name, url, compId) => fetchData(UPDATE_COMPANY, name, url, compId)
export const deleteCompany = (compId) => fetchData(DELETE_COMPANY, compId)