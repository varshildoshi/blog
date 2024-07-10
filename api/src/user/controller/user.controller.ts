import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { UserInterface, UserRole } from '../models/user.interface';
import { catchError, map, Observable, of } from 'rxjs';
import { hasRoles } from 'src/auth/decorator/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

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

    @hasRoles(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put(':id/role')
    updateRoleOfUser(@Param('id') id: string, @Body() user: UserInterface): Observable<UserInterface> {
        return this.userService.updateRoleOfUser(Number(id), user); 
    }

}
