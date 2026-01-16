"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple authentication - in production, use proper auth
    if (username && password) {
      // Store auth state (in production, use proper session management)
      localStorage.setItem("authenticated", "true");
      router.push("/");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-card p-8 shadow-lg border border-border">
        <div className="flex justify-end">
          <ThemeToggle />
        </div>
        <div>
          <h2 className="text-center text-3xl font-bold text-foreground">
            로그인
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Space Marine 시스템에 로그인하세요
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-foreground">
                사용자명
              </label>
              <Input
                id="username"
                name="username"
                type="text"
                required
                className="mt-1"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="사용자명을 입력하세요"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground">
                비밀번호
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                className="mt-1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력하세요"
              />
            </div>
          </div>
          <div>
            <Button type="submit" className="w-full" size="lg">
              로그인
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
