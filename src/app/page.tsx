import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-stone-100">
      <main className="flex flex-col gap-8 row-start-2 items-center justify-center">
        <Image
          src="/img/EZPZ_logo_light.png"
          alt="Logo"
          width={300}
          height={100}
        />
        <Link href="/dashboard">
          <Button variant="outline">Go to Dashboard</Button>
        </Link>
      </main>
    </div>
  );
}
