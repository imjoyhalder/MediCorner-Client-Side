
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import {
  User,
  Store,
  Eye,
  EyeOff,
  Chrome,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";

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


interface signUpData {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export enum UserRole {
  CUSTOMER = "CUSTOMER",
  SELLER = "SELLER",
}

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Minimum 8 characters"),
  becomeSeller: z.boolean(),
});

const handleGoogleLogin = async () => {
  const data = authClient.signIn.social({
    provider: 'google',
    callbackURL: "http://localhost:3000"
  })
}

export function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      becomeSeller: false,
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Creating account...");
      try {
        const signUpData: signUpData = {
          name: value.name,
          email: value.email,
          password: value.password,
          role: UserRole.CUSTOMER,
        };

        signUpData.role = value.becomeSeller
          ? UserRole.SELLER
          : UserRole.CUSTOMER;

        const { error } = await authClient.signUp.email(signUpData);

        if (error) {
          toast.error(error.message, { id: toastId });
          return;
        }

        toast.success(
          `Account created as ${value.becomeSeller ? "Seller" : "Customer"}`,
          { id: toastId }
        );

        router.push("/login");
        router.refresh();
      } catch {
        toast.error("Something went wrong", { id: toastId });
      }
    },
  });

  return (
    <Card className="w-full max-w-md mx-auto shadow-xl border-border bg-[#f8fafc]">

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
          Create your account
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup className="space-y-4">
            {/* NAME */}
            <form.Field name="name">
              {(field) => (
                <Field>
                  <FieldLabel>Full Name</FieldLabel>
                  <Input
                    value={field.state.value}
                    onChange={(e) =>
                      field.handleChange(e.target.value)
                    }
                    placeholder="John Doe"
                  />
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            </form.Field>

            {/* EMAIL */}
            <form.Field name="email">
              {(field) => (
                <Field>
                  <FieldLabel>Email</FieldLabel>
                  <Input
                    type="email"
                    value={field.state.value}
                    onChange={(e) =>
                      field.handleChange(e.target.value)
                    }
                    placeholder="john@example.com"
                  />
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
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={field.state.value}
                      onChange={(e) =>
                        field.handleChange(e.target.value)
                      }
                      className="pr-12"
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

            {/* ROLE TOGGLE */}
            <form.Field name="becomeSeller">
              {(field) => (
                <Field>
                  <FieldLabel>Account Type</FieldLabel>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => field.handleChange(false)}
                      className={cn(
                        "flex items-center justify-center gap-2 rounded-lg border p-3 transition-all",
                        !field.state.value
                          ? "border-[#22c55e] bg-[#22c55e]/10 text-[#22c55e]"
                          : "border-border text-muted-foreground"
                      )}
                    >
                      <User className="h-5 w-5" />
                      Customer
                    </button>

                    <button
                      type="button"
                      onClick={() => field.handleChange(true)}
                      className={cn(
                        "flex items-center justify-center gap-2 rounded-lg border p-3 transition-all",
                        field.state.value
                          ? "border-[#22c55e] bg-[#22c55e]/10 text-[#22c55e]"
                          : "border-border text-muted-foreground"
                      )}
                    >
                      <Store className="h-5 w-5" />
                      Seller
                    </button>
                  </div>

                  <p className="text-xs text-muted-foreground mt-1">
                    {field.state.value
                      ? "Sell and manage medicines"
                      : "Buy medicines as a customer"}
                  </p>
                </Field>
              )}
            </form.Field>

            {/* SUBMIT */}
            <Button
              type="submit"
              className="w-full bg-[#22c55e] hover:bg-green-600"
            >
              Create Account
            </Button>

            {/* GOOGLE */}
            <Button
              onClick={()=> handleGoogleLogin()}
              type="button"
              variant="outline"
              className="w-full flex items-center gap-2"
            >
              <Chrome className="h-5 w-5" />
              Continue with Google
            </Button>
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter className="justify-center text-sm text-muted-foreground">
        Already have an account?
        <Link
          href="/login"
          className="ml-1 text-[#22c55e] font-medium hover:underline"
        >
          Login
        </Link>
      </CardFooter>
    </Card>
  );
}
