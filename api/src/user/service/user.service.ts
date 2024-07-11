import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../models/user.entity';
import { Repository } from 'typeorm';
import { UserInterface, UserRole } from '../models/user.interface';
import { Observable, from, throwError } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { AuthService } from 'src/auth/services/auth.service';
import { paginate, Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<UserInterface>,
        private authService: AuthService
    ) { }

    create(user: UserInterface): Observable<UserInterface> {
        return this.authService.hashPassword(user.password).pipe(
            switchMap((passwordHash: string) => {
                const newUser = new User();
                newUser.name = user.name;
                newUser.username = user.username;
                newUser.email = user.email;
                newUser.password = passwordHash;
                newUser.role = UserRole.USER;

                return from(this.userRepository.save(newUser)).pipe(
                    map((user: User) => {
                        const { password, ...result } = user;
                        return result;
                    }),
                    catchError(err => throwError(err))
                )
            })
        )
    }

    findAll(): Observable<UserInterface[]> {
        return from(this.userRepository.find()).pipe(
            map((users) => {
                users.forEach(function (v) { delete v.password });
                return users
            })
        );
    }

    findOne(id: number): Observable<UserInterface> {
        return from(this.userRepository.findOneBy({ id })).pipe(
            map((user: UserInterface) => {
                const { password, ...result } = user;
                return result;
            })
        )
    }

    paginate(options: IPaginationOptions): Observable<Pagination<UserInterface>> {
        return from(paginate<UserInterface>(this.userRepository, options)).pipe(
            map((usersPagable: Pagination<UserInterface>) => {
                usersPagable.items.forEach(function (v) { delete v.password });
                return usersPagable;
            })
        )
    }

    delete(id: number): Observable<any> {
        return from(this.userRepository.delete(id));
    }

    update(id: number, user: UserInterface): Observable<any> {
        delete user.email;
        delete user.password;
        delete user.role;
        return from(this.userRepository.update(id, user));
    }

    updateRoleOfUser(id: number, user: UserInterface): Observable<any> {
        return from(this.userRepository.update(id, user));
    }

    login(user: UserInterface): Observable<string> {
        return this.validateUser(user.email, user.password).pipe(
            switchMap((user: UserInterface) => {
                if (user) {
                    return this.authService.generateJWT(user).pipe(map((jwt: string) => jwt));
                } else {
                    return 'Wrong Credentials';
                }
            })
        );
    }

    validateUser(email: string, password: string): Observable<UserInterface> {
        return this.findByMail(email).pipe(
            switchMap((user: UserInterface) => this.authService.comparePassword(password, user.password).pipe(
                map((match: boolean) => {
                    if (match) {
                        const { password, ...result } = user;
                        return result;
                    } else {
                        throw Error;
                    }
                })
            ))
        );
    }

    findByMail(email: string): Observable<UserInterface> {
        return from(this.userRepository.findOneBy({ email }));
    }
}
