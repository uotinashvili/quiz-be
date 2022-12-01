import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { QuizService } from './quiz.service';

@WebSocketGateway({ cors: true })
export class QuizGateway implements OnGatewayConnection, OnGatewayDisconnect {

  constructor(private readonly _quizService: QuizService) {}
  @WebSocketServer() server;
  clients: any[] = [];

  async handleConnection(client: any) {
    this.clients.push(client);
  }
  
  async handleDisconnect(client: any) {
    const existingClient = this.clients.find(x => x == client);
    
    if (existingClient) {
      const index = this.clients.indexOf(existingClient);
      this.clients.splice(index, 1);
    }
  }

  private sendMessageToAllClients(event: string, message: any) {
    const broadCastMessage = JSON.stringify(message);
    for (let c of this.clients) {
      c.emit(event, broadCastMessage);
      // this.server.emit('refreshQuizList', message);
    }
  }
  
  @SubscribeMessage('onCreateQuiz')
  async onCreateQuiz(client, message) {
    const getAllQuizes = await this._quizService.getAllQuizes();
    this.sendMessageToAllClients('refreshQuizList', getAllQuizes)
  }

  @SubscribeMessage('onSendResults')
  async onSendResults(client, message) {
    this.sendMessageToAllClients('refreshResults', true)
  }
}
