import { Filter } from '@/shared/filter';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../entities/user.entity';

export const UserQuery = createParamDecorator((
    data: string,
    ctx: ExecutionContext
) => {
    const request = ctx.switchToHttp().getRequest();
    const query = Filter.getQueryFilters(request.query, User.filterKeys);

    return data ? query?.[data] : query;
});

