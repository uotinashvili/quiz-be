import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { QuizService } from './quiz.service';
export declare class QuizGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly _quizService;
    constructor(_quizService: QuizService);
    server: any;
    clients: any[];
    handleConnection(client: any): Promise<void>;
    handleDisconnect(client: any): Promise<void>;
    private sendMessageToAllClients;
    onCreateQuiz(client: any, message: any): Promise<void>;
    onSendResults(client: any, message: any): Promise<void>;
}
