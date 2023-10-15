const mongoose = require("mongoose");
const wineSchema = mongoose.Schema({
    nom: String,
    region: String,
    cepage: String,
    type: String,
    annee: Number,
    note: Number,
    description: String,
    recommandation: String,
    image: String
});
const Wine = mongoose.model("wines", wineSchema);
module.exports = Wine;
