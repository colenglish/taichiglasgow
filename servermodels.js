var mongoose = require('mongoose');
var crypto = require('crypto');

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
    username: { type: String, validate: [usernameValidator, 'Invalid username'] },
    password_hash: { type: String },
    salt: { type: String },
    role: { type: String, enum: ['user', 'admin'], default: "user" }
});

function usernameValidator () {
    // TODO: Better username validation, and validate
    return this.username && this.username.length > 0 && this.username.length < 255;
}

// Ascending index on username, ensuring uniqueness
UserSchema.index({username: 1}, {unique: true});

//Instance methods
UserSchema.methods.makeSalt = function(){
    return Math.round((new Date().valueOf() * Math.random())) + '';
}

UserSchema.methods.encryptPassword = function(password){
	return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
}

UserSchema.methods.authenticate = function(plainText){
    return this.encryptPassword(plainText) === this.password_hash;
}

// Getters and Setters
UserSchema.virtual("idString").get(function () {
    return this._id.toHexString();
});

UserSchema.virtual("password").set(function (password) {
    this.salt = this.makeSalt();
    this.password_hash = this.encryptPassword(password);
});

mongoose.model('User', UserSchema);
exports.UserModel = function(db) {
    return db.model('User');
};

