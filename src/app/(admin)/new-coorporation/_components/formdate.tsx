"use client";

import { zodResolver } from "@hookform/resolvers/zod";
// import { CalendarIcon } from "@radix-ui/react-icons";
// import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";
// import {toast as toasst} from 'react-hot-toast'
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FormSchema = z.object({
  // dob: z.date({
  //   required_error: "A date of birth is required.",
  // }),
  nombre: z.string({
    required_error: "Debes seleccionar un nombre.",
  }),
  departamento: z.string({
    required_error: "Debes seleccionar un departamento.",
  }),
  municipio: z.string({
    required_error: "Debes seleccionar un municipio.",
  }),
});

const FormInvitacion = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function handlerSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Informacion basica</CardTitle>
          <CardDescription>
            Usado para identificar a que coorporacion correspondes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handlerSubmit)}
              className="space-y-8"
            >
              

              {/* <FormField
                control={form.control}
                name="dob"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date of birth</FormLabel>
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
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      Your date of birth is used to calculate your age.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="departamento"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Departamento</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona un departamento" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="bogota">Bogotá</SelectItem>
                            <SelectItem value="cesar">Cesar</SelectItem>
                            <SelectItem value="magdalena">Magdalena</SelectItem>
                            <SelectItem value="antioquia">Antioquia</SelectItem>
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="municipio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Municipio</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona un municipio" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="bogota">Bogotá</SelectItem>
                            <SelectItem value="valledupar">
                              Valledupar
                            </SelectItem>
                            <SelectItem value="medellin">Medellin</SelectItem>
                            <SelectItem value="guajira">La guajira</SelectItem>
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
                  <FormField
                control={form.control}
                name="nombre"
                render={({ field }) => (
                  <FormItem>
                        <FormLabel>Nombre</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona tu corporacion" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="corpocesar">Corpocesar</SelectItem>
                            <SelectItem value="corpoguajira">
                              Corpoguajira
                            </SelectItem>
                            <SelectItem value="cormed">Cormed</SelectItem>
                            <SelectItem value="cam">CAM</SelectItem>
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                )}
              />
              <CardFooter className="border-t  py-4">
                <Button type="submit" className="w-full">Guardar</Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
};

export default FormInvitacion;
