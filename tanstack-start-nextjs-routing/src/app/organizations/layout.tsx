import { Button } from "@/components/ui/button";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/organizations")({
  component: RouteComponent,
});

function RouteComponent() {
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
  return <Outlet />;
}
