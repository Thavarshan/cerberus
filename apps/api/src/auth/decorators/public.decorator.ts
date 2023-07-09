import { SetMetadata } from '@nestjs/common';
import { Auth } from '../enums/auth.enum';

export const Public = () => SetMetadata(Auth.IS_PUBLIC_KEY, true);
