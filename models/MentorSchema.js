import mongoose from 'mongoose';

const mentorSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true
    },
    mentor_at: {
        type: String,
        required: true,
    },
    students: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "Students"
    }
})

export const MentorModel  = mongoose.model("Mentors", mentorSchema);