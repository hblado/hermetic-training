import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/users/guards/roles.guard';
import { Roles } from 'src/users/roles/roles.decorator';
import { PaginationDto } from './dto/pagination.dto';

@Controller('exercises')
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  /**
   * Create a new exercise
   * @param {CreateExerciseDto} createExerciseDto 
   * @returns 
   */
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  create(@Body() createExerciseDto: CreateExerciseDto) {
    return this.exercisesService.create(createExerciseDto);
  }

  /**
   * Uses pagination to get every exercise
   * @param {PaginationDto} paginationDto 
   * @returns 
   */
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  findAll(@Query() paginationDto: PaginationDto) {
    console.log(paginationDto)
    return this.exercisesService.findAll(paginationDto);
  }

  /**
   * Search exercices by tag
   * @param {PaginationDto} paginationDto 
   * @param {tags: string[]} findByTag 
   * @returns 
   */
  @Post('/tags')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  findByTags(@Query() paginationDto: PaginationDto, @Body() findByTag){
    return this.exercisesService.findByTag(findByTag.tags, paginationDto)
  }

  /**
   * Search exercices by id
   * @param {number} id 
   * @returns 
   */
  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  findOne(@Param('id') id: string) {
    return this.exercisesService.findOne(+id);
  }

  /**
   * Update an exercise info
   * @param {number} id 
   * @param {UpdateExerciseDto} updateExerciseDto 
   * @returns 
   */
  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  update(@Param('id') id: string, @Body() updateExerciseDto: UpdateExerciseDto) {
    return this.exercisesService.update(+id, updateExerciseDto);
  }

  /**
   * Permanently removes an exercise
   * @param {number} id 
   * @returns 
   */
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.exercisesService.remove(+id);
  }
}
