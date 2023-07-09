export interface Connection {
    /**
     * Create a usable Database Connection instance.
     *
     * @return  {Promise<Connection>}
     */
    make (): Promise<Connection>;
}
