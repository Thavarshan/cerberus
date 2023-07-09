import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRefreshSessionDto } from '../dto/create-refresh-session.dto';
import { UpdateRefreshSessionDto } from '../dto/update-refresh-session.dto';
import { RefreshSession } from '../entities/refresh-session.entity';
import { RefreshSession as RefreshSessionInterface } from '@/interfaces/auth/refresh-session.entity';

export class RefreshSessionService {
    /**
     * Create new RefreshSessionService instance.
     *
     * @param {Repository<RefreshSession>} repository
     *
     * @returns {void}
     */
    constructor (
        @InjectRepository(RefreshSession)
        protected repository: Repository<RefreshSession>
    ) { }

    /**
     * Create new refresh session.
     *
     * @param {CreateRefreshSessionDto} dto
     *
     * @returns {Promise<RefreshSession>}
     */
    public async create (
        dto: CreateRefreshSessionDto
    ): Promise<RefreshSession> {
        return await this.repository.save(dto);
    }

    /**
     * Query the database for a session with the given id.
     *
     * @param {number} id
     *
     * @returns {Promise<RefreshSessionInterface>}
     */
    public async findOne (id: number): Promise<RefreshSessionInterface> {
        const session = await this.repository.findOneBy({ id });

        if (session === null) {
            throw new NotFoundException(`User with id [${id}] not found.`);
        }

        return session;
    }

    /**
     * Find refresh session by refresh token.
     *
     * @param {string} refreshToken
     *
     * @returns {Promise<RefreshSessionInterface>}
     */
    public async findByRefreshToken (
        refreshToken: string
    ): Promise<RefreshSessionInterface> {
        return await this.repository.findOneBy({ refreshToken });
    }

    /**
     * Find the session with the given id and update the details of the session.
     *
     * @param {number} id
     * @param {UpdateRefreshSessionDto} dto
     *
     * @returns {Promise<RefreshSessionInterface>}
     */
    public async update (
        id: number,
        dto: UpdateRefreshSessionDto
    ): Promise<RefreshSessionInterface> {
        const session = await this.findOne(id);

        await this.repository.update(session.id, dto);

        return session;
    }
}
