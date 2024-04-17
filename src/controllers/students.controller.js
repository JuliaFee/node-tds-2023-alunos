import { Student } from "../models/students/Student.js";
import  StudentsRepository  from "../models/students/StudentsRepository.js";

const studentsRepository = new StudentsRepository();

export const getStudents = async (req, res) => {
 try {
  const students = studentsRepository.getStudents();

  if (students.length === 0) {
    return res.status(404).send({ message: "Não há alunos cadastrados" });
  }
  return res.status(200).send({ totalStudents: students.length, students });
 } catch (error) {
  return res.status(500).send({ message: "ERRO BUSCAR ALUNO", error: error.message });
 }
};

export const getStudentById = async (req, res) => {
try {
  const { id } = req.params;

  const student = studentsRepository.getStudentById(id);

  if (!student) {
    return res.status(404).send({ message: "Aluno não encontrado" });
  }

  return res.status(200).send({ message: "Aluno encontrado", student });
} catch (error) {
  return res.status(500).send({ message: "ERRO BUSCAR ALUNO POR ID", error: error.message });
}
};

export const getStudentByName = async (req, res) => {
 try {
  const { name } = req.query;

  if (!name) {
    return res.status(400).send({ message: "Nome do aluno não fornecido" });
  }

  const student = studentsRepository.getStudentByName(name);

  if (!student) {
    return res.status(404).send({ message: "Aluno não encontrado" });
  }

  return res.status(200).send({ message: "Aluno encontrado", student });
 } catch (error) {
  return res.status(500).send({ message: "ERRO BUSCAR ALUNO POR NOME", error: error.message });
 }
};

export const createStudent = async (req, res) => {
try {
  const { name, age } = req.body;

  const student = new Student(name, age);

  studentsRepository.addStudent(student);

  return res.status(201).send({ message: "Aluno criado com sucesso", student });
} catch (error) {
  return res.status(500).send({ message: "ERRO CRIAR ALUNO", error: error.message });
}
};

export const updateStudent = async (req, res) => {
 try {
  const { id } = req.params;
  const { name, age } = req.body;

  const updatedStudent = studentsRepository.updateStudent(id, name, age);

  if (!updatedStudent) {
    return res.status(404).send({ message: "Aluno não encontrado" });
  }

  return res.status(200).send({ message: "Aluno atualizado com sucesso", student: updatedStudent });
 } catch (error) {
  return res.status(500).send({ message: "ERRO ATUALIZAR ALUNO", error: error.message });
 }
};

export const deleteStudent = async (req, res) => {
try {
  const { id } = req.params;

  const deletedStudent = studentsRepository.deleteStudent(id);

  if (!deletedStudent) {
    return res.status(404).send({ message: "Aluno não encontrado" });
  }

  return res.status(200).send({ message: "Aluno deletado com sucesso", student: deletedStudent });
} catch (error) {
  return res.status(500).send({ message: "ERRO DELETAR ALUNO", error: error.message });
}
};