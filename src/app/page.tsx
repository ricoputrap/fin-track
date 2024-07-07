import Link from "next/link";
import validateRequest from "@/lib/validate-request";
import { logout } from "@/server/auth";

export default async function Home() {
  const result = await validateRequest();

  return (
    <main>
      {result.user ? (
        <form action={logout}>
          <button>Logout</button>
        </form>
      ) : (
        <div className="flex flex-col">
          <Link href="/login">Login</Link>
          <Link href="/signup">Signup</Link>
        </div>
      )}
    </main>
  );
}
