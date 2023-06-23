import { Model } from '../models/model.model';

type T = any;

export abstract class Service {
    /**
     * The model that this service will use.
     *
     * @var {Model}
     */
    protected model: Model<T>;

    /**
     * Create a new service instance.
     *
     * @return {Model}
     */
    public getModel (): Model<T> {
        return this.model;
    }
}
