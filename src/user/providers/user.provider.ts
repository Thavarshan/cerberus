import { DB } from '@/database/enums/db.enum';
import { MongoDb } from '@/database/connections/mongodb.connection';
import { UserSchema } from '@/user/schemas/user.schema';
import { User as UserEnum } from '@/user/enums/user.enum';
import { Provider } from '@nestjs/common';
import { User } from '../models/user.model';

export const providers: Provider[] = [
    {
        provide: UserEnum.MODEL,

        useFactory: (connection: MongoDb) => {
            const model = new User(connection, UserSchema);

            return model.newInstance();
        },

        inject: [DB.KEY],
    }
];

