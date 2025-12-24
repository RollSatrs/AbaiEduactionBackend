// dto/chat-ai.dto.ts
import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class ChatAiDto {
  @IsArray()
  @IsNotEmpty()
  messages: { role: "user" | "ai"; text: string }[];
}
