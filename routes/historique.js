let Historique = require("../model/historique");

function getHistoriques(req, res) {
  var aggregateQuery = Historique.aggregate();
  Historique.aggregatePaginate(
    aggregateQuery,
    {
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 1000,
    },
    (err, historiques) => {
      if (err) {
        res.send(err);
      }
      res.send(historiques);
    }
  );
}

function getHistorique(req, res) {
  let historique_id = req.params.id;

  Historique.findOne({ _id: historique_id }, (err, historique) => {
    if (err) {
      res.send(err);
    }
    res.json(historique);
  });
}

function postHistorique(req, res) {
  let historique = new Historique();

  historique.lieu_id = req.body.lieu_id;
  historique.personne_id = req.body.personne_id;
  historique.date_passage = req.body.date_passage;

  console.log("POST historique reçu :");
  console.log(historique);

  historique.save((err) => {
    if (err) {
      res.send("cant post historique ", err);
    }
    res.json({ message: `${historique.date_passage} saved!` });
  });
}

function updateHistorique(req, res) {
  Historique.findByIdAndUpdate(
    req.body._id,
    req.body,
    { new: true },
    (err, historique) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.json({ message: `${historique.date_passage} updated!` });
      }
    }
  );
}

function deleteHistorique(req, res) {
  Historique.findByIdAndRemove(req.params.id, (err, historique) => {
    if (err) {
      res.send(err);
    }
    res.json({ message: `${historique.date_passage} deleted` });
  });
}

function getHistoriqueByPersonne(req, res) {
  let personne_id = req.params.id;

  Historique.find({ personne_id: personne_id }, (err, historique) => {
    if (err) {
      res.send(err);
    }
    res.json(historique);
  });
}

function getHistoriqueByLieux(req, res) {
  let lieu_id = req.params.id;

  Historique.find({ lieu_id: lieu_id }, (err, historique) => {
    if (err) {
      res.send(err);
    }
    res.json(historique);
  });
}

module.exports = {
  getHistoriques,
  getHistorique,
  postHistorique,
  updateHistorique,
  deleteHistorique,
  getHistoriqueByPersonne,
  getHistoriqueByLieux,
};
