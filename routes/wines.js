const diacritics = require("diacritics");

var express = require("express");
var router = express.Router();

require("../models/connection");
const Wine = require("../models/wines");

// Fonction pour créer une expression régulière insensible à la casse avec prise en compte des accents
function createCaseInsensitiveRegExp(input) {

    // Remplacez les caractères "-", "_", et "," par des espaces
    const spaceSeparatedInput = input.replace(/[-_,]/g, " ");

    return new RegExp(spaceSeparatedInput, "i");
}

// Route pour obtenir tous les vins
router.get("/all", async (req, res) => {
    try {
        const vins = await Wine.find();
        res.json(vins);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération des vins." });
    }
});

// Route pour obtenir un vin par nom (insensible à la casse et accepte espace/tiret)
router.get("/nom/:nom", async (req, res) => {
    const nom = req.params.nom;
    try {
        const vin = await Wine.findOne({ nom: createCaseInsensitiveRegExp(nom) });
        if (vin) {
            res.json(vin);
        } else {
            res.status(404).json({ message: "Aucun vin trouvé avec ce nom." });
        }
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération du vin." });
    }
});

// Route pour obtenir des vins par région
router.get("/region/:region", async (req, res) => {
    const region = req.params.region;
    try {
        const vins = await Wine.find({ region: createCaseInsensitiveRegExp(region) });
        res.json(vins);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération des vins par région." });
    }
});

// Route pour obtenir des vins par cépage
router.get("/cepage/:cepage", async (req, res) => {
    const cepage = req.params.cepage;
    try {
        const vins = await Wine.find({ cepage: createCaseInsensitiveRegExp(cepage) });
        res.json(vins);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération des vins par cépage." });
    }
});

// Route pour obtenir des vins par type
router.get("/type/:type", async (req, res) => {
    const type = req.params.type;
    try {
        const vins = await Wine.find({ type: createCaseInsensitiveRegExp(type) });
        res.json(vins);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération des vins par type." });
    }
});

// Route pour obtenir des vins par année
router.get("/annee/:annee", async (req, res) => {
    const annee = req.params.annee;
    try {
        const vins = await Wine.find({ annee: annee });
        res.json(vins);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération des vins par année." });
    }
});

// Route pour obtenir des vins par note minimale
router.get("/note/:note", async (req, res) => {
    const note = req.params.note;
    try {
        const vins = await Wine.find({ note: { $gte: note } });
        res.json(vins);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération des vins par note." });
    }
});

module.exports = router;
