import { NextResponse } from "next/server";
import { login } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: "사용자명과 비밀번호를 입력하세요." },
        { status: 400 }
      );
    }

    const result = login(username, password);

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: result.message,
        user: result.user,
      });
    } else {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
