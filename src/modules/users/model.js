import { fetchData } from "../../utils/postgres.js"

const Found_Company = `
    select * from companies where id = $1
`
const FOUND_COMPLEX = `
    select * from complex_company where comp_id = $1
`
const SELECT_ALL_BRANCH =
`
    select * from complex_company;
`
const COMPLEX_OF_HOME =
`
   SELECT * FROM home_detail where complex_id = $1 
`

const COMPLEX_OF_ROOM =
`
   SELECT * FROM home_detail where home_id = $1 
`
const USER_PAYMENT_BANK = 
`
select * from banks;
`
const choiceBankOfHome = 
`
    select * from banks where replace(max_sum, ' ', '')::bigint >= $1 and max_year = $2 order by replace(max_sum, ' ', '')::bigint offset 0 limit 1 ; 
`

export const FoundCompany = (compId) => fetchData(Found_Company, compId)
export const selectedComplex = (branchId) => fetchData(FOUND_COMPLEX, branchId)
export const selectedRoom = (room) => fetchData(COMPLEX_OF_ROOM, room)
export const branchesForSelect = () => fetchData(SELECT_ALL_BRANCH)
export const complexOfSelect = (branchId) => fetchData(COMPLEX_OF_HOME, branchId)
export const usersOfBanks = () => fetchData(USER_PAYMENT_BANK)
export const goodBank = (homePrice, year) => fetchData(choiceBankOfHome, homePrice, year)