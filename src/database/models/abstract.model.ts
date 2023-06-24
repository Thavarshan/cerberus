import { Model as BaseModel, Schema } from 'mongoose';
import { DB } from '@/database/enums/db.enum';
import { MongoDb } from '@/database/connections/mongodb.connection';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export abstract class AbstractModel<T> {
    /**
     * The table associated with the model.
     *
     * @var {string}
     */
    protected readonly table: string = '';

    /**
     * Create a new Model instance.
     *
     * @param {MongoDb} connection
     * @param {Schema} schema
     *
     * @return  {void}
     */
    constructor (
        @Inject(DB.KEY) protected connection: MongoDb,
        protected schema: Schema
    ) { }

    /**
     * Initialize a usable state of the model.
     *
     * @return  {BaseModel<T>}
     */
    public newInstance (): BaseModel<T> {
        return this.connection.model<T>(
            this.constructor.name,
            this.schema,
            this.table
        );
    }
}
