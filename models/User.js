const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

// // Import de outros esquemas
// const Aluguel = require('./Aluguel');

// Create Schema
const userSchema = new Schema({
    method: {
        type: String,
        enum: ['local', 'google', 'auth0'],
        required: true,
    },
    local: {
        email: { type: String, lowercase: true, },
        password: { type: String, }
    },
    google: {
        id: { type: String, },
        name: { type: String, },
        email: { type: String, lowercase: true },
        photo: { type: String, },
    },
    auth0: {
        id: { type: String, },
        name: { type: String, },
        email: { type: String, },
    },
    stripeCustomerId: { type: String, },
    plan: {
        id: { type: String, },
        name: { type: String, },
    },
    // alugueis: [Aluguel.schema]
});

// Hash password
userSchema.pre('save', async function (next) {
    try {
        if (this.method !== 'local') {
            next();
        }
        // Generate a salt
        const salt = await bcrypt.genSalt(10);
        // Generate a passport hash (salt + hash)
        const passwordHash = await bcrypt.hash(this.local.password, salt);
        // Re-assign hashed version over original (plain text password)
        this.local.password = passwordHash;
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.isValidPassword = async function (newPassword) {
    try {
        return await bcrypt.compare(newPassword, this.local.password);
    } catch (error) {
        throw new Error(error);
    }
}

userSchema.plugin(mongoosePaginate);

// Create Model
const User = mongoose.model('user', userSchema);

// Export Model
module.exports = User;