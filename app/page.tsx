import { Explorer } from "@/components/jelenlet/Explorer";

export default function Home() {
  console.log(process.env.NEXTAUTH_SECRET);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-5 p-24">
      <Explorer />
    </main>
  );
}
