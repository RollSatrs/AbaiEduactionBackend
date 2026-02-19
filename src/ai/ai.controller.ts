import { Body, Controller, Post } from '@nestjs/common';
import { AiService } from './ai.service';
import { ChatAiDto } from './dto/chat-ai.dto';
import { KnowledgeAnalysis } from 'shared/interface/ai.interface';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('chat')
  async analyze(@Body() dto: ChatAiDto): Promise<{result: KnowledgeAnalysis}> {
    const result = await this.aiService.analyzeKnowledge(dto.messages);
    return { result };
  }

  
}
