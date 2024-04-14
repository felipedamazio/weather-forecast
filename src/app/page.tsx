import { InitialPage } from "@/components/InitialPage/InitialPage";

export default function Page() {
  return (
    <main className="flex items-center min-h-screen justify-center bg-gradient-to-t from-[#ffeb78]  to-[#fdfdfd]">
      <section className=" flex flex-col gap-16 ">
        <InitialPage />
      </section>
    </main>
  );
}
