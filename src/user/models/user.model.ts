import { AbstractModel } from '@/database/models/abstract.model';
import { User as UserInterface } from '@/interfaces/user/user';
import { Injectable } from '@nestjs/common';

@Injectable()
export class User extends AbstractModel<UserInterface> {
    /**
     * The table associated with the model.
     *
     * @var {string}
     */
    protected readonly table: string = 'users';
}
