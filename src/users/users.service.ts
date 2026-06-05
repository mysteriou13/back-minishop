import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {

    /*inscription utilisateur data from fontend array[] datauser*/
    create(datauser: unknown[]) {
        console.log(datauser);
        return 'User created successfully';
    }
}
