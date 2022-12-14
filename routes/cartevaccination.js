let CarteVaccination = require("../model/cartevaccination");

function getCarteVaccinations(req, res) {
  var aggregateQuery = CarteVaccination.aggregate();
  CarteVaccination.aggregatePaginate(
    aggregateQuery,
    {
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 1000,
    },
    (err, cartes) => {
      if (err) {
        res.send(err);
      }
      res.send(cartes);
    }
  );
}

function getCarteVaccination(req, res) {
  let carte_id = req.params.id;

  CarteVaccination.findOne({ _id: carte_id }, (err, carte) => {
    if (err) {
      res.send(err);
    }
    res.json(carte);
  });
}

function postCarteVaccination(req, res) {
  let carteVaccination = new CarteVaccination();

  carteVaccination.id_carte = req.body.id_carte;
  carteVaccination.personne_id = req.body.personne_id;

  console.log("POST carteVaccination reçu :");
  console.log(carteVaccination);

  carteVaccination.save((err) => {
    if (err) {
      res.send("cant post lieu ", err);
    }
    res.json({ message: `${carteVaccination.personne_id} saved!` });
  });
}

function updateCarteVaccination(req, res) {
  console.log("UPDATE recu assignment : ");
  console.log(req.body);
  CarteVaccination.findByIdAndUpdate(
    req.body._id,
    req.body,
    { new: true },
    (err, carteVaccination) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.json({ message: `${carteVaccination.personne_id} updated!` });
      }
    }
  );
}

function deleteCarteVaccination(req, res) {
  CarteVaccination.findByIdAndRemove(req.params.id, (err, carteVaccination) => {
    if (err) {
      res.send(err);
    }
    res.json({ message: `${carteVaccination.personne_id} deleted` });
  });
}

function getCarteByPersonne(req, res) {
  let personne_id = req.params.id;

  CarteVaccination.find({ personne_id: personne_id }, (err, carte) => {
    if (err) {
      res.send(err);
    }
    res.json(carte);
  });
}

module.exports = {
  getCarteVaccinations,
  getCarteVaccination,
  postCarteVaccination,
  updateCarteVaccination,
  deleteCarteVaccination,
  getCarteByPersonne,
};
