
export interface UserInterface {
    id?: number;
    name?: string;
    username?: string;
    email?: string;
    password?: string;
    role?: UserRole;
    profileImage?: string;
}

export enum UserRole {
    ADMIN = 'admin',
    EDITOR = 'editor',
    CHIEFEDITOR = 'chiefeditor',
    USER = 'user'
}