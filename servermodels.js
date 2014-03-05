var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// Create a schema for our class info
var MovementSchema = new Schema({
    formName: { type: String },
    formPosition: { type: Number },
    name: { type: String },
    description: { type: String, default: "Hard work." },
    repetitions: { type: Number },
    repetition_duration: { type: Number },
    notes: { type: String }
});

// Use the schema to register a model, then make it available
mongoose.model('Movement', MovementSchema);
exports.MovementModel = function(db) {
    return db.model('Movement');
};

// Create a schema for our users
var UserSchema = new Schema({
    username: { type: String },
    name: { type: String },
    email: { type: String },
    facebook_id: { type: String },
    facebook: { },
    createdAt: { type: Date, 'default': Date.now },
    role: { type: String, enum: ['user', 'admin'], default: "user" }
});

// Ascending index on username, ensuring uniqueness
UserSchema.index({username: 1}, {unique: true});

mongoose.model('User', UserSchema);
exports.UserModel = function(db) {
    return db.model('User');
};

