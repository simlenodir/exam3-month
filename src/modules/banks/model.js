import { fetchData } from "../../utils/postgres.js"

// SELECT BANKS
const ALL_BANKS = 
`
select * from banks;
`
// CREATE NEW BANK
const CREATE_BANK =
`
insert into banks(name, max_sum, initial_percent, max_year) values($1, $2, $3, $4) returning *;
`
// DELETE BANK

const DELETE_BANK =
`
delete from banks where id = $1 returning *
`
// UPDATE BANK
const UPDATE_BANK = 
`
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
where id = $5; 
`

export const allBanks = () => fetchData(ALL_BANKS)
export const createNewBank = (name, max_sum, initial_percent, max_year) => fetchData(CREATE_BANK, name, max_sum, initial_percent, max_year)
export const foundPutBank = (name, max_sum, initial_percent, max_year,bankId) => fetchData(UPDATE_BANK, name, max_sum, initial_percent, max_year, bankId)
export const deleteBank = (bankId) => fetchData(DELETE_BANK, bankId)