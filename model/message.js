let mongoose = require("mongoose");
let Schema = mongoose.Schema;
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

let MessageSchema = Schema({
  id_message: Number,
  message: String,
  personne_id: Number,
  centre_id: Number,
  date_envoi: Date,
});

// Pour ajouter la pagination
MessageSchema.plugin(aggregatePaginate);

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model("message", MessageSchema);
