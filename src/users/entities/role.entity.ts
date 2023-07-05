import { Index, Column, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate, OneToMany, Entity } from 'typeorm';
import { Role as RoleInterface } from '@/interfaces/users/role.entity';
import slugify from 'slugify';
import _ from 'lodash';
import { User } from './user.entity';
import { Roles } from '../enums/roles.enum';

@Entity({ name: 'roles' })
export class Role implements RoleInterface {
    @PrimaryGeneratedColumn()
    public readonly id: number;

    @Index('idx_name')
    @Column({
        name: 'name',
        type: 'enum',
        nullable: false,
        unique: true,
        enum: Roles,
        default: Roles.USER
    })
    public name: string;

    @Index('idx_description')
    @Column({ name: 'description', type: 'varchar', nullable: true })
    public description: string;

    @Index('idx_slug')
    @Column({
        name: 'slug',
        type: 'varchar',
        nullable: false,
        unique: true
    })
    public slug: string;

    @OneToMany(() => User, user => user.sessions, { onDelete: 'CASCADE' })
    public users: Partial<User>[];

    @BeforeInsert()
    @BeforeUpdate()
    protected generateSlug (): void {
        this.slug = _.uniqueId(slugify(this.name, { lower: true }));
    }
}
