import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const RefreshToken = createParamDecorator(
    (context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest();

        return request.body['refresh_token'];
    },
);
