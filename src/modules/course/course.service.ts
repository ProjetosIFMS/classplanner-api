import { Injectable } from '@nestjs/common';
import {
  CreateCourseUseCase,
  DeleteCourseUseCase,
  FindAllCoursesUseCase,
  FindCourseByIdUseCase,
  UpdateCourseUseCase,
} from './use-cases';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CourseService {
  constructor(
    private readonly createCourseUseCase: CreateCourseUseCase,
    private readonly findAllCoursesUseCase: FindAllCoursesUseCase,
    private readonly findCourseByIdUseCase: FindCourseByIdUseCase,
    private readonly deleteCourseUseCase: DeleteCourseUseCase,
    private readonly updateCourseUseCase: UpdateCourseUseCase,
  ) {}
  async createCourse(createCourseDto: CreateCourseDto) {
    return await this.createCourseUseCase.execute(createCourseDto);
  }

  async findAllCourses() {
    return await this.findAllCoursesUseCase.execute();
  }

  async findCourseById(id: string) {
    return await this.findCourseByIdUseCase.execute(id);
  }

  async updateCourse(id: string, updateAreaDto: UpdateCourseDto) {
    return await this.updateCourseUseCase.execute(id, updateAreaDto);
  }

  async deleteCourse(id: string) {
    return await this.deleteCourseUseCase.execute(id);
  }
}
