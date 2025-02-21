"use client";

import { Form } from "@remix-run/react";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { LogOut } from "lucide-react";

function LogOutButton() {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Form method="post">
            <Button variant="default" size="icon" aria-label="Add new item">
              <LogOut size={16} strokeWidth={2} aria-hidden="true" />
            </Button>
          </Form>
        </TooltipTrigger>
        <TooltipContent className="px-2 py-1 text-xs">Log Out</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export { LogOutButton };
