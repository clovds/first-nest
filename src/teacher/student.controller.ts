import { Controller, Get, Param, Put } from '@nestjs/common';
import {
  findStudentResponseDto,
  studentResponseDto,
} from 'src/student/dto/student.dto';
import { StudentService } from 'src/student/student.service';

@Controller('teachers/:teacherId/students')
export class StudentTeacherController {
  constructor(private readonly studentService: StudentService) {}

  @Get()
  getStudentsByTeacherId(
    @Param('teacherId') teacherId: string,
    // @Query('query') query: string, // for query
  ): findStudentResponseDto[] {
    return this.studentService.getStudentsByTeacherId(teacherId);
  }

  @Put(':studentId')
  updateStudentTeacher(
    @Param('teacherId') teacherId: string,
    @Param('studentId') studentId: string,
  ): studentResponseDto {
    return this.studentService.updateStudentTeacher(teacherId, studentId);
  }
}
