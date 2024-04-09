import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal } from "lucide-react";
import { IoArrowForward } from "react-icons/io5";
import { set } from "mongoose";

interface PropsPreviw {
  active: number;
  setActive: (active: number) => void;
}

const PreviewCarMembers = ({ active, setActive }: PropsPreviw) => {
  const handleNext = () => {
    setActive(active + 1);
  };
  const handleBack = () => {
    setActive(active - 1);
  };
  return (
    <div className="w-[90%] m-auto mt-24 p-3">
      <Card>
        <CardHeader>
          <CardTitle>Delegados</CardTitle>
          <CardDescription>
            Tomate el tiempo de revisar los delegados de tu coorporación
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  <span className="sr-only">Image</span>
                </TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Cargo</TableHead>
                {/* <TableHead className="hidden md:table-cell">
                  Total Sales
                </TableHead> */}
                <TableHead className="hidden md:table-cell">
                  Fecha de Creacion
                </TableHead>
                <TableHead>
                  <span className="sr-only">Acciones</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="hidden sm:table-cell">
                  <Image
                    alt="Product image"
                    className="aspect-square rounded-full object-cover"
                    height="64"
                    src="/avatars/02.png"
                    width="64"
                  />
                </TableCell>
                <TableCell className="font-medium">
                  Laser Lemonade Machine
                </TableCell>
                <TableCell>
                  <Badge variant="outline">Pendiente</Badge>
                </TableCell>
                <TableCell>Delegado</TableCell>
                {/* <TableCell className="hidden md:table-cell">25</TableCell> */}
                <TableCell className="hidden md:table-cell">
                  2023-07-12 10:42 AM
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">mostrar menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                      <DropdownMenuItem>Editarar</DropdownMenuItem>
                      <DropdownMenuItem>Borrar</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="hidden sm:table-cell">
                  <Image
                    alt="Product image"
                    className="aspect-square rounded-full object-cover"
                    height="64"
                    src="/avatars/02.png"
                    width="64"
                  />
                </TableCell>
                <TableCell className="font-medium">
                  Hypernova Headphones
                </TableCell>
                <TableCell>
                  <Badge variant="outline">Activo</Badge>
                </TableCell>
                <TableCell>Delegado</TableCell>
                {/* <TableCell className="hidden md:table-cell">100</TableCell> */}
                <TableCell className="hidden md:table-cell">
                  2023-10-18 03:21 PM
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Mostrar menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                      <DropdownMenuItem>Editar</DropdownMenuItem>
                      <DropdownMenuItem>Borrar</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="hidden sm:table-cell">
                  <Image
                    alt="Product image"
                    className="aspect-square rounded-full object-cover"
                    height="64"
                    src="/avatars/02.png"
                    width="64"
                  />
                </TableCell>
                <TableCell className="font-medium">
                  AeroGlow Desk Lamp
                </TableCell>
                <TableCell>
                  <Badge variant="outline">Activo</Badge>
                </TableCell>
                <TableCell>Delegado</TableCell>
                {/* <TableCell className="hidden md:table-cell">50</TableCell> */}
                <TableCell className="hidden md:table-cell">
                  2023-11-29 08:15 AM
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Mostrar menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                      <DropdownMenuItem>Editar</DropdownMenuItem>
                      <DropdownMenuItem>Borrar</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="hidden sm:table-cell">
                  <Image
                    alt="Product image"
                    className="aspect-square rounded-full object-cover"
                    height="64"
                    src="/avatars/02.png"
                    width="64"
                  />
                </TableCell>
                <TableCell className="font-medium">
                  TechTonic Energy Drink
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">Pendiente</Badge>
                </TableCell>
                <TableCell>Delegado</TableCell>
                {/* <TableCell className="hidden md:table-cell">0</TableCell> */}
                <TableCell className="hidden md:table-cell">
                  2023-12-25 11:59 PM
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Mostrar menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                      <DropdownMenuItem>Editar</DropdownMenuItem>
                      <DropdownMenuItem>Borrar</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="hidden sm:table-cell">
                  <Image
                    alt="Product image"
                    className="aspect-square rounded-full object-cover"
                    height="64"
                    src="/avatars/02.png"
                    width="64"
                  />
                </TableCell>
                <TableCell className="font-medium">
                  Gamer Gear Pro Controller
                </TableCell>
                <TableCell>
                  <Badge variant="outline">Activo</Badge>
                </TableCell>
                <TableCell>Delegado</TableCell>
                {/* <TableCell className="hidden md:table-cell">75</TableCell> */}
                <TableCell className="hidden md:table-cell">
                  2024-01-01 12:00 AM
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Mostrar menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                      <DropdownMenuItem>Editar</DropdownMenuItem>
                      <DropdownMenuItem>Borrar</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="hidden sm:table-cell">
                  <Image
                    alt="Product image"
                    className="aspect-square rounded-full object-cover"
                    height="64"
                    src="/avatars/02.png"
                    width="64"
                  />
                </TableCell>
                <TableCell className="font-medium">
                  Luminous VR Headset
                </TableCell>
                <TableCell>
                  <Badge variant="outline">Activo</Badge>
                </TableCell>
                <TableCell>Delegado</TableCell>
                {/* <TableCell className="hidden md:table-cell">30</TableCell> */}
                <TableCell className="hidden md:table-cell">
                  2024-02-14 02:14 PM
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Mostrar menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                      <DropdownMenuItem>Editar</DropdownMenuItem>
                      <DropdownMenuItem>Borrar</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            Mostrando <strong>1-10</strong> de <strong>32</strong> delegados
          </div>
        </CardFooter>
        <CardFooter className="flex justify-between">
          <span className="flex items-center bg-primary-400 text-white 800px:w-[180px] h-[40px] rounded-lg">
            <Button type="submit" className="w-full" onClick={handleBack}>
              <IoArrowForward className=" text-[25px] mr-4" />
              Atras
            </Button>
          </span>
          <span className="flex items-center bg-primary-400 text-white 800px:w-[180px] h-[40px] rounded-lg">
            <Button type="submit" className="w-full" onClick={handleNext}>
              Siguiente
              <IoArrowForward className=" text-[25px] mr-4" />
            </Button>
          </span>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PreviewCarMembers;
