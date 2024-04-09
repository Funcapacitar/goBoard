"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { IoAddCircle } from "react-icons/io5";
import { z } from "zod";

type Props = {
  topics: { title: string }[];
};
const FormSchema = z.object({
  fechareunion: z.date().nullable(),
});
const Page = () => {
  const [topic, setTopic] = useState([{ title: "" }]);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const HandleTopics = (index: number, value: any) => {
    const updateBenefits = [...topic];
    updateBenefits[index].title = value;
    setTopic(updateBenefits);
  };

  const handleAddBenefit = () => {
    // if (topic.length >= 3) return;
    if (topic[topic.length - 1].title === "") {
      toast.error("Completa el campo anterior");
      return;
    } else {
      setTopic([...topic, { title: "" }]);
    }
  };
  return (
    <div className="">
      <h2 className="text-3xl font-bold tracking-tight my-4">Crear Reunion</h2>
      <Card>
        <CardHeader>
          <CardDescription>
            Completa los campos para crear una nueva reunion
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form>
              <FormField
                control={form.control}
                name="fechareunion"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Fecha de Reunion</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Selecciona una fecha</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value || undefined}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />
              <FormLabel>Hora de la Reunion</FormLabel>
              <div className="flex justify-between gap-4">
                <Input type="number" placeholder="12" max={12} min={0}></Input>
                <Input type="number" placeholder="59" max={59} min={0}></Input>
              </div>
              <br />
              <div>
                <Label htmlFor="topics">Que puntos abordará la reunion?</Label>
                <br />
                {topic.map((benefit, index) => (
                  <>
                    <Textarea
                      rows={3}
                      cols={30}
                      name="topics"
                      id="topics"
                      placeholder="Tema a tratar..."
                      required
                      key={index}
                      value={benefit.title}
                      onChange={(e) => HandleTopics(index, e.target.value)}
                      className={` my-2`}
                    />
                  </>
                ))}
                <IoAddCircle
                  style={{ margin: "10px 0", cursor: "pointer", width: "30px" }}
                  onClick={handleAddBenefit}
                />
                <FormLabel>A instancias de:</FormLabel>

                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Quien Invita?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Encargado</SelectLabel>
                      <SelectItem value="apple">Codirector</SelectItem>
                      <SelectItem value="banana">Copresidente</SelectItem>
                      <SelectItem value="blueberry">Consejero</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
