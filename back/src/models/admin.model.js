const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const AdminSchema = mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    phone: String,
    is_active:  { type: Boolean, default: false },
    is_verified:  { type: Boolean, default: false },
    is_deleted:  { type: Boolean, default: false }
}, {
    timestamps: true
});
AdminSchema.index({
    'first_name': 'text',
    'last_name': 'text',
    'email': 'text',
    'phone':'text'
  });
AdminSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Admin', AdminSchema);