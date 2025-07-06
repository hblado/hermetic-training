import { IsArray, IsOptional, IsString } from "class-validator";

export class CreateExerciseDto {
    @IsString()
    title: string

    @IsString()
    videoLink: string

    @IsOptional()
    @IsArray()
    tags: string[]
}
