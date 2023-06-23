import { Inject, Injectable } from '@nestjs/common';
import { MailService as Sendgrid, MailDataRequired } from '@sendgrid/mail';
import { Mail } from '../enums/mail.enum';

@Injectable()
export class MailService {
    /**
     * Create new instance of MailService
     *
     * @param mail {Sendgrid}
     *
     * @return {void}
     */
    constructor (
        @Inject(Mail.KEY) protected readonly mail: Sendgrid
    ) { }

    /**
     * Execute the process of sending an email
     *
     * @param data {MailDataRequired}
     *
     * @return {Promise<any>}
     */
    public async send (data: MailDataRequired): Promise<any> {
        return await this.mail.send(data, false);
    }
}
