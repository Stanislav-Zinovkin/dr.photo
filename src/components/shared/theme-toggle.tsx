"use client"

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/providers/theme-provider";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
    const { resolvedTheme, setTheme } = useTheme();
    const [ mounted, setMounted] = React.useState(false);

    //prevent hydration by waiting until component mounts on cli.
    React.useEffect(() => {
      setMounted(true);
    }, []);

    return (
        <Button 
          variant="ghost"
          size="icon"
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          aria-label="Toggle theme">
            <Sun className={`h-5 w-5 transition-all ${mounted && resolvedTheme === "dark" ? "-rotate-90 scale-0" : "rotate-0 scale-100"}`} />
            <Moon className={`absolute h-5 w-5 transition-all ${mounted && resolvedTheme === "dark" ? "rotate-0 scale-100" : "rotate-90 scale-0"}`} />
          </Button>
    );
}