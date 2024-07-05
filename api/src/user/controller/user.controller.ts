import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { UserInterface } from '../models/user.interface';
import { catchError, map, Observable, of } from 'rxjs';

@Controller('users')
export class UserController {

    constructor(private userService: UserService) { }

    @Post()
    create(@Body() user: UserInterface): Observable<UserInterface | Object> {
        return this.userService.create(user).pipe(
            map((user: UserInterface) => user),
            catchError(err => of({ error: err.message }))
        );
    }

    @Post('login')
    login(@Body() user: UserInterface): Observable<Object> {
        return this.userService.login(user).pipe(
            map((jwt: string) => {
                return { access_token: jwt };
            })
        )
    }

    @Get(':id')
    findOne(@Param() params): Observable<UserInterface> {
        return this.userService.findOne(params.id);
    }

    @Get()
    findAll(): Observable<UserInterface[]> {
        return this.userService.findAll();
    }

    @Delete(':id')
    delete(@Param('id') id: string): Observable<UserInterface> {
        return this.userService.delete(Number(id));
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() user: UserInterface): Observable<any> {
        return this.userService.update(Number(id), user);
    }

}
