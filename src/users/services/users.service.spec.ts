import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UsersService } from './users.service';
import { Repository } from 'typeorm';

const userArray = [
    {
        name: 'John Doe',
        username: 'johndoe',
        email: 'john@example.com',
        password: 'secret'
    },
    {
        name: 'Jane Doe',
        username: 'joanedoe',
        email: 'jane@example.com',
        password: 'secret'
    },
];

const oneUser = {
    name: 'John Doe',
    username: 'johndoe',
    email: 'john@example.com',
    password: 'secret'
};

describe('UsersService', () => {
    let service: UsersService;
    let repository: Repository<User>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsersService,
                {
                    provide: getRepositoryToken(User),
                    useValue: {
                        find: jest.fn().mockResolvedValue(userArray),
                        findOneBy: jest.fn().mockResolvedValue(oneUser),
                        save: jest.fn().mockResolvedValue(oneUser),
                        update: jest.fn(),
                        delete: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<UsersService>(UsersService);
        repository = module.get<Repository<User>>(getRepositoryToken(User));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should successfully create a user', () => {
        expect(service.create({
            name: 'John Doe',
            username: 'johndoe',
            email: 'john@example.com',
            password: 'secret'
        })).resolves.toEqual(oneUser);
    });

    it('should return an array of users', async () => {
        const users = await service.findAll();

        expect(users).toEqual(userArray);
    });

    it('should get a single user', () => {
        const repoSpy = jest.spyOn(repository, 'findOneBy');

        expect(service.findOne(1)).resolves.toEqual(oneUser);
        expect(repoSpy).toBeCalledWith({ id: 1 });
    });

    it('should call remove with the passed value', async () => {
        const removeSpy = jest.spyOn(repository, 'delete');
        const retVal = await service.remove(2);

        expect(removeSpy).toBeCalledWith(2);
        expect(retVal).toBeUndefined();
    });
});
