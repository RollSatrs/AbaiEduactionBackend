import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { prontOne, systemCoachPrompt } from 'shared/constants/pronts';
import { ChatAiDto, InputMessage, Role } from './dto/chat-ai.dto';
import { response } from 'express';
import { KnowledgeAnalysis } from 'shared/interface/ai.interface';

@Injectable()
export class AiService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({ apiKey: process.env.OPENAI_API });
  }

  async analyzeKnowledge(messages: InputMessage[]): Promise<KnowledgeAnalysis> {
    const openaiMessages: { role: "system" | "user" | "assistant"; content: string }[] =
      [
        { role: "system", content: prontOne },
        ...messages.map(m => ({
          role: (m.role === "user" ? "user" : "assistant") as "user" | "assistant",
          content: m.content
        }))
      ];

    const response = await this.openai.chat.completions.create({
      model: "chatgpt-4o-latest",
      messages: openaiMessages
    });

    const text =  response.choices[0].message?.content ?? "Ошибка";

    try{
      const json = JSON.parse(text)
      return json as KnowledgeAnalysis
    }catch(err){
      console.error("Ошибка при парсинге JSON от ИИ:", text);
      throw new Error("ИИ вернул некорректный JSON");
    }


  }
}
