let queryResolvers = require("./queries");
let mutationResolvers = require("./mutations");

module.exports = { ...queryResolvers, ...mutationResolvers };
