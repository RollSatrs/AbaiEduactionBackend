import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { systemCoachPrompt } from 'shared/constants/pronts';

@Injectable()
export class AiService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({ apiKey: process.env.OPENAI_API });
  }

  async chat(messages: { role: "user" | "ai"; text: string }[]): Promise<string> {
    // Преобразуем роли в формат OpenAI
    const openaiMessages: { role: "system" | "user" | "assistant"; content: string }[] =
      [
        { role: "system", content: systemCoachPrompt },
        ...messages.map(m => ({
          // Явно приводим тип к "user" | "assistant"
          role: (m.role === "user" ? "user" : "assistant") as "user" | "assistant",
          content: m.text
        }))
      ];

    const response = await this.openai.chat.completions.create({
      model: "chatgpt-4o-latest",
      messages: openaiMessages
    });

    return response.choices[0].message?.content ?? "Ошибка";
  }
}
