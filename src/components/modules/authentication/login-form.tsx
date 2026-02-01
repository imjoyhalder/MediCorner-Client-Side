
"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, Chrome } from "lucide-react";
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

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const handleGoogleLogin = async () => {
  const data = authClient.signIn.social({
    provider: 'google',
    callbackURL: "http://localhost:3000"
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
      {/* ===== Brand Header (Same as Register) ===== */}
      <CardHeader className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="MediCorner"
            width={60}
            height={60}
            priority
          />
          <div className="leading-tight hidden md:block">
            <p className="text-2xl font-bold text-[#15a215]">
              MediCorner
            </p>
          </div>
        </div>

        <CardTitle className="text-xl text-[#0f172a] mt-2">
          Welcome back
        </CardTitle>

        <p className="text-sm text-muted-foreground">
          Login to your account
        </p>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup className="space-y-4">
            {/* EMAIL */}
            <form.Field name="email">
              {(field) => (
                <Field>
                  <FieldLabel>Email</FieldLabel>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      className="pl-9"
                      value={field.state.value}
                      onChange={(e) =>
                        field.handleChange(e.target.value)
                      }
                      placeholder="john@example.com"
                    />
                  </div>
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            </form.Field>

            {/* PASSWORD */}
            <form.Field name="password">
              {(field) => (
                <Field>
                  <FieldLabel>Password</FieldLabel>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      className="pl-9 pr-12"
                      value={field.state.value}
                      onChange={(e) =>
                        field.handleChange(e.target.value)
                      }
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-[#0f172a]"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            </form.Field>

            {/* LOGIN BUTTON */}
            <Button
              type="submit"
              className="w-full bg-[#22c55e] hover:bg-green-600"
            >
              Login
            </Button>

            {/* GOOGLE LOGIN */}
            <Button
              variant="outline"
              type="button"
              className="w-full flex items-center gap-2"
              onClick={()=> handleGoogleLogin()}
            >
              <Chrome className="h-5 w-5" />
              Continue with Google
            </Button>
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter className="justify-center text-sm text-muted-foreground">
        Don’t have an account?
        <Link
          href="/register"
          className="ml-1 text-[#22c55e] font-medium hover:underline"
        >
          Sign up
        </Link>
      </CardFooter>
    </Card>
  );
}
