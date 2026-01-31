import { LoginForm } from "@/components/modules/authentication/login-form"

export default function LoginPage() {
  return (
    // bg-muted
    <div className=" flex min-h-svh flex-col items-center justify-center ">
      <div className="w-full max-w-sm md:max-w-4xl">
        <LoginForm />
      </div>
    </div>
  )
}
