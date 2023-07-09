import { Repository } from 'typeorm';
import { CreateRefreshSessionDto } from '../dto/create-refresh-session.dto';
import { UpdateRefreshSessionDto } from '../dto/update-refresh-session.dto';
import { RefreshSession } from '../entities/refresh-session.entity';
import { RefreshSession as RefreshSessionInterface } from '@/interfaces/auth/refresh-session.entity';
export declare class RefreshSessionService {
    protected repository: Repository<RefreshSession>;
    constructor(repository: Repository<RefreshSession>);
    create(dto: CreateRefreshSessionDto): Promise<RefreshSession>;
    findOne(id: number): Promise<RefreshSessionInterface>;
    findByRefreshToken(refreshToken: string): Promise<RefreshSessionInterface>;
    update(id: number, dto: UpdateRefreshSessionDto): Promise<RefreshSessionInterface>;
}
//# sourceMappingURL=refresh-session.service.d.ts.map