let Centre = require("../model/centre");

function getCentres(req, res) {
  var aggregateQuery = Centre.aggregate();
  Centre.aggregatePaginate(
    aggregateQuery,
    {
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 10,
    },
    (err, centres) => {
      if (err) {
        res.send(err);
      }
      res.send(centres);
    }
  );
}

function getCentre(req, res) {
  let centre_id = req.params.id;

  Centre.findOne({ id: centre_id }, (err, centre) => {
    if (err) {
      res.send(err);
    }
    res.json(centre);
  });
}

function postCentre(req, res) {
  let centre = new Centre();

  centre.id_centre = req.body.id_centre;
  centre.nom_centre = req.body.nom_centre;
  centre.adresse_centre = req.body.adresse_centre;
  centre.coordonnees_centre = req.body.coordonnees_centre;

  console.log("POST centre reçu :");
  console.log(centre);

  centre.save((err) => {
    if (err) {
      res.send("cant post centre ", err);
    }
    res.json({ message: `${centre.nom_centre} saved!` });
  });
}

function updateCentre(req, res) {
  console.log("UPDATE recu : ");
  console.log(req.body);
  Centre.findByIdAndUpdate(
    req.body._id,
    req.body,
    { new: true },
    (err, centre) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.json({ message: `${centre.nom_centre} updated!` });
      }
    }
  );
}

function deleteCentre(req, res) {
  Centre.findByIdAndRemove(req.params.id, (err, centre) => {
    if (err) {
      res.send(err);
    }
    res.json({ message: `${centre.nom_centre} deleted` });
  });
}

module.exports = {
  getCentres,
  getCentre,
  postCentre,
  updateCentre,
  deleteCentre,
};
