// dto/chat-ai.dto.ts
import { IsArray, IsEnum, IsNotEmpty, IsString } from "class-validator";

export enum Role {
  SYSTEM = "system",
  USER = "user",
  AI = "ai",
  ASSISTANT = "assistant"
}

export class InputMessage{

  @IsNotEmpty()
  @IsEnum(Role)
  role: Role

  @IsNotEmpty()
  @IsString()
  content: string

}

export class ChatAiDto {
  @IsArray()
  @IsNotEmpty()
  messages: InputMessage[]
}
