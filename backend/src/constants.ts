import dotenv from 'dotenv'
dotenv.config()

export const Constants = {
    DB_URI: process.env.DB_URI,
    DB_NAME: 'RBAC',
    APPLICATION_PORT: process.env.APPLICATION_PORT || 4000,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY
}

export const Roles = {
    admin: "admin",
    manager: "manager",
    user: "user"
}