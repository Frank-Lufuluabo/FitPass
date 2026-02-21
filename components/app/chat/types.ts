export interface ToolCallPart {
  type: string;
  toolName?: string;
  toolCallId?: string;
  state: "pending" | "submitted" | "result" | "error";
  input?: Record<string, unknown>;
  args?: Record<string, unknown>;
  output?: unknown;
  result?: unknown;
}
