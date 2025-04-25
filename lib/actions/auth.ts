"use server";

import { db } from "@/database/drizzle";
import { eq } from "drizzle-orm";
import { users } from "@/database/schema";
import bcrypt from "bcryptjs";
import { hash } from "bcryptjs";
import { signIn } from "@/auth";
import { headers } from "next/headers";
import ratelimit from "../ratelimit";
import { redirect } from "next/navigation";

export const signInWithCreds = async (
  params: Pick<AuthCredentials, "email" | "password">) => {
  const { email, password } = params;
  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })
    if (result?.error) {
      return {
        success: false,
        error: result.error,
      }
    };
    return {
      success: true,
    }
  } catch (err) {
    console.log("Sign in Error", err);
  }
}
export const signUp = async (params: AuthCredentials) => {
  const { fullName, email, password, universityId, universityCard } = params;
  const ip = (await headers()).get('x-forwarded-for') || "127.0.0.1";
  const { success } = await ratelimit.limit(ip);
  if (!success) {
    return redirect("/too-fast");
  }
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existingUser.length > 0) {
    return { success: false, error: "User already exists" };
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await hash(password, salt);
  try {
    await db.insert(users).values({
      fullName,
      email,
      password: hashedPassword,
      universityId,
      universityCard,
    });

    await signInWithCreds({
      email,
      password,
    })
    return {
      success: true,
    }
  } catch (error) {
    console.log("SignUp Error", error);
    return {
      success: false,
      error: "SignUp Error"
    }
  }
}


