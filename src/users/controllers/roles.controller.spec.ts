import { Test, TestingModule } from '@nestjs/testing';
import { CreateRoleDto } from '../dto/create-role.dto';
import { RolesController } from './roles.controller';
import { RolesService } from '../services/roles.service';
import { Roles } from '../enums/roles.enum';

const createRoleDto: CreateRoleDto = {
    name: Roles.USER,
    slug: 'fake-slug-12938723-3'
};

describe('RolesController', () => {
    let controller: RolesController;
    let service: RolesService;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [RolesController],
            providers: [
                RolesService,
                {
                    provide: RolesService,
                    useValue: {
                        create: jest
                            .fn()
                            .mockImplementation((role: CreateRoleDto) =>
                                Promise.resolve({ id: 1, ...role }),
                            ),
                        findAll: jest.fn().mockResolvedValue([
                            {
                                name: Roles.CUSTOMER,
                                slug: 'fake-slug-12938723-1'
                            },
                            {
                                name: Roles.ADMIN,
                                slug: 'fake-slug-12938723-2'
                            },
                        ]),
                        findOne: jest.fn().mockImplementation((id: string) =>
                            Promise.resolve({
                                name: Roles.USER,
                                slug: 'fake-slug-12938723-3',
                                id,
                            }),
                        ),
                        delete: jest.fn(),
                    },
                },
            ],
        }).compile();

        controller = app.get<RolesController>(RolesController);
        service = app.get<RolesService>(RolesService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should create a role', () => {
        controller.create(createRoleDto);
        expect(controller.create(createRoleDto)).resolves.toEqual({
            id: 1,
            ...createRoleDto,
        });
        expect(service.create).toHaveBeenCalledWith(createRoleDto);
    });

    it('should find all roles', () => {
        controller.findAll();

        expect(service.findAll).toHaveBeenCalled();
    });

    it('should find a role', () => {
        expect(controller.findOne(1)).resolves.toEqual({
            name: Roles.USER,
            slug: 'fake-slug-12938723-3',
            id: 1,
        });
        expect(service.findOne).toHaveBeenCalled();
    });

    it('should remove the role', () => {
        controller.delete(2);

        expect(service.delete).toHaveBeenCalled();
    });
});
