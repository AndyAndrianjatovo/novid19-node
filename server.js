let express = require("express");
let app = express();
let bodyParser = require("body-parser");
let lieu = require("./routes/lieu");
let historique = require("./routes/historique");
let mongoose = require("mongoose");

mongoose.Promise = global.Promise;
//mongoose.set('debug', true);

// remplacer toute cette chaine par l'URI de connexion à votre propre base dans le cloud s
const uri =
  "mongodb+srv://novid:novidnode@clusternovid.urcwtkg.mongodb.net/?retryWrites=true&w=majority";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};

mongoose.connect(uri, options).then(
  () => {
    console.log("Connecté à la base MongoDB assignments dans le cloud !");
    console.log("at URI = " + uri);
    console.log("vérifiez with http://localhost:3000 que cela fonctionne");
  },
  (err) => {
    console.log("Erreur de connexion: ", err);
  }
);

// Pour accepter les connexions cross-domain (CORS)
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// Pour les formulaires
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let port = process.env.PORT || 3000;

// les routes
const prefix = "/api";

app
  .route(prefix + "/lieu")
  .get(lieu.getLieux)
  .post(lieu.postLieu)
  .put(lieu.updateLieu);

app
  .route(prefix + "/lieu/:id")
  .get(lieu.getLieu)
  .delete(lieu.deleteLieu);

app
  .route(prefix + "/historique")
  .get(historique.getHistoriques)
  .post(historique.postHistorique)
  .put(historique.updateHistorique);

app
  .route(prefix + "/historique/:id")
  .get(historique.getHistorique)
  .delete(historique.deleteHistorique);

// On démarre le serveur
app.listen(port, "0.0.0.0");
console.log("Serveur démarré sur http://localhost:" + port);

module.exports = app;
