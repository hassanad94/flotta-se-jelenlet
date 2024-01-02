import { Explorer } from "@/components/jelenlet/Explorer";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-5 p-24">
      <Explorer />
    </main>
  );
}
