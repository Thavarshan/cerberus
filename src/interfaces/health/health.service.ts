export interface HealthService {
    /**
     * Check the health of the application.
     *
     * @returns {Promise<any>}
     */
    check (): Promise<any>;
}
