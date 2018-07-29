
//for Heroku

module.exports = {
    DATABASE_URL: process.env.DATABASE_URL,
    TEST_DATABASE_URL: process.env.TEST_DATABASE_URL,
    CLIENT: process.env.CLIENT,
    JWT_SECRET: process.env.JWT_SECRET
}


