"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import fetchWeather from "@/util/fetchWeather";

import WeatherData from "./WeatherData";
import { useState } from "react";
import { LoaderIcon } from "lucide-react";

const formSchema = z.object({
  city: z.string().min(1, { message: "Please enter a city" }),
});

export default function MyForm() {
  const [showCard, setShowCard] = useState(false);
  const [cityWeatherData, setCityWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Defining the Form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      city: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setShowCard(false);
    setError("");
    try {
      const weatherData = await fetchWeather(values.city);
      if (weatherData.cod == 404) {
        setLoading(false);
        throw new Error("Invalid response from API");
      }
      console.log(weatherData);
      setCityWeatherData(weatherData);
      setLoading(false);
      setShowCard(true);
    } catch (err) {
      setError(`Failed to fetch weather data. Please try again - ${err}`);
      return console.log(`Recevied no weather data - ${error}`);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mb-10">
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-2xl">City:</FormLabel>
              <FormControl>
                <Input placeholder="City Weather" {...field} />
              </FormControl>
              <FormDescription className="mb-5">
                Enter the city you want the weather for...
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button variant="secondary" className="w-full" type="submit">
          {loading ? (
            <LoaderIcon className="animate-spin h-5 w-5 mr-2" />
          ) : (
            "Submit"
          )}
        </Button>
      </form>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {showCard && cityWeatherData ? (
        <WeatherData weatherData={cityWeatherData} />
      ) : null}
    </Form>
  );
}
