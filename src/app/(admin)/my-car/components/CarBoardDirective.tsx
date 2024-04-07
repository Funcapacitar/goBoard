"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
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
type Props = {
  active: number;
  setActive: (active: number) => void;
  carContentData: any;
  setCarContentData: (carContentData: any) => void;
  handleSubmit: any;
};

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
      if (carContentData.length > 0) {
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

  return (
    <div className="w-[80%] m-auto mt-24 p-3">
      <Card>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <FormField
                control={form.control}
                name="departamento"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cargo</FormLabel>
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
              {carContentData?.map((item: any, index: number) => {
                const showSectionInput =
                  index === 0 ||
                  item.videoSection !== carContentData[index - 1].videoSection;
                return (
                  <>
                    <div
                      className={`w-full  p-4  ${
                        showSectionInput ? "mt-10" : "mb-0"
                      }`}
                    >
                      {showSectionInput && (
                        <>
                          <div className="flex w-full items-center">
                            <input
                              type="text"
                              className={`text-[20px] ${
                                item.videoSection === "Untitled Section"
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
                            className={`dark:text-white text-black text-[20px] mr-2 ${
                              index > 0 ? "cursor-pointer" : "cursor-no-drop"
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
                            <label htmlFor="" className={``}>
                              {" "}
                              Titulo de La Seccion
                            </label>
                            <input
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
                              placeholder="Introduccion a la lógica"
                            />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="" className={``}>
                              {" "}
                              Video: Url
                            </label>
                            <input
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
                              Video: Descripción
                            </label>
                            <textarea
                              rows={8}
                              cols={30}
                              name="title"
                              required
                              value={item.description}
                              onChange={(e) => {
                                const updateData = [...carContentData];
                                updateData[index].description = e.target.value;
                                setCarContentData(updateData);
                              }}
                              className={` !h-min py-3`}
                              placeholder="Apréndelo todo sobre la lógica"
                            />
                          </div>

                          {item.links.map((link: any, linkIndex: number) => {
                            return (
                              <>
                                <div className="mb-3 ">
                                  <div className="flex w-full items-center justify-between">
                                    <label htmlFor="" className={""}>
                                      Link {linkIndex + 1}
                                    </label>
                                    <AiOutlineDelete
                                      className={`dark:text-white text-black text-[20px] ${
                                        linkIndex === 0
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
                                  <input
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
                                    placeholder="Titulo del link"
                                  />
                                  <input
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
                                  />
                                </div>
                              </>
                            );
                          })}
                          <br />
                          {/* agregar links */}
                          <button
                            className="bg-primary-400 text-white rounded-lg flex items-center py-2 px-4"
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
                            Agregar Link
                          </button>
                        </>
                      )}
                      <br />
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
                            Agregar Contenido
                          </p>
                        </div>
                      )}
                    </div>
                  </>
                );
              })}
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
export default CarBoardDirective;
