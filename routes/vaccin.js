let Vaccin = require("../model/vaccin");

function getVaccins(req, res) {
  var aggregateQuery = Vaccin.aggregate();
  Vaccin.aggregatePaginate(
    aggregateQuery,
    {
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 10,
    },
    (err, vaccins) => {
      if (err) {
        res.send(err);
      }
      res.send(vaccins);
    }
  );
}

function getVaccin(req, res) {
  let vaccin_id = req.params.id;

  Vaccin.findOne({ _id: vaccin_id }, (err, vaccin) => {
    if (err) {
      res.send(err);
    }
    res.json(vaccin);
  });
}

function postVaccin(req, res) {
  let vaccin = new Vaccin();

  vaccin.id_vaccin = req.body.id_vaccin;
  vaccin.nom_vaccin = req.body.nom_vaccin;
  vaccin.centre_id = req.body.centre_id;
  vaccin.date_vaccin = req.body.date_vaccin;
  vaccin.carte_id = req.body.carte_id;

  console.log("POST reçu :");
  console.log(vaccin);

  vaccin.save((err) => {
    if (err) {
      res.send("cant post ", err);
    }
    res.json({ message: `${vaccin._id} saved!` });
  });
}

function updateVaccin(req, res) {
  console.log("UPDATE recu : ");
  console.log(req.body);
  Vaccin.findByIdAndUpdate(
    req.body._id,
    req.body,
    { new: true },
    (err, vaccin) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.json({ message: `${vaccin._id} updated!` });
      }
    }
  );
}

function deleteVaccin(req, res) {
  Vaccin.findByIdAndRemove(req.params.id, (err, vaccin) => {
    if (err) {
      res.send(err);
    }
    res.json({ message: `${vaccin._id} deleted` });
  });
}

function getVaccinByCarte(req, res) {
  let carte_id = req.params.id;

  Vaccin.find({ carte_id: carte_id }, (err, vaccin) => {
    if (err) {
      res.send(err);
    }
    res.json(vaccin);
  });
}


module.exports = {
  getVaccins,
  getVaccin,
  postVaccin,
  updateVaccin,
  deleteVaccin,
  getVaccinByCarte
};
