/* eslint-disable @typescript-eslint/no-unused-vars */
jest.mock('bcrypt', () => ({
    genSalt: jest.fn()
        .mockImplementation(() => ((
            value: string,
            hashValue: string,
            callback: () => any
        ) => {
            return undefined;
        })),

    hash: jest.fn()
        .mockImplementation((value: string, callback: () => any) => {
            return new Promise((resolve) => resolve(value));
        }),
}));

import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../../users/services/users.service';
import { RolesService } from '../../users/services/roles.service';
import { RegisterService } from './register.service';
import { Role } from '../../users/entities/role.entity';
import { Role as RoleEnum } from '@/users/enums/role.enum';

const oneUser = {
    name: 'John Doe',
    username: 'johndoe',
    email: 'john@example.com',
    password: 'secret',
    role: 1
};

describe('RegisterService', () => {
    let service: RegisterService;
    let roles: RolesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                RegisterService,
                {
                    provide: UsersService,
                    useValue: {
                        new: jest.fn(),
                        constructor: jest.fn(),
                        create: jest.fn().mockResolvedValue(oneUser),
                    }
                },
                {
                    provide: RolesService,
                    useValue: {
                        new: jest.fn(),
                        constructor: jest.fn(),
                        findByName: jest.fn()
                    }
                },
            ],
        }).compile();

        service = module.get<RegisterService>(RegisterService);
        roles = module.get<RolesService>(RolesService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should successfully create a user', () => {
        const rolesSpy = jest.spyOn(roles, 'findByName')
            .mockReturnValue(new Promise((resolve) => resolve({
                id: 1,
                name: RoleEnum.USER,
                slug: 'user',
                users: null
            } as any)));

        expect(service.register({
            name: 'John Doe',
            username: 'johndoe',
            email: 'john@example.com',
            password: 'secret',
            role: 1 as Partial<Role>
        })).resolves.toEqual(oneUser);
    });
});
