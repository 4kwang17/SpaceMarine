"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { login, signUp } from "@/lib/auth";
import { AlertCircle, CheckCircle2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("login");
  
  // Login state
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  
  // Sign up state
  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState("");
  const [signUpError, setSignUpError] = useState("");
  const [signUpSuccess, setSignUpSuccess] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    
    const result = login(loginUsername, loginPassword);
    if (result.success) {
      router.push("/");
    } else {
      setLoginError(result.message || "로그인에 실패했습니다.");
    }
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setSignUpError("");
    setSignUpSuccess("");

    // Validate password confirmation
    if (signUpPassword !== signUpConfirmPassword) {
      setSignUpError("비밀번호가 일치하지 않습니다.");
      return;
    }

    const result = signUp(signUpUsername, signUpPassword, signUpEmail);
    if (result.success) {
      setSignUpSuccess(result.message || "회원가입이 완료되었습니다.");
      // Clear form
      setSignUpUsername("");
      setSignUpEmail("");
      setSignUpPassword("");
      setSignUpConfirmPassword("");
      // Switch to login tab after 2 seconds
      setTimeout(() => {
        setActiveTab("login");
        setLoginUsername(signUpUsername);
      }, 2000);
    } else {
      setSignUpError(result.message || "회원가입에 실패했습니다.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6 rounded-lg bg-card p-8 shadow-lg border border-border">
        <div className="flex justify-end">
          <ThemeToggle />
        </div>
        
        <div>
          <h1 className="text-center text-3xl font-bold text-foreground">
            Space Marine
          </h1>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            제품 카탈로그 시스템
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">로그인</TabsTrigger>
            <TabsTrigger value="signup">회원가입</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4 mt-6">
            <form onSubmit={handleLogin} className="space-y-4">
              {loginError && (
                <div className="flex items-center gap-2 p-3 rounded-md bg-destructive/10 text-destructive text-sm border border-destructive/20">
                  <AlertCircle className="h-4 w-4" />
                  <span>{loginError}</span>
                </div>
              )}
              
              <div>
                <label htmlFor="login-username" className="block text-sm font-medium text-foreground mb-1">
                  사용자명
                </label>
                <Input
                  id="login-username"
                  name="username"
                  type="text"
                  required
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  placeholder="사용자명을 입력하세요"
                />
              </div>
              
              <div>
                <label htmlFor="login-password" className="block text-sm font-medium text-foreground mb-1">
                  비밀번호
                </label>
                <Input
                  id="login-password"
                  name="password"
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="비밀번호를 입력하세요"
                />
              </div>
              
              <Button type="submit" className="w-full" size="lg">
                로그인
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="signup" className="space-y-4 mt-6">
            <form onSubmit={handleSignUp} className="space-y-4">
              {signUpError && (
                <div className="flex items-center gap-2 p-3 rounded-md bg-destructive/10 text-destructive text-sm border border-destructive/20">
                  <AlertCircle className="h-4 w-4" />
                  <span>{signUpError}</span>
                </div>
              )}
              
              {signUpSuccess && (
                <div className="flex items-center gap-2 p-3 rounded-md bg-green-500/10 text-green-600 dark:text-green-400 text-sm border border-green-500/20">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>{signUpSuccess}</span>
                </div>
              )}
              
              <div>
                <label htmlFor="signup-username" className="block text-sm font-medium text-foreground mb-1">
                  사용자명 <span className="text-muted-foreground">(최소 3자)</span>
                </label>
                <Input
                  id="signup-username"
                  name="username"
                  type="text"
                  required
                  minLength={3}
                  value={signUpUsername}
                  onChange={(e) => setSignUpUsername(e.target.value)}
                  placeholder="사용자명을 입력하세요"
                />
              </div>
              
              <div>
                <label htmlFor="signup-email" className="block text-sm font-medium text-foreground mb-1">
                  이메일
                </label>
                <Input
                  id="signup-email"
                  name="email"
                  type="email"
                  required
                  value={signUpEmail}
                  onChange={(e) => setSignUpEmail(e.target.value)}
                  placeholder="이메일을 입력하세요"
                />
              </div>
              
              <div>
                <label htmlFor="signup-password" className="block text-sm font-medium text-foreground mb-1">
                  비밀번호 <span className="text-muted-foreground">(최소 6자)</span>
                </label>
                <Input
                  id="signup-password"
                  name="password"
                  type="password"
                  required
                  minLength={6}
                  value={signUpPassword}
                  onChange={(e) => setSignUpPassword(e.target.value)}
                  placeholder="비밀번호를 입력하세요"
                />
              </div>
              
              <div>
                <label htmlFor="signup-confirm-password" className="block text-sm font-medium text-foreground mb-1">
                  비밀번호 확인
                </label>
                <Input
                  id="signup-confirm-password"
                  name="confirmPassword"
                  type="password"
                  required
                  value={signUpConfirmPassword}
                  onChange={(e) => setSignUpConfirmPassword(e.target.value)}
                  placeholder="비밀번호를 다시 입력하세요"
                />
              </div>
              
              <Button type="submit" className="w-full" size="lg">
                회원가입
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
