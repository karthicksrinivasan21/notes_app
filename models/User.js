const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true, // Removes whitespace from the beginning and end
        minlength: 3, // Minimum length of the username
        maxlength: 30, // Maximum length of the username
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true, // Removes whitespace from the beginning and end
        lowercase: true, // Converts email to lowercase
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'], // Regex to validate email format
    },
    password: {
        type: String,
        required: true,
        minlength: 6, // Minimum length of the password
        select: false, // Ensures that the password is not returned in any query unless explicitly requested
    },
    firstName: {
        type: String,
        trim: true,
        default: '',
    },
    lastName: {
        type: String,
        trim: true,
        default: '',
    },
    bio: {
        type: String,
        trim: true,
        default: '',
    },
    profilePicture: {
        type: String,
        default: '', // URL to the profile picture
    },
    dateOfBirth: {
        type: Date,
    },
    isActive: {
        type: Boolean,
        default: true, // If the user's account is active
    }
    // You can add additional fields as needed
}, {
    timestamps: true,
    toJSON: {virtuals: true},
    toObject: {virtuals: true},
    id: false,
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    this.password = await userSchema.methods.encryptPassword(this.password);
})

userSchema.methods.encryptPassword = async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
}

userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id, username: this.username }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
  };

module.exports = mongoose.model('User', userSchema);