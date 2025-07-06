import { PartialType } from '@nestjs/mapped-types';
import { CreateExerciseDto } from './create-exercise.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateExerciseDto extends PartialType(CreateExerciseDto) {
    @IsOptional()
    @IsString()
    title?: string | undefined;

    @IsOptional()
    @IsString()
    videoLink?: string | undefined;

    @IsOptional()
    tags?: string[] | undefined;
}
