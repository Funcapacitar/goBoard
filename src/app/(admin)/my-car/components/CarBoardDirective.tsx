"use client";
import React, { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { BsLink45Deg, BsPencil } from "react-icons/bs";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DelegateSelectionForm from "./FormDelegadoCantidad";
import { Button } from "@/components/ui/button";
import { IoArrowForward } from "react-icons/io5";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
type Props = {
  active: number;
  setActive: (active: number) => void;
  carContentData: any;
  setCarContentData: (carContentData: any) => void;
  handleSubmit: any;
};

const FormSchema = z.object({
  periodoinicial: z.date({
    required_error: "La fecha inical es requerida.",
  }),
  periodofinal: z.date({
    required_error: "La finañ inicial es requerida.",
  }),
  nombre: z.string({
    required_error: "Debes seleccionar un nombre.",
  }),
  departamento: z.string({
    required_error: "Debes seleccionar un departamento.",
  }),
  municipio: z.string({
    required_error: "Debes seleccionar un municipio.",
  }),
  tipodelegado: z.string({
    required_error: "selecciona"
  }),
  cantidadelegado: z.string({
    required_error: "selecciona"
  }),
});
interface CategoryPhone {
  id: number,
  name: string
}

const categoriphones: CategoryPhone[] = [
  { id: 1, name: "Casa" },
  { id: 2, name: "Trabajo " },
  { id: 3, name: "Otro" },
]
const CarBoardDirective = ({
  active,
  setActive,
  carContentData,
  setCarContentData,
  handleSubmit: handllecarSubmit,
}: Props) => {
  const [isCollapsed, setCollapsed] = useState(
    Array(carContentData.length).fill(false)
  );
  const handleSubmit = (e: any) => {
    e.preventDefault();
    handllecarSubmit();
  };
  const handleCollapsedToggle = (index: number) => {
    const updateCollapsed = [...isCollapsed];
    updateCollapsed[index] = !updateCollapsed[index];
    setCollapsed(updateCollapsed);
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });


  const newContentHanlder = (item: any) => {
    if (
      item.title === "" ||
      item.videoUrl === "" ||
      item.description === "" ||
      item.links[0].title === "" ||
      item.links[0].url === ""
    ) {
      toast.error("Por favor llene todos los campos primero");
    } else {
      let newVideoSection = "";
      if (carContentData.length > 0 || carContentData.length <= selectedDelegateCount) {
        const lastVideoSection =
          carContentData[carContentData.length - 1].videoSection;
        if (lastVideoSection) {
          newVideoSection = lastVideoSection;
        }
      }
      const newContent = {
        title: "",
        description: "",
        videoUrl: "",
        videoSection: newVideoSection,
        links: [
          {
            title: "",
            url: "",
          },
        ],
        suggestion: "",
      };
      setCarContentData([...carContentData, newContent]);
    }
  };
  const handleRemoveLink = (index: number, linkIndex: number) => {
    const updateData = [...carContentData];
    updateData[index].links.splice(linkIndex, 1);
    setCarContentData(updateData);
  };
  const [showMainForm, setShowMainForm] = useState(false);
  const [showFormAction, setShowFormAction] = useState(true)
  const [selectedDelegateType, setSelectedDelegateType] = useState('');
  const [selectedDelegateCount, setSelectedDelegateCount] = useState(0);

  return (
    <div className="w-[80%] m-auto mt-24 p-3">

      {showFormAction && (

        <DelegateSelectionForm
          onDelegateTypeChange={setSelectedDelegateType}
          onDelegateCountChange={setSelectedDelegateCount}
          onContinue={() => {
            setShowMainForm(!setShowMainForm);
            setShowFormAction(!setShowFormAction)
          }}
        />
      )}
      {
        showMainForm && (

          <Card>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)}
                  className="space-y-8">

                  {carContentData?.map((item: any, index: number) => {
                    const showSectionInput =
                      index === 0 ||
                      item.videoSection !== carContentData[index - 1].videoSection;
                    return (
                      <>
                        <div
                          className={`w-full  p-4  ${showSectionInput ? "mt-10" : "mb-0"
                            }`}
                        >
                          {showSectionInput && (
                            <>
                              <div className="flex w-full items-center">
                                <input
                                  type="text"
                                  className={`text-[20px] ${item.videoSection === "Untitled Section"
                                    ? "w-[170px]"
                                    : "w-min"
                                    } font-Poppins cursor-pointer  bg-transparent outline-none`}
                                  value={item.videoSection}
                                  onChange={(e) => {
                                    const updateData = [...carContentData];
                                    updateData[index].videoSection = e.target.value;
                                    setCarContentData(updateData);
                                  }}
                                />
                                <BsPencil className="dark:text-white text-black text-[20px] cursor-pointer" />
                              </div>
                            </>
                          )}
                          <div className="flex w-full items-center justify-between my-0">
                            {isCollapsed[index] ? (
                              <>
                                {item.title ? (
                                  <p className="font-Poppins text-black dark:text-white">
                                    {index + 1}. {item.title}
                                  </p>
                                ) : (
                                  <p className="font-Poppins">
                                    {" "}
                                    No has definido un titulo{" "}
                                  </p>
                                )}
                              </>
                            ) : (
                              <></>
                            )}
                            <div className="flex items-center justify-end">
                              <AiOutlineDelete
                                className={`dark:text-white text-black text-[20px] mr-2 ${index > 0 ? "cursor-pointer" : "cursor-no-drop"
                                  }`}
                                onClick={() => {
                                  if (index > 0) {
                                    const updateData = [...carContentData];
                                    updateData.splice(index, 1);
                                    setCarContentData(updateData);
                                  }
                                }}
                              />
                              <MdOutlineKeyboardArrowDown
                                fontSize={25}
                                className={`dark:text-white text-black`}
                                style={{
                                  transform: isCollapsed[index]
                                    ? "rotate(180deg)"
                                    : "rotate(0deg)",
                                }}
                                onClick={() => handleCollapsedToggle(index)}
                              />
                            </div>
                          </div>
                          {!isCollapsed[index] && (
                            <>
                              <div className="my-3">
                                <Label htmlFor="" className={``}>
                                  {" "}
                                  Nombres
                                </Label>
                                <Input
                                  type="text"
                                  name="title"
                                  required
                                  value={item.title}
                                  onChange={(e) => {
                                    const updateData = [...carContentData];
                                    updateData[index].title = e.target.value;
                                    setCarContentData(updateData);
                                  }}
                                  className={""}
                                  placeholder="Introduce un nombre"
                                />
                              </div>
                              <div className="mb-3">
                                <label htmlFor="" className={``}>
                                  {" "}
                                  Apellidos
                                </label>
                                <Input
                                  type="text"
                                  name="title"
                                  required
                                  value={item.videoUrl}
                                  onChange={(e) => {
                                    const updateData = [...carContentData];
                                    updateData[index].videoUrl = e.target.value;
                                    setCarContentData(updateData);
                                  }}
                                  className={""}
                                  placeholder="sedsr"
                                />
                              </div>
                              <div className="mb-3">
                                <label htmlFor="" className={``}>
                                  {" "}
                                  Correo
                                </label>
                                <Input
                                  type="email"
                                  name="title"
                                  required
                                  value={item.description}
                                  onChange={(e) => {
                                    const updateData = [...carContentData];
                                    updateData[index].description = e.target.value;
                                    setCarContentData(updateData);
                                  }}
                                  className={` !h-min py-3`}
                                  placeholder="example@example.com"
                                />
                              </div>

                              {item.links.map((link: any, linkIndex: number) => {
                                return (
                                  <>
                                    <div className="mb-3 ">
                                      <div className="flex w-full items-center justify-between">
                                        <label htmlFor="" className={""}>
                                          Telefono {linkIndex + 1}
                                        </label>
                                        <AiOutlineDelete
                                          className={`dark:text-white text-black text-[20px] ${linkIndex === 0
                                            ? "cursor-no-drop"
                                            : "cursor-pointer"
                                            }`}
                                          onClick={() => {
                                            linkIndex === 0
                                              ? null
                                              : handleRemoveLink(index, linkIndex);
                                          }}
                                        />
                                      </div>
                                      <Input
                                        type="text"
                                        required
                                        value={link.title}
                                        onChange={(e) => {
                                          const updateData = [...carContentData];
                                          updateData[index].links[linkIndex].title =
                                            e.target.value;
                                          setCarContentData(updateData);
                                        }}
                                        className={""}
                                        placeholder="Telefono"
                                      />
                                      <FormField
                                        control={form.control}
                                        name="departamento"
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormLabel>Etiquta</FormLabel>
                                            <Select
                                              onValueChange={field.onChange}
                                              defaultValue={field.value}
                                            >
                                              <FormControl>
                                                <SelectTrigger>
                                                  <SelectValue placeholder="Selecciona una etiqueta" />
                                                </SelectTrigger>
                                              </FormControl>
                                              <SelectContent>
                                                {categoriphones.map((category) => (
                                                  <SelectItem
                                                    key={category.id}
                                                    value={category.id.toString()}
                                                  >
                                                    {category.name}
                                                  </SelectItem>
                                                ))}
                                              </SelectContent>
                                            </Select>

                                            <FormMessage />
                                          </FormItem>
                                        )}
                                      />
                                      {/* <input
                                    type="url"
                                    required
                                    value={link.url}
                                    onChange={(e) => {
                                      const updateData = [...carContentData];
                                      updateData[index].links[linkIndex].url =
                                        e.target.value;
                                      setCarContentData(updateData);
                                    }}
                                    className={` mt-6`}
                                    placeholder="https://www.google.com"
                                  /> */}


                                    </div>
                                  </>
                                );
                              })}
                              <br />
                              {/* agregar links */}
                              <button
                                className="bg-primary-400 rounded-lg flex items-center py-2 px-4"
                                onClick={(e) => {
                                  e.preventDefault();
                                  const updateData = [...carContentData];
                                  updateData[index].links.push({
                                    title: "",
                                    url: "",
                                  });
                                  setCarContentData(updateData);
                                }}
                              >
                                <BsLink45Deg className="mr-2" />
                                Agregar Otro telefono
                              </button>
                            </>
                          )}
                          <br />
                          <div className="grid gap-6 sm:grid-cols-2 my-4">
                            <div className="grid gap-3">

                              <FormField
                                control={form.control}
                                name="periodoinicial"
                                render={({ field }) => (
                                  <FormItem className="flex flex-col">
                                    <FormLabel>Inicio de Mandato</FormLabel>
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
                                          selected={field.value}
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
                            </div>
                            <div className="grid gap-3 justify-end">

                              <FormField
                                control={form.control}
                                name="periodofinal"
                                render={({ field }) => (
                                  <FormItem className="flex flex-col">
                                    <FormLabel>Fin de mandato</FormLabel>
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
                                          selected={field.value}
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
                            </div>
                          </div>
                          {/* agregar nuevo contenido */}
                          {index == carContentData.length - 1 && (
                            <div>
                              <p
                                className="flex items-center text-[18px] text-primary-300   cursor-pointer "
                                onClick={(e: any) => {
                                  newContentHanlder(item);
                                }}
                              >
                                <AiOutlinePlusCircle className=" mr-2 text-[30px] " />
                                Agregar delegado
                              </p>
                            </div>
                          )}
                        </div>
                      </>
                    );
                  })}

                  <CardFooter className="flex justify-between">
                    <span className="flex items-center bg-primary-400 text-white 800px:w-[180px] h-[40px] rounded-lg">
                      <Button type="submit" className="w-full">
                        <IoArrowForward className=" text-[25px] mr-4" />
                        Atras
                      </Button>
                    </span>
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
        )
      }
    </div>
  );
};
export default CarBoardDirective;
