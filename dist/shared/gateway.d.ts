import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
export declare class Gateway implements OnGatewayConnection, OnGatewayDisconnect {
    server: any;
    users: number;
    handleConnection(): Promise<void>;
    handleDisconnect(): Promise<void>;
}
