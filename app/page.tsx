import MyForm from "@/components/MyForm";
import { Card, CardHeader } from "@/components/ui/card";
import WeatherData from "@/components/WeatherData";
import { CalendarDays } from "lucide-react";

export default function Page() {
  return (
    <>
      <div className="h-1/3 text-white o-10 relative pl-10 pt-10 pr-10">
        <MyForm />
      </div>
    </>
  );
}
