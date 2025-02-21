import { ChevronLeft } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "@remix-run/react";

function GoBack() {
  const navigation = useNavigate();
  return (
    <Button variant="link" className="p-4 h-16" onClick={() => navigation("/")}>
      <ChevronLeft
        className="me-1 opacity-60"
        size={16}
        strokeWidth={2}
        aria-hidden="true"
      />
      Go Home
    </Button>
  );
}

export { GoBack };
