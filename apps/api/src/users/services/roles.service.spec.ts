import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Role } from '../entities/role.entity';
import { RolesService } from './roles.service';
import { Repository } from 'typeorm';
import { Role as RoleEnum } from '../enums/role.enum';

const roleArray = [
    {
        name: RoleEnum.CUSTOMER,
        slug: 'fake-slug-12938723-1'
    },
    {
        name: RoleEnum.ADMIN,
        slug: 'fake-slug-12938723-2'
    },
];

const oneRole = {
    name: RoleEnum.USER,
    slug: 'fake-slug-12938723-3'
};

describe('RolesService', () => {
    let service: RolesService;
    let repository: Repository<Role>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                RolesService,
                {
                    provide: getRepositoryToken(Role),
                    useValue: {
                        find: jest.fn().mockResolvedValue(roleArray),
                        findOneBy: jest.fn().mockResolvedValue(oneRole),
                        save: jest.fn().mockResolvedValue(oneRole),
                        update: jest.fn(),
                        delete: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<RolesService>(RolesService);
        repository = module.get<Repository<Role>>(getRepositoryToken(Role));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should successfully create a role', () => {
        const repoSpy = jest.spyOn(repository, 'findOneBy')
            .mockReturnValue(new Promise((resolve) => resolve(undefined)));

        expect(service.create({
            name: RoleEnum.USER,
            slug: 'fake-slug-12938723-3'
        })).resolves.toEqual(oneRole);

        expect(repoSpy).toBeCalled();
    });

    it('should return an array of roles', async () => {
        const roles = await service.findAll();

        expect(roles).toEqual(roleArray);
    });

    it('should get a single role', () => {
        const repoSpy = jest.spyOn(repository, 'findOneBy');

        expect(service.findOne(1)).resolves.toEqual(oneRole);
        expect(repoSpy).toBeCalledWith({ id: 1 });
    });

    it('should call update with the passed value', async () => {
        oneRole['id'] = 2;
        const findOneSpy = jest.spyOn(repository, 'findOneBy')
            .mockReturnValue(new Promise((resolve) => resolve(oneRole as any)));
        const updateSpy = jest.spyOn(repository, 'update')
            .mockReturnValue(new Promise((resolve) => (resolve(oneRole as any))));
        const retVal = await service.update(2, { name: RoleEnum.USER });

        expect(findOneSpy).toBeCalledWith({ id: 2 });
        expect(updateSpy).toBeCalledWith(2, { name: RoleEnum.USER });
        expect(retVal).toEqual(oneRole);
    });

    it('should call remove with the passed value', async () => {
        const findOneSpy = jest.spyOn(repository, 'findOneBy')
            .mockReturnValue(new Promise((resolve) => resolve({ id: 2 } as any)));
        const removeSpy = jest.spyOn(repository, 'delete');
        const retVal = await service.delete(2);

        expect(findOneSpy).toBeCalledWith({ id: 2 });
        expect(removeSpy).toBeCalledWith(2);
        expect(retVal).toBeUndefined();
    });
});
