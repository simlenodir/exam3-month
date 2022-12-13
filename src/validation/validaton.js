import Joi from "joi";

export const Register = Joi.object({
    name: Joi.string().required().min(2).max(64),
    password: Joi.string().required().max(64),
    email: Joi.string().required()
})

export const Login = Joi.object({
    name: Joi.string().required().min(3).max(64),
    password: Joi.string().required().max(64)
})

export const CreateBanks = Joi.object({
    name: Joi.string().required().max(64),
    max_sum: Joi.string().required(),
    initial_percent: Joi.number().required(),
    max_year: Joi.number().required()
})

export const BuildingCompany = Joi.object({
    company_name: Joi.string().required().max(128),
    building_territory: Joi.string().required().max(64)
})