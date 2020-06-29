const Admin = require('../models/admin.model.js');
// Retrieve and return all admins from the database.
exports.findAll = (req, res) => {
Admin.find()
  .then(admins => {
  res.send(admins);
}).catch(err => {
  res.status(500).send({
  message: err.message || "Something went wrong while getting list of admins."
});
});
};
// Create and Save a new admin
exports.create = (req, res) => {
// Validate request
if(!req.body) {
  return res.status(400).send({
  message: "Please fill all required field"
});
}
// Create a new admin
const admin = new Admin({
  first_name: req.body.first_name,
  last_name: req.body.last_name,
  email: req.body.email,
  phone: req.body.phone
});
// Save admin in the database
admin.save()
  .then(data => {
  res.send(data);
}).catch(err => {
  res.status(500).send({
  message: err.message || "Something went wrong while creating new admin."
});
});
};
// Find a single admin with a id
exports.findOne = (req, res) => {
 Admin.findById(req.params.id)
  .then(admin => {
  if(!admin) {
   return res.status(404).send({
   message: "Admin not found with id " + req.params.id
 });
}
 res.send(admin);
}).catch(err => {
  if(err.kind === 'ObjectId') {
    return res.status(404).send({
    message: "Admin not found with id " + req.params.id
  });
}
return res.status(500).send({
  message: "Error getting admin with id " + req.params.id
});
});
};
// Update an admin identified by the id in the request
exports.update = (req, res) => {
// Validate Request
if(!req.body) {
  return res.status(400).send({
  message: "Please fill all required field"
});
}
// Find admin and update it with the request body
Admin.findByIdAndUpdate(req.params.id, {
  first_name: req.body.first_name,
  last_name: req.body.last_name,
  email: req.body.email,
  phone: req.body.phone
}, {new: true})
.then(admin => {
 if(!admin) {
   return res.status(404).send({
   message: "Admin not found with id " + req.params.id
 });
}
res.send(admin);
}).catch(err => {
if(err.kind === 'ObjectId') {
  return res.status(404).send({
  message: "Admin not found with id " + req.params.id
});
}
return res.status(500).send({
  message: "Error updating admin with id " + req.params.id
});
});
};
// Delete admin with the specified id in the request
exports.delete = (req, res) => {
Admin.findByIdAndRemove(req.params.id)
.then(admin => {
if(!admin) {
  return res.status(404).send({
  message: "admin not found with id " + req.params.id
});
}
res.send({message: "admin deleted successfully!"});
}).catch(err => {
if(err.kind === 'ObjectId' || err.name === 'NotFound') {
  return res.status(404).send({
  message: "admin not found with id " + req.params.id
});
}
return res.status(500).send({
  message: "Could not delete admin with id " + req.params.id
});
});
};