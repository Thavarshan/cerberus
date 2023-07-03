export interface AppService {
    /**
     * Perform health check and log visitor IP address.
     *
     * @return  {Promise<any>}
     */
    getSystemStatus (): Promise<any>;
}
