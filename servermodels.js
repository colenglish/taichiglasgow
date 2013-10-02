var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');

var Schema = mongoose.Schema;

// Create a schema for our class info
var ClassSchema = new Schema({
    location: { type: String },
    teacher: { type: String, default: "Charlie Gorrie" },
    day: { type: String } ,
    starttime: { type: String },
    endtime: { type: String },
    cost: { type: Number, default: 10 },
    notes: String
});

// Use the schema to register a model, then make it available
mongoose.model('Class', ClassSchema);
exports.ClassModel = function(db) {
    return db.model('Class');
};

// Create a schema for our users
var UserSchema = new Schema({
    username: { type: String },
    role: { type: String, enum: ['user', 'admin'], default: "user" }
});

UserSchema.plugin(findOrCreate);

// Ascending index on username, ensuring uniqueness
UserSchema.index({username: 1}, {unique: true});

mongoose.model('User', UserSchema);
exports.UserModel = function(db) {
    return db.model('User');
};

