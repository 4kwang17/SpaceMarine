"use client";

import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

export function ClientClock() {
  const [time, setTime] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [timezone, setTimezone] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      
      // Get timezone
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      setTimezone(tz);
      
      // Format time (HH:MM:SS)
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");
      setTime(`${hours}:${minutes}:${seconds}`);
      
      // Format date (YYYY-MM-DD)
      const year = now.getFullYear();
      const month = (now.getMonth() + 1).toString().padStart(2, "0");
      const day = now.getDate().toString().padStart(2, "0");
      setDate(`${year}-${month}-${day}`);
    };

    // Update immediately
    updateTime();

    // Update every second
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-3 rounded-md bg-muted/50 border border-border">
      <div className="flex items-start gap-2">
        <Clock className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-foreground mb-1">현재 시간</p>
          <p className="text-sm font-mono text-foreground font-semibold">{time}</p>
          <p className="text-xs text-muted-foreground mt-1">{date}</p>
          <p className="text-xs text-muted-foreground mt-0.5 truncate" title={timezone}>
            {timezone}
          </p>
        </div>
      </div>
    </div>
  );
}
