import { fetchData } from "../../utils/postgres.js"

const FOUND_USER =
`
SELECT * FROM users_bank where name = $1 and password = $2 
`
const FOUND_EXISTS_USER =
`
SELECT * FROM users_bank where name = $2 
`
const NEW_USER =
`
insert into users_bank(name, password, email) values($1, crypt($2, gen_salt('bf')), $3) returning *;
`
// LOGIN QUERY SELECT
const LOGIN_USER =
`
select * from users_bank where name = $1 and password =crypt($2, password);
`
// Register SQL commands
export const existFoundUser = (name) => fetchData(FOUND_EXISTS_USER, name)
export const writeUser = (name, password, email) => fetchData(NEW_USER, name, password, email)
export const foundUser =(name, password) => fetchData(FOUND_USER, name, password)

// Login SQL commands

export const loginUser = (name, password) => fetchData(LOGIN_USER, name, password)