let Personne = require("../model/personne");

function getPersonnes(req, res) {
  var aggregateQuery = Personne.aggregate();
  Personne.aggregatePaginate(
    aggregateQuery,
    {
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 10,
    },
    (err, personnes) => {
      if (err) {
        res.send(err);
      }
      res.send(personnes);
    }
  );
}

function getPersonne(req, res) {
  let personne_id = req.params.id;

  Personne.findOne({ _id: personne_id }, (err, personne) => {
    if (err) {
      res.send(err);
    }
    res.json(personne);
  });
}

function postPersonne(req, res) {
  let personne = new Personne();

  personne.id_personne = req.body.id_personne;
  personne.nom = req.body.nom;
  personne.prenom = req.body.prenom;
  personne.mail = req.body.mail;
  personne.date_naissance = req.body.date_naissance;
  personne.adresse = req.body.adresse;
  personne.sexe = req.body.sexe;
  personne.cin = req.body.cin;

  console.log("POST reçu :");
  console.log(personne);

  personne.save((err) => {
    if (err) {
      res.send("cant post ", err);
    }
    res.json({ message: `${personne._id} saved!` });
  });
}

function updatePersonne(req, res) {
  console.log("UPDATE recu : ");
  console.log(req.body);
  Personne.findByIdAndUpdate(
    req.body._id,
    req.body,
    { new: true },
    (err, personne) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.json({ message: `${personne._id} updated!` });
      }
    }
  );
}

function deletePersonne(req, res) {
  Personne.findByIdAndRemove(req.params.id, (err, personne) => {
    if (err) {
      res.send(err);
    }
    res.json({ message: `${personne._id} deleted` });
  });
}

module.exports = {
  getPersonnes,
  getPersonne,
  postPersonne,
  updatePersonne,
  deletePersonne,
};
