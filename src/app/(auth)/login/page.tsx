import { Suspense } from "react";
import Login from "../../components/form/LoginForm";

export default function Page() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
      <Login />
    </Suspense>
  );
}
