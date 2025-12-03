"use client";
import { Button } from "@/components/ui/button";
import { ReactNode, useState } from "react";

export default function RouteComponent({ children }: { children: ReactNode }) {
  const [confimed, setConfirmed] = useState(false);
  if (!confimed)
    return (
      <div className="p-4 space-y-2">
        <p className="font-semibold">Warning</p>
        <p>
          Changes made in <b>Organizations</b> cannot be undone.
        </p>
        <p>
          By continuing, you agree to proceed with caution and understand the
          consequences of these changes.
        </p>
        <Button onClick={() => setConfirmed(true)}>Confirm</Button>
      </div>
    );
  return children;
}
