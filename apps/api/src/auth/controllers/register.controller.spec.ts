import { Test, TestingModule } from '@nestjs/testing';
import { RegisterController } from './register.controller';
import { RegisterService } from '../services/register.service';
import { RegisterUserDto } from '../dto/register.dto';

const registerUserDto: RegisterUserDto = {
    name: 'John Doe',
    username: 'johndoe',
    email: 'john@example.com',
    password: 'secret'
};

describe('RegisterController', () => {
    let controller: RegisterController;
    let service: RegisterService;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [RegisterController],
            providers: [
                {
                    provide: RegisterService,
                    useValue: {
                        register: jest
                            .fn()
                            .mockImplementation((user: RegisterUserDto) =>
                                Promise.resolve({ id: '1', ...user }),
                            )
                    },
                },
            ],
        }).compile();

        controller = app.get<RegisterController>(RegisterController);
        service = app.get<RegisterService>(RegisterService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should register new user', () => {
        expect(controller.register(registerUserDto)).resolves.toEqual({
            id: '1',
            ...registerUserDto,
        });
        expect(service.register).toHaveBeenCalledWith(registerUserDto);
    });
});
