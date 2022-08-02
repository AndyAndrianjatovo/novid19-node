let mongoose = require("mongoose");
let Schema = mongoose.Schema;
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

let VaccinSchema = Schema({
  id_vaccin: Number,
  nom_vaccin: String,
  centre_id: Number,
  date_vaccin: Date,
  carte_id: Number,
});

// Pour ajouter la pagination
VaccinSchema.plugin(aggregatePaginate);

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model("vaccin", VaccinSchema);
