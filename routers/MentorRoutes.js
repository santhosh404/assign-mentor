import express from 'express';
import { assignStudents, createMentor, getAllMentors, getMentorById } from "../controllers/MentorController.js";

export const MentorRoutes = express.Router();


MentorRoutes.post('/create-mentor', createMentor);
MentorRoutes.get('/all-mentors', getAllMentors);
MentorRoutes.get('/get-mentor/:id', getMentorById);
MentorRoutes.put('/assign-students', assignStudents);