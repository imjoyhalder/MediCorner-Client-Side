
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { User, Store } from "lucide-react";

import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

interface signUpData {
  name: string,
  email: string,
  password: string,
  role: UserRole
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
          role: UserRole.CUSTOMER
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
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Create an account</CardTitle>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup className="space-y-4">

            {/* Name */}
            <form.Field name="name">
              {(field) => (
                <Field>
                  <FieldLabel>Full Name</FieldLabel>
                  <Input
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="John Doe"
                  />
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            </form.Field>

            {/* Email */}
            <form.Field name="email">
              {(field) => (
                <Field>
                  <FieldLabel>Email</FieldLabel>
                  <Input
                    type="email"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="john@example.com"
                  />
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            </form.Field>

            {/* Password */}
            <form.Field name="password">
              {(field) => (
                <Field>
                  <FieldLabel>Password</FieldLabel>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            </form.Field>

            {/* Role Toggle (Professional) */}
            <form.Field name="becomeSeller">
              {(field) => (
                <Field>
                  <FieldLabel>Account Type</FieldLabel>

                  <div className="grid grid-cols-2 gap-3">
                    {/* CUSTOMER */}
                    <button
                      type="button"
                      onClick={() => field.handleChange(false)}
                      className={cn(
                        "flex items-center justify-center gap-2 rounded-lg border p-3 transition",
                        !field.state.value
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border text-muted-foreground"
                      )}
                    >
                      <User className="h-5 w-5" />
                      Customer
                    </button>

                    {/* SELLER */}
                    <button
                      type="button"
                      onClick={() => field.handleChange(true)}
                      className={cn(
                        "flex items-center justify-center gap-2 rounded-lg border p-3 transition",
                        field.state.value
                          ? "border-primary bg-primary/10 text-primary"
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

            <Button type="submit" className="w-full">
              Create Account
            </Button>

          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter className="justify-center text-sm text-muted-foreground">
        Already have an account?
        <Link href="/login" className="ml-1 text-primary font-medium">
          Login
        </Link>
      </CardFooter>
    </Card>
  );
}
