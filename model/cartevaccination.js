let mongoose = require("mongoose");
let Schema = mongoose.Schema;
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

let CarteVaccinationSchema = Schema({
  id_carte: String,
  personne_id: String,
});

// Pour ajouter la pagination
CarteVaccinationSchema.plugin(aggregatePaginate);

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model("cartevaccination", CarteVaccinationSchema);
