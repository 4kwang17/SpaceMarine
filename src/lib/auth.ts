export interface User {
  username: string;
  email: string;
  createdAt: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  user?: User;
}

// Simple authentication utilities
// In production, use proper backend authentication with JWT tokens, sessions, etc.

const USERS_STORAGE_KEY = "space_marine_users";
const CURRENT_USER_KEY = "space_marine_current_user";
const AUTH_TOKEN_KEY = "space_marine_auth_token";

export function getStoredUsers(): { [username: string]: { password: string; email: string; createdAt: string } } {
  if (typeof window === "undefined") return {};
  const stored = localStorage.getItem(USERS_STORAGE_KEY);
  return stored ? JSON.parse(stored) : {};
}

export function storeUser(username: string, password: string, email: string): void {
  if (typeof window === "undefined") return;
  const users = getStoredUsers();
  users[username] = {
    password, // In production, hash passwords!
    email,
    createdAt: new Date().toISOString(),
  };
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
}

export function validateUser(username: string, password: string): boolean {
  const users = getStoredUsers();
  const user = users[username];
  if (!user) return false;
  // In production, compare hashed passwords!
  return user.password === password;
}

export function signUp(username: string, password: string, email: string): AuthResponse {
  // Validation
  if (!username || username.length < 3) {
    return { success: false, message: "사용자명은 최소 3자 이상이어야 합니다." };
  }
  if (!password || password.length < 6) {
    return { success: false, message: "비밀번호는 최소 6자 이상이어야 합니다." };
  }
  if (!email || !email.includes("@")) {
    return { success: false, message: "유효한 이메일 주소를 입력하세요." };
  }

  const users = getStoredUsers();
  if (users[username]) {
    return { success: false, message: "이미 사용 중인 사용자명입니다." };
  }

  storeUser(username, password, email);
  return {
    success: true,
    message: "회원가입이 완료되었습니다.",
    user: { username, email, createdAt: new Date().toISOString() },
  };
}

export function login(username: string, password: string): AuthResponse {
  if (!username || !password) {
    return { success: false, message: "사용자명과 비밀번호를 입력하세요." };
  }

  if (!validateUser(username, password)) {
    return { success: false, message: "사용자명 또는 비밀번호가 올바르지 않습니다." };
  }

  const users = getStoredUsers();
  const user = users[username];

  // Store current user session
  if (typeof window !== "undefined") {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify({ username, email: user.email }));
    localStorage.setItem(AUTH_TOKEN_KEY, "authenticated");
  }

  return {
    success: true,
    message: "로그인 성공",
    user: { username, email: user.email, createdAt: user.createdAt },
  };
}

export function logout(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(CURRENT_USER_KEY);
  localStorage.removeItem(AUTH_TOKEN_KEY);
}

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(CURRENT_USER_KEY);
  return stored ? JSON.parse(stored) : null;
}

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(AUTH_TOKEN_KEY) === "authenticated";
}
