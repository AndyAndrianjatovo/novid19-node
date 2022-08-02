let mongoose = require("mongoose");
let Schema = mongoose.Schema;
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

let Centrechema = Schema({
  id_centre: Number,
  nom_centre: String,
  adresse_centre: String,
  coordonnees_centre: String,
});

// Pour ajouter la pagination
Centrechema.plugin(aggregatePaginate);

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model("centre", Centrechema);
