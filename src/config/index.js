
function getEnvValue(envName){
    const key = process.env.NODE_ENV?`${envName}_${process.env.NODE_ENV}`.trim():`${envName}_DEV`
    return process.env[key]
}

module.exports = {
    DBURI: getEnvValue("DBURI"),
    PORT: getEnvValue("PORT"),
    JWTSECRET: getEnvValue("JWTSECRET"),
    SALT: getEnvValue("SALT")
}