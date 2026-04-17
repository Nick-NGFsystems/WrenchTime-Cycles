import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-950 px-6 py-16">
      <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
    </main>
  )
}