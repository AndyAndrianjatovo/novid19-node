let mongoose = require("mongoose");
let Schema = mongoose.Schema;
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

let PersonneSchema = Schema({
  id_personne: Number,
  nom: String,
  prenom: String,
  mail: String,
  date_naissance: Date,
  adresse: String,
  sexe: Number,
  cin: String,
});

// Pour ajouter la pagination
PersonneSchema.plugin(aggregatePaginate);

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model("personne", PersonneSchema);
