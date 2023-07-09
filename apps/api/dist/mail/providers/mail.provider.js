"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.providers = void 0;
const mail_1 = require("@sendgrid/mail");
const mail_config_1 = require("../../config/mail.config");
const mail_enum_1 = require("../enums/mail.enum");
exports.providers = [
    {
        provide: mail_enum_1.Mail.KEY,
        useFactory: (config) => {
            const mail = new mail_1.MailService();
            mail.setApiKey(config.apiKey);
            mail.setTimeout(5000);
            return mail;
        },
        inject: [mail_config_1.mailConfig.KEY],
    }
];
//# sourceMappingURL=mail.provider.js.map