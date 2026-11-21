import type { Database } from "@/integrations/supabase/types";

type T = Database["public"]["Tables"];
export type Client = T["clients"]["Row"];
export type Process = T["processes"]["Row"];
export type Clarification = T["clarifications"]["Row"];
export type Skill = T["skills"]["Row"];
export type ProcessSkill = T["process_skills"]["Row"];
export type PNode = T["process_nodes"]["Row"];
export type PEdge = T["process_edges"]["Row"];
export type ChatMessage = T["chat_messages"]["Row"];
export type RoundUp = T["round_up_solutions"]["Row"];
export type ActionType = Database["public"]["Enums"]["action_type"];
export type ColorCode = Database["public"]["Enums"]["color_code"];

export type Actor = { name: string; role?: string; hourly_rate_loaded: number; department?: string };
export type Tool = { name: string; category?: string; monthly_cost: number; is_silo?: boolean };
export type CostDriver = { driver_name: string; unit?: string; frequency?: string };
export type NodeMeta = { ref?: string; tag?: string; display?: string; note?: string; source_quote?: string; explanation?: string };
export type Phase = { phase: number; title: string; steps?: string[] };
export type TraceAction = {
  title: string;
  node_id: string | null;
  chat_message_id: string | null;
  citation: string;
  rule?: string;
  owner?: string;
  tools?: string;
  confidence?: number;
};
