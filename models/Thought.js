const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

const ThoughtSchema = new Schema(
    {
    thoughtId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    thoughtBody: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateformat(createdAtVal)
    }
},
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
    },
);
const Thought = model('Thought', ThoughtSchema);

ThoughtSchema.virtual('thoughtCount').get(function(){
    return this.replies.length;
});

model.exports = Thought;

