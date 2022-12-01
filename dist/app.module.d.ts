import { MiddlewareConsumer } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
export declare class AppModule {
    private _configService;
    constructor(_configService: ConfigService);
    configure(consumer: MiddlewareConsumer): void;
}
