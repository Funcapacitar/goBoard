import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IoArrowBack } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface Props {
  active: number;
  setActive: (active: number) => void;
}

const FormCarSave = ({ active, setActive }: Props) => {
  const router = useRouter();
  const handleBack = () => {
    setActive(active - 1);
  };
  const onSubmit = () => {
    toast.success("Los datos se han generado correctamente");
    router.push("/dashboard");
  };
  return (
    <div className="w-[90%] m-auto mt-24 p-3">
      <Card>
        <CardHeader>
          <CardTitle>Ultimos Pasos</CardTitle>
          <CardDescription>
            Guarda los cambios y genera las credenciales de tus delegados, que
            seran enviadas automaticamente mediante el email que has
            proporcionado anteriormente
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={onSubmit}>Guardar y enviar datos</Button>
        </CardContent>

        <CardFooter className="flex justify-between">
          <span className="flex items-center bg-primary-400 text-white 800px:w-[180px] h-[40px] rounded-lg">
            <Button type="submit" className="w-full" onClick={handleBack}>
              <IoArrowBack className=" text-[25px] mr-4" />
              Atras
            </Button>
          </span>
        </CardFooter>
      </Card>
    </div>
  );
};

export default FormCarSave;
