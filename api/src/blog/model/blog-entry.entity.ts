import { User } from "src/user/models/user.entity";
import { BeforeUpdate, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('blog')
export class BlogEntryEntity {

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    title: string;

    @Column()
    slug: string;

    @Column()
    description: string;

    @Column({ default: '' })
    body: string;

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    updatedAt: Date;

    @BeforeUpdate()
    updateTimestamp() {
        this.updatedAt = new Date;
    }

    @Column({default: 0})
    likes: number;

    @Column()
    headerImage: string;

    @Column()
    publishedDate: Date;


    @Column()
    isPublished: boolean;

    @ManyToOne(type => User, user => user.blog)
    author: User;

}