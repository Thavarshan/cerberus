import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from '../dto/create-user.dto';
import { UsersController } from './users.controller';
import { UsersService } from '../services/users.service';

const createUserDto: CreateUserDto = {
    name: 'John Doe',
    username: 'johndoe',
    email: 'john@example.com',
    password: 'secret'
};

describe('UsersController', () => {
    let controller: UsersController;
    let service: UsersService;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [
                UsersService,
                {
                    provide: UsersService,
                    useValue: {
                        create: jest
                            .fn()
                            .mockImplementation((user: CreateUserDto) =>
                                Promise.resolve({ id: '1', ...user }),
                            ),
                        findAll: jest.fn().mockResolvedValue([
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
                        ]),
                        findOne: jest.fn().mockImplementation((id: string) =>
                            Promise.resolve({
                                name: 'John Doe',
                                username: 'johndoe',
                                email: 'john@example.com',
                                password: 'secret',
                                id,
                            }),
                        ),
                        remove: jest.fn(),
                    },
                },
            ],
        }).compile();

        controller = app.get<UsersController>(UsersController);
        service = app.get<UsersService>(UsersService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should create a user', () => {
        controller.create(createUserDto);
        expect(controller.create(createUserDto)).resolves.toEqual({
            id: '1',
            ...createUserDto,
        });
        expect(service.create).toHaveBeenCalledWith(createUserDto);
    });

    it('should find all users ', () => {
        controller.findAll();

        expect(service.findAll).toHaveBeenCalled();
    });

    it('should find a user', () => {
        expect(controller.findOne(1)).resolves.toEqual({
            name: 'John Doe',
            username: 'johndoe',
            email: 'john@example.com',
            password: 'secret',
            id: 1,
        });
        expect(service.findOne).toHaveBeenCalled();
    });

    it('should remove the user', () => {
        controller.remove(2);

        expect(service.remove).toHaveBeenCalled();
    });
});
