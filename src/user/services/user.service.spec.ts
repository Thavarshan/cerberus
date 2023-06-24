import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepository } from '../repositories/user.repository';
import { User } from '../../interfaces/user/user';
import { Roles } from '../enums/roles.enum';

describe('UserService', () => {
    let service: UserService;
    let repository: UserRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: UserRepository,
                    useValue: {
                        new: jest.fn(),
                        constructor: jest.fn(),
                        findOne: jest.fn(),
                        create: jest.fn(),
                        findAll: jest.fn(),
                        update: jest.fn(),
                        delete: jest.fn(),
                        exec: jest.fn()
                    }
                }
            ],
        }).compile();

        service = module.get<UserService>(UserService);
        repository = module.get<UserRepository>(UserRepository);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should create a new user', async () => {
        const mockUser = {
            name: 'Wade Solman',
            email: 'ws@wxample.com',
            username: 'WadeSolman',
            password: '$2a$08$9qx5nogMjutjDU7PdyXO.eCjwWZuEs63Yx0iyCpIAKkOa5CIW4sKm', // password
            phone: '1234567890',
            team: 'fake-team-id',
            role: Roles.USER
        } as User;

        jest.spyOn(repository, 'create')
            .mockImplementationOnce(() =>
                Promise.resolve(mockUser),
            );

        const user = await service.create(mockUser);

        expect(user).toStrictEqual(mockUser);
    });
});
