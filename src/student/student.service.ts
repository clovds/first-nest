import { Injectable } from '@nestjs/common';
import { students } from 'src/db';
import { v4 as uuid } from 'uuid';
import {
  createStudentDto,
  findStudentResponseDto,
  studentResponseDto,
  updateStudentDto,
} from './dto/student.dto';

@Injectable()
export class StudentService {
  private students = students;
  getStudents(): findStudentResponseDto[] {
    return this.students;
  }

  getStudentById(studentId: string): findStudentResponseDto {
    return this.students.find((student) => {
      return student.id == studentId;
    });
  }

  insertStudent(payload: createStudentDto): studentResponseDto {
    const newStudent = {
      id: uuid(),
      ...payload,
    };

    this.students.push(newStudent);

    return newStudent;
  }

  updateStudent(payload: updateStudentDto, studentId: string) {
    let updatedStudent: studentResponseDto;

    const updatedStudentList = this.students.map((student) => {
      if (student.id == studentId) {
        updatedStudent = {
          id: studentId,
          ...payload,
        };

        return updatedStudent;
      }
    });

    this.students = updatedStudentList;

    return updatedStudent;
  }

  getStudentsByTeacherId(teacherId: string): findStudentResponseDto[] {
    return this.students.filter((student) => {
      student.teacher == teacherId;
    });
  }

  updateStudentTeacher(
    teacherId: string,
    studentId: string,
  ): studentResponseDto {
    let updatedStudent: studentResponseDto;

    const updatedStudentList = this.students.map((student) => {
      if (student.id == studentId) {
        updatedStudent = {
          teacher: teacherId,
          ...student,
        };

        return updatedStudent;
      }
    });

    this.students = updatedStudentList;

    return updatedStudent;
  }
}
