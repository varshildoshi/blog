import { User } from "src/user/models/user.entity";

export interface BlogEntry {
    id?: string;
    title?: string;
    slug?: string;
    description?: string;
    body?: string;
    createdAt: Date;
    updatedAt: Date;
    likes?: number;
    author?: User;
    headerImage?: string;
    publishedDate?: Date;
    isPublished?: boolean;
}