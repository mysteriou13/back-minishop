import { Controller, Get, Post, Delete, Param, Body, Inject } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post()
    create(@Body() datauser: unknown[]) {
        return this.usersService.create(datauser);
    }

}
