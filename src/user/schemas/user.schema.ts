import {
    Schema,
    // SchemaTypes
} from 'mongoose';
import validator from 'validator';
import { hash } from 'bcrypt';
import { HookNextFunction } from '@/interfaces/database/hook.interface';
import { Roles } from '../enums/roles.enum';
import { User as UserInterface } from '@/interfaces/user/user';
import { uniqueNamesGenerator, Config, starWars } from 'unique-names-generator';
import slug from 'slug';

export const UserSchema = new Schema<UserInterface>({
    name: {
        type: String,
        minlength: 6,
        maxlength: 255,
        required: [true, 'NAME_IS_BLANK'],
    },

    username: {
        type: String,
        minlength: 3,
        maxlength: 255,
        required: false,
    },

    email: {
        type: String,
        lowercase: true,
        validate: validator.isEmail,
        maxlength: 255,
        minlength: 6,
        required: [true, 'EMAIL_IS_BLANK'],
    },

    password: {
        type: String,
        minlength: 5,
        maxlength: 1024,
        required: [true, 'PASSWORD_IS_BLANK'],
    },

    phone: {
        type: String,
        minlength: 11,
        maxlength: 11,
        required: false
    },

    role: {
        type: String,
        enum: Roles,
        default: Roles.USER,
        required: [true, 'ROLE_IS_BLANK']
    },

    verified: {
        type: Boolean,
        default: false,
    },

    blockedAt: {
        required: false,
        type: Date,
        default: undefined,
    },

    // team: {
    //     type: SchemaTypes.ObjectId,
    //     ref: 'Team',
    //     required: false
    // },
}, {
    versionKey: false,
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});

export const preSaveHook = async function (next: HookNextFunction) {
    try {
        if (this.isModified('name')) {
            this.set('username', slug(uniqueNamesGenerator({
                dictionaries: [starWars]
            } as Config)));
        }

        if (this.isModified('password')) {
            this.set('password', await hash(this.password, 12));
        }

        return next();
    } catch (error) {
        return next(error);
    }
};

UserSchema.pre<UserInterface>('save', preSaveHook);
