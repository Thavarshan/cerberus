import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    /**
     * Get system status usually for a ping response.
     *
     * @returns {Promise<string>}
     */
    public async getSystemStatus (): Promise<string> {
        return 'System OK!';
    }
}
