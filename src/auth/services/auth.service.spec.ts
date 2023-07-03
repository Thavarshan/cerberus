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
import { RefreshSessionService } from './refresh-session.service';
import { RefreshSession } from '../entities/refresh-session.entity';
import { authConfig } from '@/config/auth.config';

const oneUser = {
    id: '1',
    name: 'John Doe',
    username: 'johndoe',
    email: 'john@example.com',
    password: 'secret'
};

describe('AuthService', () => {
    let service: AuthService;
    let users: UsersService;
    let refreshSession: RefreshSessionService;
    let jwt: JwtService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: authConfig.KEY,
                    useValue: {
                        new: jest.fn().mockResolvedValue(authConfig),
                        constructor: jest.fn().mockResolvedValue(authConfig),
                        secretKey: 'secret-key',
                        secretRefreshKey: 'secret-refresh-key',
                    }
                },
                {
                    provide: JwtService,
                    useValue: {
                        new: jest.fn(),
                        constructor: jest.fn(),
                        decode: jest.fn(),
                        verify: jest.fn(),
                        signAsync: jest.fn(),
                    }
                },
                {
                    provide: UsersService,
                    useValue: {
                        new: jest.fn(),
                        constructor: jest.fn(),
                        findByEmail: jest.fn(),
                        update: jest.fn(),
                    }
                },
                {
                    provide: RefreshSessionService,
                    useValue: {
                        new: jest.fn(),
                        constructor: jest.fn(),
                        create: jest.fn(),
                        update: jest.fn(),
                    }
                }
            ],
        }).compile();

        service = module.get<AuthService>(AuthService);
        users = module.get<UsersService>(UsersService);
        refreshSession = module.get<RefreshSessionService>(RefreshSessionService);
        jwt = module.get<JwtService>(JwtService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should authenticate a user', async () => {
        jest.spyOn(users, 'findByEmail')
            .mockReturnValue(new Promise((resolve) => resolve(oneUser as User)));
        jest.spyOn(refreshSession, 'create')
            .mockReturnValue(new Promise((resolve) => resolve({} as RefreshSession)));
        jest.spyOn(jwt, 'signAsync')
            .mockReturnValue(new Promise((resolve) => resolve('fake-token')));
        jest.spyOn(jwt, 'decode')
            .mockReturnValue(new Promise((resolve) => resolve({
                exp: 1234567890,
                iat: 1234567890,
            })));

        const result = await service.authenticate({
            email: 'ws@wxample.com',
            password: 'password', // password
        });

        expect(result).toEqual({
            ...{ refreshToken: 'fake-token' },
            ...{ accessToken: 'fake-token' },
            ...oneUser
        });
        expect(jwt.signAsync).toBeCalled();
        expect(jwt.decode).toBeCalled();
    });

    it('should logout a user', async () => {
        jest.spyOn(users, 'update')
            .mockReturnValue(new Promise((resolve) => resolve({} as User)));

        const result = await service.logout({} as User);

        expect(result).toBeUndefined();
        expect(users.update).toBeCalled();
    });
});
