import { Test, TestingModule } from '@nestjs/testing';
import { MailService as Sendgrid } from '@sendgrid/mail';
import { Mail } from '../enums/mail.enum';
import { MailService } from './mail.service';

describe('MailService', () => {
    let mail: Sendgrid;
    let service: MailService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MailService,
                {
                    provide: Mail.KEY,
                    useValue: {
                        send: jest.fn(),
                    },
                },
            ],
        }).compile();

        mail = module.get<Sendgrid>(Mail.KEY);
        service = module.get<MailService>(MailService);
    });

    it('should be defined', () => {
        expect(mail).toBeDefined();
    });

    it('MailService should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should call MailService.send', async () => {
        const msg = {
            to: 'test@example.com',
            from: 'test@example.com',
            subject: 'Sending with Twilio SendGrid is Fun',
            text: 'and easy to do anywhere, even with Node.js',
            html: '<strong>and easy to do anywhere, even with Node.js</strong>',
        };

        const sendSpy = jest.spyOn(mail, 'send')
            .mockResolvedValue({} as any);

        await service.send(msg);

        expect(sendSpy).toBeCalledTimes(1);
        expect(sendSpy).toBeCalledWith(msg, false);
    });
});
