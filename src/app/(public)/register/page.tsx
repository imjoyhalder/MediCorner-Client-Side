import { RegisterForm } from "@/components/modules/authentication/register-form"

export default function SignupPage() {
  return (
    <div className=" flex min-h-svh flex-col items-center justify-center">
      <div className="w-full max-w-sm md:max-w-4xl">
        <RegisterForm/>
      </div>
    </div>
  )
}
