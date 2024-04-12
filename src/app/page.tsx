import { InitialPage } from "@/components/InitialPage/InitialPage";

export default function Page() {
  return (
    <main className="flex items-center min-h-screen justify-center bg-gradient-to-tl from-[#A9C9FF]  to-[#FFF3C7]">
      <section className=" flex flex-col gap-16 ">
        <InitialPage />
      </section>
    </main>
  );
}
