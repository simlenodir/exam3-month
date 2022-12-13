import { fetchData } from "../../utils/postgres.js"

const ALL_BRANCHES = 
`
select 
cc.id,
c.name company,
cc.name complex,
cc.country,
cc.city
from 
companies as c
full join 
complex_company as cc
on 
c.id = cc.comp_id;  
`

const CREATE_BRANCH =
`
insert into complex_company(comp_id, name, country, city) values($1 ,$2, $3, $4);

`
const UPDATE_BRANCH= 
// `update complex_company set comp_id = $1 name = $2, country =$3, city = $4 where id = $5`
`
update complex_company
    set comp_id = case 
        when $1 is NULL 
            then comp_id
                else $1
end,
     name = case
        when $2 is NULL or $2 = ''
            then name
                else $2
end,
    country = case 
        when $3 is NULL or $3 = '' 
            then country
                else $3
end,
     city = case
        when $4 is NULL or $4 = ''
            then city
               else $4
end            
where id = $5;
`

const DELETE_BRANCH =
`
    delete from complex_company where id = $1
`
const SELECTED_BRANCH =
`
SELECT * FROM complex_company where id = $1
`

export const allBranches = () => fetchData(ALL_BRANCHES)
export const createBranch = (comp_id, name, country, city) => fetchData(CREATE_BRANCH, comp_id, name, country, city)
export const updateBranch = (comp_id, name, country, city, branchId) => fetchData(UPDATE_BRANCH, comp_id, name, country, city, branchId ) 
export const deleteBranch = (id) => fetchData( DELETE_BRANCH,id)
export const selectedBranch = (branchId) => fetchData(SELECTED_BRANCH, branchId)