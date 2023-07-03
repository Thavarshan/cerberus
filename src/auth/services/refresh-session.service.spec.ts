import { Test, TestingModule } from '@nestjs/testing';
import { User } from '@/interfaces/users/user.entity';
import { RefreshSessionService } from './refresh-session.service';
import { RefreshSession } from '../entities/refresh-session.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

const refreshSession = {
    id: 1,
    user: 'user-id-1',
    refreshToken: 'refresh-token-1',
    expiresIn: 1234567890,
    createdAt: new Date(),
};

describe('RefreshSessionService', () => {
    let service: RefreshSessionService;
    let repository: Repository<RefreshSession>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                RefreshSessionService,
                {
                    provide: getRepositoryToken(RefreshSession),
                    useValue: {
                        findOneBy: jest.fn().mockResolvedValue(refreshSession),
                        save: jest.fn().mockResolvedValue(refreshSession),
                        update: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<RefreshSessionService>(RefreshSessionService);
        repository = module.get<Repository<RefreshSession>>(getRepositoryToken(RefreshSession));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should successfully create a refresh session', () => {
        expect(service.create({
            user: 'user-id-1' as Partial<User>,
            refreshToken: 'refresh-token-1',
            expiresIn: 1234567890,
            createdAt: 1234567890,
        })).resolves.toEqual(refreshSession);
    });

    it('should get a single refresh session', () => {
        const repoSpy = jest.spyOn(repository, 'findOneBy');

        expect(service.findOne(1)).resolves.toEqual(refreshSession);
        expect(repoSpy).toBeCalledWith({ id: 1 });
    });

    it('should call update with the passed value', async () => {
        refreshSession['id'] = 2;
        const findOneSpy = jest.spyOn(repository, 'findOneBy')
            .mockReturnValue(new Promise((resolve) => resolve(refreshSession as any)));
        const updateSpy = jest.spyOn(repository, 'update')
            .mockReturnValue(new Promise((resolve) => (resolve(refreshSession as any))));
        const retVal = await service.update(2, { refreshToken: 'fake-rf-token' });

        expect(findOneSpy).toBeCalledWith({ id: 2 });
        expect(updateSpy).toBeCalledWith(2, { refreshToken: 'fake-rf-token' });
        expect(retVal).toEqual(refreshSession);
    });
});
