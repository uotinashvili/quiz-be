import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
export declare class QuizGateway implements OnGatewayConnection, OnGatewayDisconnect {
    server: any;
    users: number;
    handleConnection(): Promise<void>;
    handleDisconnect(): Promise<void>;
    onChat(client: any, message: any): Promise<void>;
}
