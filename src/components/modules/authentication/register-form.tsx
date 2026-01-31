
// 'use client'

// import { cn } from "@/lib/utils"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import {
//   Field,
//   FieldDescription,
//   FieldError,
//   FieldGroup,
//   FieldLabel,
//   FieldSeparator,
// } from "@/components/ui/field"
// import { Input } from "@/components/ui/input"
// import { Switch } from "@/components/ui/switch"
// import Image from "next/image"
// import Link from "next/link"
// import { toast } from "sonner"
// import * as z from "zod"
// import { useForm } from "@tanstack/react-form"
// import { authClient } from "@/lib/auth-client"

// const formSchema = z.object({
//   name: z.string().min(2, "Name is required"),
//   email: z.email(),
//   password: z.string().min(8, "Minimum 8 characters"),
//   role: z.enum(["CUSTOMER", "SELLER"]).refine(
//     (val) => val !== undefined,
//     { message: "Please select account type" }
//   ),
// })


// export function RegisterForm({
//   className,
//   ...props
// }: React.ComponentProps<"div">) {

//   const form = useForm({
//     defaultValues: {
//       name: "",
//       email: "",
//       password: "",
//       role: undefined as "CUSTOMER" | "SELLER" | undefined,
//     },
//     validators: {
//       onSubmit: formSchema,
//     },
//     onSubmit: async ({ value }) => {
//       const toastId = toast.loading("Creating account...")

//       try {

//         const { error } = await authClient.signUp.email({
//           name: value.name,
//           email: value.email,
//           password: value.password,
//         })

//         if (error) {
//           toast.error(error.message, { id: toastId })
//           return
//         }

//         await fetch("/api/user/role", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             email: value.email,
//             role: value.role,
//           }),
//         })

//         toast.success("Account created successfully", { id: toastId })

//         window.location.href = "/login"

//       } catch {
//         toast.error("Something went wrong", { id: toastId })
//       }
//     },
//   })

//   return (
//     <div className={cn("flex flex-col gap-6", className)} {...props}>
//       <Card className="overflow-hidden p-0">
//         <CardContent className="grid p-0 md:grid-cols-2">

//           {/* FORM SIDE */}
//           <form
//             onSubmit={(e) => {
//               e.preventDefault()
//               form.handleSubmit()
//             }}
//             className="p-6 md:p-8"
//           >
//             <FieldGroup>

//               <div className="flex flex-col items-center gap-2 text-center">
//                 <h1 className="text-2xl font-bold">Create an account</h1>
//                 <p className="text-muted-foreground">
//                   Choose role and sign up
//                 </p>
//               </div>

//               {/* NAME */}
//               <form.Field name="name">
//                 {(field) => {
//                   const isInvalid =
//                     field.state.meta.isTouched && !field.state.meta.isValid

//                   return (
//                     <Field>
//                       <FieldLabel>Name</FieldLabel>
//                       <Input
//                         value={field.state.value}
//                         onChange={(e) =>
//                           field.handleChange(e.target.value)
//                         }
//                       />
//                       {isInvalid && (
//                         <FieldError errors={field.state.meta.errors} />
//                       )}
//                     </Field>
//                   )
//                 }}
//               </form.Field>

//               {/* EMAIL */}
//               <form.Field name="email">
//                 {(field) => {
//                   const isInvalid =
//                     field.state.meta.isTouched && !field.state.meta.isValid

//                   return (
//                     <Field>
//                       <FieldLabel>Email</FieldLabel>
//                       <Input
//                         type="email"
//                         value={field.state.value}
//                         onChange={(e) =>
//                           field.handleChange(e.target.value)
//                         }
//                       />
//                       {isInvalid && (
//                         <FieldError errors={field.state.meta.errors} />
//                       )}
//                     </Field>
//                   )
//                 }}
//               </form.Field>

//               {/* PASSWORD */}
//               <form.Field name="password">
//                 {(field) => {
//                   const isInvalid =
//                     field.state.meta.isTouched && !field.state.meta.isValid

//                   return (
//                     <Field>
//                       <FieldLabel>Password</FieldLabel>
//                       <Input
//                         type="password"
//                         value={field.state.value}
//                         onChange={(e) =>
//                           field.handleChange(e.target.value)
//                         }
//                       />
//                       {isInvalid && (
//                         <FieldError errors={field.state.meta.errors} />
//                       )}
//                     </Field>
//                   )
//                 }}
//               </form.Field>

//               {/* ROLE (REQUIRED) */}
//               <form.Field name="role">
//                 {(field) => {
//                   const isInvalid =
//                     field.state.meta.isTouched && !field.state.meta.isValid

//                   return (
//                     <Field className="flex flex-col gap-2">
//                       <FieldLabel>Account Type</FieldLabel>

//                       <div className="flex items-center gap-3">
//                         <span
//                           className={cn(
//                             "text-sm font-medium",
//                             field.state.value === "CUSTOMER"
//                               ? "text-primary"
//                               : "text-muted-foreground"
//                           )}
//                         >
//                           Customer
//                         </span>

//                         <Switch
//                           checked={field.state.value === "SELLER"}
//                           onCheckedChange={(checked) =>
//                             field.handleChange(
//                               checked ? "SELLER" : "CUSTOMER"
//                             )
//                           }
//                         />

//                         <span
//                           className={cn(
//                             "text-sm font-medium",
//                             field.state.value === "SELLER"
//                               ? "text-primary"
//                               : "text-muted-foreground"
//                           )}
//                         >
//                           Seller
//                         </span>
//                       </div>

//                       {isInvalid && (
//                         <FieldError errors={field.state.meta.errors} />
//                       )}
//                     </Field>
//                   )
//                 }}
//               </form.Field>

//               <Button type="submit">Create Account</Button>

//               <FieldDescription className="text-center">
//                 Already have an account?{" "}
//                 <Link href="/login">Login</Link>
//               </FieldDescription>

//             </FieldGroup>
//           </form>

//           {/* IMAGE SIDE */}
//           <div className="bg-muted relative hidden md:block">
//             <Image
//               src="/Kerfin7-NEA-2139.jpg"
//               alt="Register"
//               fill
//               className="object-cover dark:brightness-[0.2]"
//             />
//           </div>

//         </CardContent>
//       </Card>
//     </div>
//   )
// }


'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import * as z from "zod"
import { useForm } from "@tanstack/react-form"
import { authClient } from "@/lib/auth-client"
import { Toggle } from "@/components/ui/toggle"
import { Hop, User,  } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { env } from "@/env"

// ----------------------------
// Form Validation Schema
// ----------------------------
const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Minimum 8 characters"),
  role: z.enum(["CUSTOMER", "SELLER"], {
    required_error: "Please select account type",
  }),
})

// ----------------------------
// Component
// ----------------------------
export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "CUSTOMER" as "CUSTOMER" | "SELLER", // default
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Creating account...")
      try {

        const { error } = await authClient.signUp.email({
          name: value.name,
          email: value.email,
          password: value.password,
        })

        if (error) {
          toast.error(error.message, { id: toastId })
          return
        }

        const res = await fetch(`${env.BACKEND_URL}/user/role`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: value.email, role: value.role }),
        })

        if (!res.ok) {
          toast.error("Failed to set role", { id: toastId })
          return
        }

        toast.success("Account created successfully", { id: toastId })
        window.location.href = "/login"

      } catch (err) {
        toast.error("Something went wrong", { id: toastId })
      }
    },
  })

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0 shadow-lg">
        <CardContent className="grid md:grid-cols-2">

          {/* FORM SIDE */}
          <form
            onSubmit={(e) => {
              e.preventDefault()
              form.handleSubmit()
            }}
            className="p-6 md:p-10 flex flex-col gap-4"
          >
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Create an account</h1>
                <p className="text-muted-foreground">Choose your role and sign up</p>
              </div>

              {/* NAME */}
              <form.Field name="name">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field>
                      <FieldLabel>Name</FieldLabel>
                      <Input
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="John Doe"
                      />
                      {isInvalid && <FieldError errors={field.state.meta.errors} />}
                    </Field>
                  )
                }}
              </form.Field>

              {/* EMAIL */}
              <form.Field name="email">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field>
                      <FieldLabel>Email</FieldLabel>
                      <Input
                        type="email"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="john@example.com"
                      />
                      {isInvalid && <FieldError errors={field.state.meta.errors} />}
                    </Field>
                  )
                }}
              </form.Field>

              {/* PASSWORD */}
              <form.Field name="password">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field>
                      <FieldLabel>Password</FieldLabel>
                      <Input
                        type="password"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="********"
                      />
                      {isInvalid && <FieldError errors={field.state.meta.errors} />}
                    </Field>
                  )
                }}
              </form.Field>

              {/* ROLE TOGGLE */}
              <form.Field name="role">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field className="flex flex-col gap-2">
                      <FieldLabel>Account Type</FieldLabel>

                      <div className="flex items-center gap-4">
                        <button
                          type="button"
                          onClick={() => field.handleChange("CUSTOMER")}
                          className={cn(
                            "flex items-center gap-1 px-4 py-2 rounded-md border transition-all",
                            field.state.value === "CUSTOMER"
                              ? "bg-primary text-white border-primary"
                              : "bg-background text-muted-foreground border-border"
                          )}
                        >
                          <User size={18} /> Customer
                        </button>

                        <button
                          type="button"
                          onClick={() => field.handleChange("SELLER")}
                          className={cn(
                            "flex items-center gap-1 px-4 py-2 rounded-md border transition-all",
                            field.state.value === "SELLER"
                              ? "bg-primary text-white border-primary"
                              : "bg-background text-muted-foreground border-border"
                          )}
                        >
                          <Hop size={18} /> Seller
                        </button>
                      </div>

                      {isInvalid && <FieldError errors={field.state.meta.errors} />}
                    </Field>
                  )
                }}
              </form.Field>

              <Button type="submit" className="mt-2">Create Account</Button>

              <FieldDescription className="text-center mt-1">
                Already have an account?{" "}
                <Link href="/login" className="text-primary font-medium">Login</Link>
              </FieldDescription>
            </FieldGroup>
          </form>

          {/* IMAGE SIDE */}
          <div className="hidden md:block relative bg-muted">
            <Image
              src="/Kerfin7-NEA-2139.jpg"
              alt="Register"
              fill
              className="object-cover dark:brightness-[0.2]"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
