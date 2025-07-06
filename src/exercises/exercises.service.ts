import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { Exercise } from './entities/exercise.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationDto } from './dto/pagination.dto';

@Injectable()
export class ExercisesService {
  constructor(
    @InjectRepository(Exercise)
    private readonly exerciseRepo: Repository<Exercise>
  ){}


  async create(createExerciseDto: CreateExerciseDto) {
    const exercise = await this.exerciseRepo.create(
      createExerciseDto
    )
    if (exercise.tags) {
      exercise.tags = exercise.tags.map(tag => tag.toLowerCase());
    }

    return this.exerciseRepo.save(exercise)
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    const [exercises, total] = await this.exerciseRepo.findAndCount(
      {take: limit, skip: offset}
    )
    return new HttpException({exercises, total}, HttpStatus.OK)
  }

  async findByTag(tags: Array<String>, paginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    const [tagFiltered, total] = await this.exerciseRepo
    .createQueryBuilder("exercise")
    .where("exercise.tags && :tags", { tags })
    .offset(offset)
    .take(limit)
    .getManyAndCount()

    return {tagFiltered, total}
  }

  async findOne(id: number) {
    const exercice = await this.exerciseRepo.findOneBy({id})
    if(!exercice) throw new HttpException({}, HttpStatus.NOT_FOUND)
    return new HttpException(exercice, HttpStatus.OK);
  }

  async update(id: number, updateExerciseDto: UpdateExerciseDto) {
    const {title, tags, videoLink} = updateExerciseDto
    const exercise = await this.exerciseRepo.findOneBy({id})
    if(!exercise) throw new HttpException({}, HttpStatus.NOT_FOUND)
    title ? exercise.title = title : null
    tags ? exercise.tags = tags : null
    videoLink ? exercise.videoLink = videoLink : null
    await this.exerciseRepo.save(exercise)
    return new HttpException(exercise, HttpStatus.OK)
  }

  async remove(id: number) {
    const exercise = await this.exerciseRepo.findOneBy({id})
    if(!exercise) throw new HttpException({message: `Exercise id ${id} does not exist`}, HttpStatus.NOT_FOUND)
    await this.exerciseRepo.remove(exercise)
    return new HttpException({message: `Exercise ${exercise.title} removed`}, HttpStatus.OK)
  }
}
