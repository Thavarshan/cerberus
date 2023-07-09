import { MailService as Sendgrid, MailDataRequired } from '@sendgrid/mail';
export declare class MailService {
    protected readonly mail: Sendgrid;
    constructor(mail: Sendgrid);
    send(data: MailDataRequired): Promise<any>;
}
//# sourceMappingURL=mail.service.d.ts.map