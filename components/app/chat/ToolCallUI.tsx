"use client";

import type { ToolCallPart } from "./types";
import { Card } from "@/components/ui/card";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

interface ToolCallUIProps {
  toolPart: ToolCallPart;
  closeChat: () => void;
}

export function ToolCallUI({ toolPart, closeChat }: ToolCallUIProps) {
  const getStatusIcon = () => {
    switch (toolPart.state) {
      case "pending":
      case "submitted":
        return <Loader2 className="h-4 w-4 animate-spin text-primary" />;
      case "result":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <Card className="border-l-2 border-l-primary bg-muted/50 p-3">
      <div className="flex items-start gap-2">
        {getStatusIcon()}
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium capitalize text-foreground">
            {toolPart.toolName}
          </p>
          {toolPart.state === "pending" && (
            <p className="text-xs text-muted-foreground mt-1">Processing...</p>
          )}
          {toolPart.result && (
            <p className="text-xs text-muted-foreground mt-1 truncate">
              {JSON.stringify(toolPart.result).substring(0, 100)}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}
