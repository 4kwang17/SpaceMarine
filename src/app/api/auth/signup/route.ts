import { NextResponse } from "next/server";
import { signUp } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { username, password, email } = await request.json();

    if (!username || !password || !email) {
      return NextResponse.json(
        { success: false, message: "모든 필드를 입력하세요." },
        { status: 400 }
      );
    }

    const result = signUp(username, password, email);

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: result.message,
        user: result.user,
      });
    } else {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
