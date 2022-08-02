let mongoose = require("mongoose");
let Schema = mongoose.Schema;
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

let TestSchema = Schema({
     id_test:Number,
     date_test:Date,
     centre_id:Number,
     personne_id:Number,
     etat_test:Number,

});

// Pour ajouter la pagination
TestSchema.plugin(aggregatePaginate);

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model("test", TestSchema);
