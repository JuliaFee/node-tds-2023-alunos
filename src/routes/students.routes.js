import { Router } from "express";

import {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
  getStudentById,
} from "../controllers/students.controller.js";

const studentsRouter = Router();

studentsRouter.get("/", getStudents);
studentsRouter.get("/:id", getStudentById);
studentsRouter.post("/", createStudent);
studentsRouter.put("/:id", updateStudent);
studentsRouter.delete("/:id", deleteStudent);

export default studentsRouter;
