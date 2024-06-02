import { MentorModel } from "../models/MentorSchema.js";
import { StudentModel } from "../models/StudentSchema.js";


const createMentor = async (req, res) => {

    const newMentorPayload = req.body;

    try {

        //Checking the payload is there
        if (!newMentorPayload.first_name || !newMentorPayload.last_name || !newMentorPayload.email || !newMentorPayload.phone_number || !newMentorPayload.mentor_at) {
            return res.status(400).json({
                status: "Error",
                message: "Error creating mentor!",
                data: {
                    error: `Missing required fields 'first_name', 'last_name', 'email', 'phone_number', 'mentor_at'`
                }
            })
        }

        const isMentorExists = await MentorModel.findOne({ email: newMentorPayload.email });


        if (isMentorExists) {
            return res.status(400).json({
                status: "Error",
                message: "Error creating mentor!",
                data: {
                    error: `Mentor with email id ${newMentorPayload.email} was already exist!. Please try with different email id`
                }
            })
        }

        const newMentor = new MentorModel({ ...newMentorPayload })
        const newMentorResponse = await newMentor.save();
        return res.status(201).json({
            status: "Success",
            message: "Mentor created successfully!",
            data: {
                newMentor: newMentorResponse
            }
        })
    }

    catch (err) {
        return res.status(500).json({
            status: "Error",
            message: "Error creating mentor!",
            data: {
                error: err.message
            }
        })
    }

}



//Get all mentors
const getAllMentors = async (req, res) => {

    try {
        const newMentorResponse = await MentorModel.find().populate('students');
        return res.status(200).json({
            status: "Success",
            message: "Mentors fetched successfully!",
            data: {
                allMentors: newMentorResponse
            }
        })
    }

    catch (err) {
        return res.status(500).json({
            status: "Error",
            message: "Error fetching mentors!",
            data: {
                error: err.message
            }
        })
    }
}


//Get mentor by Id
const getMentorById = async (req, res) => {

    const { id } = req.params;

    try {
        const newMentorResponse = await MentorModel.findById(id).populate('students');

        if (!newMentorResponse) {
            return res.status(404).json({
                status: "Error",
                message: "Error fetching mentor!",
                data: {
                    error: `Mentor with id ${id} was not found!`
                }
            })
        }
        return res.status(200).json({
            status: "Success",
            message: "Mentor fetched successfully!",
            data: {
                mentor: newMentorResponse
            }
        })
    }

    catch (err) {
        return res.status(500).json({
            status: "Error",
            message: "Error fetching mentor!",
            data: {
                error: err.message
            }
        })
    }
}


//Assign students to mentor
const assignStudents = async (req, res) => {

    const { mentor_id, student_id } = req.body

    try {

        //Checking the payloads
        if (!mentor_id || !student_id) {
            return res.status(400).json({
                status: "Error",
                message: "Error assigning students!",
                data: {
                    error: `Missing required fields 'mentor_id', 'student_id'!`
                }
            })
        }

        //Checking mentor and student was already there
        const mentor = await MentorModel.findById(mentor_id);
        const students = await Promise.all(student_id.map(id => StudentModel.findById(id)))

        if (!mentor) {
            return res.status(400).json({
                status: "Error",
                message: "Error assigning students!",
                data: {
                    error: `Please check mentor_id or student_id. Either mentor or student was not exists!`
                }
            })
        }

        if (students.includes(null)) {
            return res.status(400).json({
                status: "Error",
                message: "Error assigning students!",
                data: {
                    error: `One or more students do not exist!`
                }
            });
        }

        //Checking if the student has not mentor
        const allStudents = await StudentModel.find();
        const allMentors = await MentorModel.find();
        const studentsWithoutMentor = allStudents.filter(student => student.current_mentor == null);

        const isStudentHasNoMentor = student_id.map(sId => studentsWithoutMentor.map(s => s._id.toString()).includes(sId))
        

        if (isStudentHasNoMentor.includes(false)) {
            return res.status(400).json({
                status: "Error",
                message: "Error assigning students!",
                data: {
                    error: `One or More student already has mentor!`,
                    students_without_mentor: studentsWithoutMentor
                }
            })
        }

        const studentIdsWithMentor = allStudents.filter(st => st.current_mentor == mentor_id).map(s => s._id)
        const updateMentor = await MentorModel.findOneAndUpdate({ _id: mentor._id }, { $set: { students: [...studentIdsWithMentor, ...student_id] }}, { new: true });

        //Updating the students collection
        students.forEach(async (st) => {
            await StudentModel.findOneAndUpdate({ _id: st._id }, { ...st._doc, previous_mentor: st.current_mentor, current_mentor: mentor_id })
        })

        return res.status(200).json({
            status: "Success",
            message: `${Array.isArray(student_id) ? student_id.join(", ") : student_id} assigned to mentor!`,
            data: {
                assignedStudents: updateMentor
            }
        })

    }

    catch (err) {
        return res.status(500).json({
            status: "Error",
            message: "Error assigning students!",
            data: {
                error: err.message
            }
        })
    }
}


export { createMentor, getAllMentors, getMentorById, assignStudents };