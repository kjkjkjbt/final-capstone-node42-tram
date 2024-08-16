import {Exclude, Expose} from 'class-transformer';

export class UserDto {
    @Expose()
    id: number;

    @Expose()
    full_name: string;

    @Expose()
    email: string;

    @Exclude()
    pass_word: string;

    @Expose()
    phone: string;

    @Expose()
    birth_day: string;

    @Expose()
    gender: string;

    @Expose()
    role: string;

    @Expose()
    avatar?: string;

    constructor(partial: Partial<UserDto>) {
        Object.assign(this, partial);
    }
}