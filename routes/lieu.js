let Lieu = require("../model/lieu");

// Récupérer tous les lieux (GET)
function getLieux(req, res) {
  var aggregateQuery = Lieu.aggregate();
  Lieu.aggregatePaginate(
    aggregateQuery,
    {
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 1000,
    },
    (err, lieux) => {
      if (err) {
        res.send(err);
      }
      res.send(lieux);
    }
  );
}

// Récupérer un lieu par son id (GET)
function getLieu(req, res) {
  let lieu_id = req.params.id;

  Lieu.findOne({ _id: lieu_id }, (err, lieu) => {
    if (err) {
      res.send(err);
    }
    res.json(lieu);
  });
}

// Ajout d'un lieu (POST)
function postLieu(req, res) {
  let lieu = new Lieu();

  lieu.nom_lieu = req.body.nom_lieu;
  lieu.adresse_lieu = req.body.adresse_lieu;
  lieu.statut_lieu = req.body.statut_lieu;
  lieu.coordonnees_lieu = req.body.coordonnees_lieu;

  console.log("POST lieu reçu :");
  console.log(lieu);

  lieu.save((err) => {
    if (err) {
      res.send("cant post lieu ", err);
    }
    res.json({ message: `${lieu.nom_lieu} saved!` });
  });
}

// Update d'un lieu (PUT)
function updateLieu(req, res) {
  console.log("UPDATE recu assignment : ");
  console.log(req.body);
  Lieu.findByIdAndUpdate(req.body._id, req.body, { new: true }, (err, lieu) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.json({ message: `${lieu.nom_lieu} updated!` });
    }

    // console.log('updated ', assignment)
  });
}

// suppression d'un lieu (DELETE)
function deleteLieu(req, res) {
  Lieu.findByIdAndRemove(req.params.id, (err, lieu) => {
    if (err) {
      res.send(err);
    }
    res.json({ message: `${lieu.nom_lieu} deleted` });
  });
}

module.exports = {
  getLieux,
  getLieu,
  postLieu,
  updateLieu,
  deleteLieu,
};
