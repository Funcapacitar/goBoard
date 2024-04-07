"use client";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { toast } from "@/components/ui/use-toast";
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
import { IoArrowForward } from "react-icons/io5";
import { FC, useState } from "react";
import { Combobox } from "@/components/ui/combobox";
type Props = {
  carInfo: any;
  setCarInfo: (courseInfo: any) => void;
  active: number;
  setActive: (active: number) => void;
  options: { label: string; value: string }[];
};
interface Department {
  id: number;
  name: string;
}

interface City {
  id: number;
  name: string;
  departmentId: number;
}

interface Company {
  id: number;
  name: string;
  address: string;
  cityId: number;
}

interface CompanySelectorProps {
  onCompanySelect: (company: Company) => void;
}

const departments: Department[] = [
  { id: 1, name: "Antioquia" },
  { id: 2, name: "Cundinamarca " },
  { id: 3, name: "Cesar" },
];

const cities: City[] = [
  { id: 4, name: "Medellin", departmentId: 1 },
  { id: 5, name: "Bogota", departmentId: 2 },
  { id: 6, name: "Madrid", departmentId: 2 },
  { id: 7, name: "Valledupar", departmentId: 3 },
];

const companies: Company[] = [
  { id: 8, name: "Corpocesar", address: "Dirección 1", cityId: 7 },
  { id: 9, name: "Corpoguajira", address: "Dirección 2", cityId: 7 },
  { id: 10, name: "CAMP", address: "Dirección 3", cityId: 5 },
  { id: 11, name: "CBM", address: "Dirección 4", cityId: 6 },
  { id: 12, name: "CARM", address: "Dirección 5", cityId: 4 },
];

const FormSchema = z.object({
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

const CarInfo: FC<Props> = (
  { carInfo, setCarInfo, active, setActive, options },
  { onCompanySelect }
) => {
  // hardcode
  const [selectedDepartment, setSelectedDepartment] = useState<number | null>(
    null
  );
  const [selectedCity, setSelectedCity] = useState<number | null>(null);
  const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const departmentId = parseInt(e.target.value);
    setSelectedDepartment(departmentId);
    setSelectedCity(null);
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const cityId = parseInt(e.target.value);
    setSelectedCity(cityId);
  };

  const handleCompanySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCompany = companies.find(
      (company) => company.id === parseInt(e.target.value)
    );
    if (selectedCompany) {
      onCompanySelect(selectedCompany);
    }
  };

  const filteredCities = selectedDepartment
    ? cities.filter((city) => city.departmentId === selectedDepartment)
    : [];

  const filteredCompanies = selectedCity
    ? companies.filter((company) => company.cityId === selectedCity)
    : [];

  // end hardcode data
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function handlerSubmit(data: z.infer<typeof FormSchema>) {
    setActive(active + 1);
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
      <div className="m-auto w-[80%] mt-24">
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
                <div className="grid gap-6 lg:grid-cols-2">
                  {/* <div className="grid gap-3">
                    <FormField
                      control={form.control}
                      name="departamento"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Combobox
                              options={options}
                              {...field}
                              onChange={(value: string) =>
                                field.onChange(value)
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div> */}
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
                              {departments.map((department) => (
                                <SelectItem
                                  key={department.id}
                                  value={department.id.toString()}
                                >
                                  {department.name}
                                </SelectItem>
                              ))}
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
                              {cities
                                .filter(
                                  (city) =>
                                    city.departmentId ===
                                    parseInt(form.getValues("departamento"))
                                )
                                .map((city) => (
                                  <SelectItem
                                    key={city.id}
                                    value={city.id.toString()}
                                  >
                                    {city.name}
                                  </SelectItem>
                                ))}
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
                          {companies
                            .filter(
                              (name) =>
                                name.cityId ===
                                parseInt(form.getValues("municipio"))
                            )
                            .map((name) => (
                              <SelectItem
                                key={name.id}
                                value={name.id.toString()}
                              >
                                {name.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <CardFooter className="border-t flex justify-end py-4">
                  <span className="flex items-center bg-primary-400 text-white 800px:w-[180px] h-[40px] rounded-lg">
                    <Button type="submit" className="w-full">
                      Siguiente
                      <IoArrowForward className=" text-[25px] mr-4" />
                    </Button>
                  </span>
                </CardFooter>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default CarInfo;
