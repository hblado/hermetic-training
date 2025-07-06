import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Exercise {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({name: "video_link"})
    videoLink: string;

    @Column('text', {array: true, nullable: true})
    tags: string[] | null;
}
 