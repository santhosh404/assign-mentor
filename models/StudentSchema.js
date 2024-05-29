import mongoose from 'mongoose';

const studentSchema = mongoose.Schema({
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
    course: {
        type: String,
        required: true
    },
    previous_mentor: {
        type: mongoose.SchemaTypes.ObjectId,
        default: null,
        ref: "Mentors"
    },
    current_mentor: {
        type: mongoose.SchemaTypes.ObjectId,
        default: null,
        ref: "Mentors"
    }
})

export const StudentModel = mongoose.model("Students", studentSchema);