const { Schema, model } = require('mongoose');
const moment = require('moment');

const UserSchema = new Schema(
    {
        username:{
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Please enter a valid e-mail address'],
        },
        thoughts: [
            {
            type: Schema.Types.ObjectId,
            ref: 'Thought',
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
        id: false,
    }
);

const User = model('User', UserSchema);

UserSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

model.exports = User;
