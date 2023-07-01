/* eslint-disable @typescript-eslint/no-unused-vars */
jest.mock('bcrypt', () => ({
    compare: jest.fn().mockImplementation(
        (value: string, hashValue: string, callback: () => any) => {
            return undefined;
        }
    )
}));

import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@/users/services/users.service';
import { User } from '@/interfaces/users/user.entity';

const oneUser = {
    id: 1,
    name: 'John Doe',
    username: 'johndoe',
    email: 'john@example.com',
    password: 'secret'
};

describe('AuthService', () => {
    let service: AuthService;
    let users: UsersService;
    let jwt: JwtService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: JwtService,
                    useValue: {
                        new: jest.fn(),
                        constructor: jest.fn(),
                        signAsync: jest.fn(),
                    }
                },
                {
                    provide: UsersService,
                    useValue: {
                        new: jest.fn(),
                        constructor: jest.fn(),
                        findByEmail: jest.fn()
                    }
                }
            ],
        }).compile();

        service = module.get<AuthService>(AuthService);
        users = module.get<UsersService>(UsersService);
        jwt = module.get<JwtService>(JwtService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should authenticate a user', async () => {
        jest.spyOn(users, 'findByEmail')
            .mockReturnValue(new Promise((resolve) => resolve(oneUser as User)));
        jest.spyOn(jwt, 'signAsync')
            .mockReturnValue(new Promise((resolve) => resolve('fake-jwt-token')));

        const result = await service.authenticate({
            email: 'ws@wxample.com',
            password: 'password', // password
        });

        expect(result).toEqual({
            ...{ accessToken: 'fake-jwt-token' },
            ...oneUser
        });
        expect(jwt.signAsync).toBeCalled();
    });
});
