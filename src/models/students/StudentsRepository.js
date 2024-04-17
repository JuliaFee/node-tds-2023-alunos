import db from "../../database/index.js";
import { v4 as uuidv4 } from "uuid";

export default class StudentsRepository {
  constructor() {
    this.db = db;
  }

  async getStudents() {
    try {
      const allStudents = await this.db.manyOrNone("SELECT * FROM students");
      return allStudents;
    } catch (error) {
      throw error;
    }
  }

  async getStudentById(id) {
    try {
      const student = await this.db.oneOrNone("SELECT * FROM students WHERE id = $1", id);
      return student;
    } catch (error) {
      throw error;
    }
  }

  async getStudentByName(name) {
    try {
      const student = await this.db.oneOrNone("SELECT * FROM students WHERE name = $1", name);
      return student;
    } catch (error) {
      throw error;
    }
  }

  async createStudent(student) {
    try {
      const { name, age } = student;
      const id = uuidv4();
      await this.db.none("INSERT INTO students (id, name, age) VALUES ($1, $2, $3)", [id, name, age]);
      return { id, name, age };
    } catch (error) {
      throw error;
    }
  }

  async updateStudent(id, name, age) {
    try {
      const student = await this.getStudentById(id);

      if (!student) {
        return null;
      }

      student.name = name;
      student.age = age;

      const updatedStudent = await this.db.one(
        "UPDATE students SET name = $1, age = $2 WHERE id = $3 RETURNING *",
        [name, age, id]
      );

      return updatedStudent;
    } catch (error) {
      throw error;
    }
  }

  async deleteStudent(id) {
    try {
      await this.db.none("DELETE FROM students WHERE id = $1", id);
    } catch (error) {
      throw error;
    }
  }
}
