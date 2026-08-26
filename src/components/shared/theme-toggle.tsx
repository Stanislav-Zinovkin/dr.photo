"use client"

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { size } from "zod/v4";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [ mounted, setMounted] = React.useState(false);

    //prevent hydration by waiting until component mounts on cli.
    React.useEffect(() => {
      setMounted(true);
    }, []);
    if (!mounted) {
      return (
        <Button variant="ghost" size="icon" disabled aria-label="Toggle theme">
          <Sun className="h-5 w-5 opacity-0"/>
        </Button>
      )
    }
  

    return (
        <Button 
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          aria-label="Toggle theme">
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"/>
            <Moon className="h-5 w-5 rotate-90 absolute scale-0 transition-all dark:rotate-0 dark:scale-100"/>
          </Button>
    );
}