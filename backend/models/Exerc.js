const mongoose = require('../db/conn')
const { Schema } = mongoose
const Exerc = mongoose.model(
    'Exerc',
    new Schema(
        {
            name: {
                type: String,
                required: true
            },
            reps: {
                type: Number,
                required: true
            },
            sets: {
                type: Number,
                required: true
            },
            weight: {
                type: Number,
                required: true
            },
            user:Object

        },
        { timestamps: true }
    )
)

module.exports = Exerc

