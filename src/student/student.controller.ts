import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import {
  createStudentDto,
  findStudentResponseDto,
  updateStudentDto,
  studentResponseDto,
} from './dto/student.dto';
import { StudentService } from './student.service';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get()
  getStudents(): findStudentResponseDto[] {
    return this.studentService.getStudents();
  }

  @Get('/:studentId')
  getStudentById(
    @Param('studentId') studentId: string,
  ): findStudentResponseDto {
    return this.studentService.getStudentById(studentId);
  }

  @Post()
  insertStudent(@Body() body: createStudentDto): studentResponseDto {
    return this.studentService.insertStudent(body);
  }

  @Put('/:studentId')
  updateStudent(
    @Param('studentId') studentId: string,
    @Body() body: updateStudentDto,
  ): studentResponseDto {
    return this.studentService.updateStudent(body, studentId);
  }
}
