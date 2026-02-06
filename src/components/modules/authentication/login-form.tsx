"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import * as z from "zod";
import { useForm } from "@tanstack/react-form";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { env } from "@/env";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const handleGoogleLogin = async () => {
  await authClient.signIn.social({
    provider: 'google',
    // callbackURL: env.NEXT_PUBLIC_FRONTEND_URL
    callbackURL: "https://medicorner-client.vercel.app"
  })
}

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    defaultValues: { email: "", password: "" },
    validators: { onSubmit: formSchema },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Logging in...");
      const { error } = await authClient.signIn.email(value);
      if (error) return toast.error(error.message, { id: toastId });

      toast.success("Logged in successfully", { id: toastId });
      window.location.href = "/";
    },
  });

  return (
    <Card className="w-full max-w-md mx-auto shadow-xl border-border bg-[#f8fafc]">
      {/* Header with reduced padding */}
      <CardHeader className="flex flex-col items-center gap-1 py-4">
        <div  className="flex items-center">
          <Image src="/logo.png" alt="MediCorner" width={50} height={50} priority />
          <div className="leading-tight hidden md:block">
            <p className="text-xl font-bold text-[#15a215] ">MediCorner</p>
          </div>
        </div>

        <CardTitle className="text-lg text-[#0f172a] mt-1">
          Welcome back
        </CardTitle>
        <p className="text-xs text-muted-foreground font-medium">
          Login to manage your health needs
        </p>
      </CardHeader>

      <CardContent className="pb-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          {/* gap-3 for compact layout */}
          <FieldGroup className="flex flex-col gap-3">
            {/* EMAIL */}
            <form.Field name="email">
              {(field) => (
                <Field className="space-y-1">
                  <FieldLabel className="text-xs font-bold uppercase text-slate-500">Email Address</FieldLabel>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      className="pl-9 h-10 rounded-xl"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="john@example.com"
                    />
                  </div>
                  <FieldError className="text-[10px]" errors={field.state.meta.errors} />
                </Field>
              )}
            </form.Field>

            {/* PASSWORD */}
            <form.Field name="password">
              {(field) => (
                <Field className="space-y-1">
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      className="pl-9 pr-12 h-10 rounded-xl"
                      type={showPassword ? "text" : "password"}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  <FieldError className="text-[10px]" errors={field.state.meta.errors} />
                </Field>
              )}
            </form.Field>

            {/* LOGIN BUTTON */}
            <Button
              type="submit"
              className="w-full h-11 bg-[#22c55e] hover:bg-green-600 rounded-xl font-bold mt-2"
            >
              Login
            </Button>

            {/* GOOGLE LOGIN - Official Style */}
            <Button
              variant="outline"
              type="button"
              className="w-full h-11 flex items-center justify-center gap-3 rounded-xl border-slate-200 bg-white font-bold"
              onClick={handleGoogleLogin}
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </Button>
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter className="justify-center text-sm text-muted-foreground pb-6">
        Don&apos;t have an account?
        <Link
          href="/register"
          className="ml-1 text-[#22c55e] font-bold hover:underline"
        >
          Sign up
        </Link>
      </CardFooter>
    </Card>
  );
}