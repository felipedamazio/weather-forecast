import { SunAnimated } from "@/components/InitialPage/SunAnimated";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function InitialPage() {
  return (
    <Sheet>
      <section className="flex flex-col items-center gap-4">
        <span>
          <SunAnimated />
        </span>
        <span>Weather Forecasts</span>
        <SheetTrigger asChild>
          <Button variant="outline">About Project</Button>
        </SheetTrigger>
        <Button className="animate-bounce">
          <a href="/weather">Get Started</a>
        </Button>
      </section>
      <section className="flex items-center justify-center">
        <a href="https://www.linkedin.com/in/felipe-damazio/" target="_blank">
          Developed by Felp
        </a>
      </section>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
