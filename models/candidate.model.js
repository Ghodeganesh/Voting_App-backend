const mongoose = require("mongoose")


const candidateSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    age: {
        type: Number,
        require: true,
    },
    partyName: {
        type: String,
        require: true,
        unique: true
    },
    votes: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "person",
                require: true
            },
            votedat: {
                type: Date,
                default: Date.now()
            }
        }
    ],
    voteCount: {
        type: String,
        default: 0
    }


}, { timestamps: true })


export const candidate = mongoose.model("candidate", candidateSchema)

