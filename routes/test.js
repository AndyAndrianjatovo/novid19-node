let Test = require("../model/test");

function getTests(req, res) {
  var aggregateQuery = Test.aggregate();
  Test.aggregatePaginate(
    aggregateQuery,
    {
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 10,
    },
    (err, tests) => {
      if (err) {
        res.send(err);
      }
      res.send(tests);
    }
  );
}

function getTest(req, res) {
  let test_id = req.params.id;

  Test.findOne({ _id: test_id }, (err, test) => {
    if (err) {
      res.send(err);
    }
    res.json(test);
  });
}

function postTest(req, res) {
  let test = new Test();

  test.id_test = req.body.id_test;
  test.date_test = req.body.date_test;
  test.centre_id = req.body.centre_id;
  test.personne_id = req.body.personne_id;
  test.etat_test = req.body.etat_test;

  console.log("POST reçu :");
  console.log(test);

  test.save((err) => {
    if (err) {
      res.send("cant post ", err);
    }
    res.json({ message: `${test._id} saved!` });
  });
}

function updateTest(req, res) {
  console.log("UPDATE recu : ");
  console.log(req.body);
  Test.findByIdAndUpdate(req.body._id, req.body, { new: true }, (err, test) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.json({ message: `${test._id} updated!` });
    }
  });
}

function deleteTest(req, res) {
  Test.findByIdAndRemove(req.params.id, (err, test) => {
    if (err) {
      res.send(err);
    }
    res.json({ message: `${test._id} deleted` });
  });
}

function getTestByPersonne(req, res) {
  let personne_id = req.params.id;

  Test.find({ personne_id: personne_id }, (err, test) => {
    if (err) {
      res.send(err);
    }
    res.json(test);
  });
}

module.exports = {
  getTests,
  getTest,
  postTest,
  updateTest,
  deleteTest,
  getTestByPersonne
};
