let mongoose = require("mongoose");
let Schema = mongoose.Schema;
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

let HistoriqueSchema = Schema({
  lieu_id: Number,
  personne_id: Number,
  date_passage: Date,
});

// Pour ajouter la pagination
HistoriqueSchema.plugin(aggregatePaginate);

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model("historique", HistoriqueSchema);
