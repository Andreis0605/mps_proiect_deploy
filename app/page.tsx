import { redirect } from "next/navigation";

export default function Page() {
  // Server-side redirect to the /home route
  redirect("/home");
}
