
function getEnvValue(envName){
    return process.env[`${envName}_${process.env.NODE_ENV}`]
}

module.exports = {
    DBURI: getEnvValue("DBURI"),
    PORT: getEnvValue("PORT"),
    JWTSECRET: getEnvValue("JWTSECRET"),
    SALT: getEnvValue("SALT")
}