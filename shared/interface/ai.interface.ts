export interface KnowledgeAnalysis {
  knowledge_level: "none" | "basic" | "intermediate" | "advanced";
  has_base_gaps: boolean;
  current_knowledge: string;
  why_not_progressing: string;
  summary: string;
}