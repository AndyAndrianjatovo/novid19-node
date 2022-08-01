let mongoose = require("mongoose");
let Schema = mongoose.Schema;
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

let LieuSchema = Schema({
  nom_lieu: String,
  adresse_lieu: String,
  statut_lieu: Number,
  coordonnees_lieu: String,
});

// Pour ajouter la pagination
LieuSchema.plugin(aggregatePaginate);

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model("lieu", LieuSchema);
