import { MentorModel } from "../models/MentorSchema.js";
import { StudentModel } from "../models/StudentSchema.js";

const createStudent = async (req, res) => {

    const { first_name, last_name, email, phone_number, course, previous_mentor, current_mentor } = req.body;

    try {

        //Checking the payload is there
        if (!first_name || !last_name || !email || !phone_number || !course) {
            return res.status(400).json({
                status: "Error",
                message: "Error creating student!",
                data: {
                    error: `Missing required fields 'first_name', 'last_name', 'email', 'phone_number', 'course'`
                }
            })
        }

        const isStudentExists = await StudentModel.findOne({ email: email });


        if (isStudentExists) {
            return res.status(400).json({
                status: "Error",
                message: "Error creating student!",
                data: {
                    error: `Student with email id ${email} was already exist!. Please try with different email id`
                }
            })
        }

        const newStudent = new StudentModel({ first_name, last_name, email, phone_number, course })
        const newStudentResponse = await newStudent.save();
        return res.status(201).json({
            status: "Success",
            message: "Student created successfully!",
            data: {
                newStudent: newStudentResponse
            }
        })
    }

    catch (err) {
        return res.status(500).json({
            status: "Error",
            message: "Error creating student!",
            data: {
                error: err.message
            }
        })
    }

}


//Get all students
const getAllStudents = async (req, res) => {

    try {
        const studentsResponse = await StudentModel.find().populate('current_mentor').populate('previous_mentor');
        return res.status(200).json({
            status: "Success",
            message: "Students fetched successfully!",
            data: {
                allStudents: studentsResponse
            }
        })
    }

    catch (err) {
        return res.status(500).json({
            status: "Error",
            message: "Error fetching students!",
            data: {
                error: err.message
            }
        })
    }
}


//Get student by Id
const getStudentById = async (req, res) => {

    const { id } = req.params;

    try {
        const studentResponse = await StudentModel.findById(id).populate('current_mentor').populate('previous_mentor');
        if (!studentResponse) {
            return res.status(404).json({
                status: "Error",
                message: "Error fetching student!",
                data: {
                    error: `Student with id ${id} was not found!`
                }
            })
        }
        return res.status(200).json({
            status: "Success",
            message: "Student fetched successfully!",
            data: {
                student: studentResponse
            }
        })
    }

    catch (err) {
        return res.status(500).json({
            status: "Error",
            message: "Error fetching student!",
            data: {
                error: err.message
            }
        })
    }
}


//Assign student to mentor

const assignMentor = async (req, res) => {

    const { mentor_id, student_id } = req.body

    const allMentors = await MentorModel.find();

    try {

        //1. Checking the payload
        if (!mentor_id || !student_id) {
            return res.status(400).json({
                status: "Error",
                message: "Error assigning mentor!",
                data: {
                    error: `Missing required fields 'mentor_id', 'student_id'!`
                }
            })
        }

        //2. Checking mentor and student was already there
        const mentor = await MentorModel.findById(mentor_id);
        const student = await StudentModel.findById(student_id);

        if (!mentor || !student) {
            return res.status(400).json({
                status: "Error",
                message: "Error assigning mentor!",
                data: {
                    error: `Please check mentor_id or student_id. Either mentor or student was not exists!`
                }
            })
        }


        //3. Checking if the student was already assigned to a mentor. If he is assigned, we need to remove him from mentor's student list
        const allStudentsInMentors = allMentors.map(allMentor => allMentor.students.map(s => ({ mentorId: allMentor._id, studentId: s }))).flat()

        // Remove student from the mentor's student list 
        for (const sm of allStudentsInMentors) {
            if (sm.studentId == student_id) {
                // Update the mentor document to remove the student
                await MentorModel.findOneAndUpdate(
                    { _id: sm.mentorId },
                    { $pull: { students: student_id } }
                );
            }
        }

        //Update the mentor's student list with new student
        const updateMentor = await MentorModel.findOneAndUpdate({ _id: mentor_id }, { $push: { students: student_id } });

        //Update the student with previous and current mentor
        const updateStudent = await StudentModel.findOneAndUpdate({ _id: student_id }, { $set: { previous_mentor: student.current_mentor, current_mentor: mentor_id } }, { new: true });

        return res.status(200).json({
            status: "Success",
            message: `Student ${student_id} assigned to mentor ${mentor_id}!`,
            data: {
                assignedMentor: updateStudent
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



export { createStudent, getAllStudents, getStudentById, assignMentor };