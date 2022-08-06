let Message = require("../model/message");

function getMessages(req, res) {
  var aggregateQuery = Message.aggregate();
  Message.aggregatePaginate(
    aggregateQuery,
    {
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 1000,
    },
    (err, messages) => {
      if (err) {
        res.send(err);
      }
      res.send(messages);
    }
  );
}

function getMessage(req, res) {
  let message_id = req.params.id;

  Message.findOne({ _id: message_id }, (err, message) => {
    if (err) {
      res.send(err);
    }
    res.json(message);
  });
}

function postMessage(req, res) {
  let message = new Message();

  message.id_message = req.body.id_message;
  message.message = req.body.message;
  message.personne_id = req.body.personne_id;
  message.centre_id = req.body.centre_id;
  message.date_envoi = req.body.date_envoi;

  console.log("POST reçu :");
  console.log(message);

  message.save((err) => {
    if (err) {
      res.send("cant post ", err);
    }
    res.json({ message: `${message._id} saved!` });
  });
}

function updateMessage(req, res) {
  console.log("UPDATE recu : ");
  console.log(req.body);
  Message.findByIdAndUpdate(
    req.body._id,
    req.body,
    { new: true },
    (err, message) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.json({ message: `${message._id} updated!` });
      }
    }
  );
}

function deleteMessage(req, res) {
  Message.findByIdAndRemove(req.params.id, (err, message) => {
    if (err) {
      res.send(err);
    }
    res.json({ message: `${message._id} deleted` });
  });
}

function getMessageByPersonne(req, res) {
  let personne_id = req.params.id;

  Message.find({ personne_id: personne_id }, (err, message) => {
    if (err) {
      res.send(err);
    }
    res.json(message);
  });
}

module.exports = {
  getMessages,
  getMessage,
  postMessage,
  updateMessage,
  deleteMessage,
  getMessageByPersonne,
};
