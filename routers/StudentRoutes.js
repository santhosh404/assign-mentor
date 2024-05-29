import express from 'express';
import { assignMentor, createStudent, getAllStudents, getStudentById } from '../controllers/StudentController.js';

export const StudentRoutes = express.Router();


StudentRoutes.post('/create-student', createStudent);
StudentRoutes.get('/all-students', getAllStudents);
StudentRoutes.get('/get-student/:id', getStudentById);
StudentRoutes.put('/assign-mentor', assignMentor);