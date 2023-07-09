"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailModule = void 0;
const common_1 = require("@nestjs/common");
const mail_provider_1 = require("./providers/mail.provider");
const mail_service_1 = require("./services/mail.service");
const config_1 = require("@nestjs/config");
const mail_config_1 = require("../config/mail.config");
let MailModule = exports.MailModule = class MailModule {
};
exports.MailModule = MailModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule.forFeature(mail_config_1.mailConfig)],
        providers: [...mail_provider_1.providers, mail_service_1.MailService],
        exports: [...mail_provider_1.providers, mail_service_1.MailService]
    })
], MailModule);
//# sourceMappingURL=mail.module.js.map