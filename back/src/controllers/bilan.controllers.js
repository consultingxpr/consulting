const Bilan = require('../models/bilan');
// Retrieve and return all bilans from the database.
exports.findAll = (req, res) => {
Bilan.find()
  .then(bilan => {
  res.send(bilan);
}).catch(err => {
  res.status(500).send({
  message: err.message || "Something went wrong while getting list of bilans."
});
});
};
// Create and Save a new bilan
exports.create = (req, res) => {
// Validate request
if(!req.body) {
  return res.status(400).send({
  message: "Please fill all required field"
});
}
// Create a new bilan
const bilan = new Bilan({
  actifscourants : req.body.actifscourants,
  actifsnoncourants: req.body.actifsnoncourants,
  capitauxpropres: req.body.capitauxpropres,
  passifscourants: req.body.passifscourants,
  passifsnoncourants: req.body.passifsnoncourants
});
// Save bilan in the database
bilan.save()
  .then(data => {
  res.send(data);
}).catch(err => {
  res.status(500).send({
  message: err.message || "Something went wrong while creating new bilan."
});
});
};
// Find a single bilan with a id
exports.findOne = (req, res) => {
 Bilan.findById(req.params.id)
  .then(bilan => {
  if(!bilan) {
   return res.status(404).send({
   message: "bilan not found with id " + req.params.id
 });
}
 res.send(bilan);
}).catch(err => {
  if(err.kind === 'ObjectId') {
    return res.status(404).send({
    message: "bilan not found with id " + req.params.id
  });
}
return res.status(500).send({
  message: "Error getting bilan with id " + req.params.id
});
});
};
// Update a bilan identified by the id in the request
exports.update = (req, res) => {
// Validate Request
if(!req.body) {
  return res.status(400).send({
  message: "Please fill all required field"
});
}
// Find bilan and update it with the request body
Bilan.findByIdAndUpdate(req.params.id, {
    actifscourants : req.body.actifscourants,
    actifsnoncourants: req.body.actifsnoncourants,
    capitauxpropres: req.body.capitauxpropres,
    passifscourants: req.body.passifscourants,
    passifsnoncourants: req.body.passifsnoncourants
}, {new: true})
.then(bilan => {
 if(!bilan) {
   return res.status(404).send({
   message: "bilan not found with id " + req.params.id
 });
}
res.send(bilan);
}).catch(err => {
if(err.kind === 'ObjectId') {
  return res.status(404).send({
  message: "bilan not found with id " + req.params.id
});
}
return res.status(500).send({
  message: "Error updating bilan with id " + req.params.id
});
});
};
// Delete a bilan with the specified id in the request
exports.delete = (req, res) => {
Bilan.findByIdAndRemove(req.params.id)
.then(bilan => {
if(!bilan) {
  return res.status(404).send({
  message: "bilan not found with id " + req.params.id
});
}
res.send({message: "bilan deleted successfully!"});
}).catch(err => {
if(err.kind === 'ObjectId' || err.name === 'NotFound') {
  return res.status(404).send({
  message: "bilan not found with id " + req.params.id
});
}
return res.status(500).send({
  message: "Could not delete bilan with id " + req.params.id
});
});
};