import { fetchData } from "../../utils/postgres.js"

const ALL_HOMES =
`
SELECT 
   hd.home_id,
    cc.name,
    hd.room,
    square,
    sum_square
from
    complex_company as cc
inner join
    home_detail hd
on
    cc.id = hd.complex_id
    group by cc.name,hd.room,
    hd.home_id,
    square,
    sum_square;       
`
const CREATE_HOME_DETAILS = 
`
insert into home_detail(complex_id, room, square, sum_square) values($1, $2, $3, $4);
`

const UPDATE_HOME_DETAILS =
`
    update home_detail set complex_id = $1, room = $2, square = $3, sum_square = $4 where home_id = $5 
`
const FOUND_HOME =
`
  select * from home_detail where home_id = $1
`
const DELETE_HOME_DETAIL =
`
delete from home_detail where home_id = $1
`
const GET_COMPLEX_COMPANY =
`
SELECT * FROM COMPLEX_COMPANY;
`

export const allHomes = () => fetchData(ALL_HOMES)
export const homeComplex = () => fetchData(GET_COMPLEX_COMPANY)
export const createHome = (complex_id, room, square, sum_square) => fetchData(CREATE_HOME_DETAILS, complex_id, room, square, sum_square)
export const foundSelectHome = (homeId) => fetchData(FOUND_HOME, homeId)
export const updateSelectedHome = (complex_id, room, square, sum_square, homeId) => fetchData(UPDATE_HOME_DETAILS, complex_id, room, square, sum_square, homeId)
export const deleteFoundHome = (homeId) => fetchData(DELETE_HOME_DETAIL, homeId)