"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2, PlusCircle } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ListMembers, Members } from "./ListMembers";

interface JuntaDirectiva {
  // id: string;
  members: Members[];
  iscomplete?: boolean;
}

interface MembersFormProps {
  initialData: JuntaDirectiva & { members: Members[] };
  courseId: string;
}

const FormSchema = z.object({
  role: z.string().min(2),
  vacantes: z.string().min(2),
});

const FormJuntaDirectiva = ({
initialData,
courseId
}:MembersFormProps) => {
  const router = useRouter();
  let members:JuntaDirectiva[] =  []
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const toggleCreating = () => {
    setIsCreating((current) => !current);
  };
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const { isSubmitting, isValid } = form.formState;
  const handlerSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      console.log(isSubmitting, isValid, data);
      // members.push(data)
      toggleCreating();
    } catch {
      toast.error("ocurrio un error");
    }
  };

  const onReorder = async (updateData: { id: string; position: number }[]) => {
    try {
      setIsUpdating(true);

      // await axios.put(`/api/courses/${courseId}/chapters/reorder`, {
      //   list: updateData,
      // });
      toast.success("Capitulos Reordenados");
      router.refresh();
    } catch {
      toast.error("Ocurrio un error");
    } finally {
      setIsUpdating(false);
    }
  };

  const onEdit = (id: string) => {
    router.push(`/create-invitation`);
    // router.push(`/teacher/courses/${courseId}/chapters/${id}`);
  }
  
  return (
    <div>
      <Card>
        {isUpdating && (
          <div className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-m flex items-center justify-center">
            <Loader2 className="animate-spin h-6 w-6 text-sky-700" />
          </div>
        )}
        <CardHeader>
          <CardTitle className="flex justify-between">
            Lista de miembros
            <Button onClick={toggleCreating} variant="ghost">
              {isCreating ? (
                <>Cancelar</>
              ) : (
                <>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  agregar
                </>
              )}
            </Button>
          </CardTitle>
          <CardDescription>
            En este apartado se definiran los miembros que componen la junta
            directiva.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isCreating && (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handlerSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Rol</FormLabel>
                      <Input placeholder="Negritudes" {...field} />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="vacantes"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Cantidad de vacantes</FormLabel>
                      <Input placeholder="cantidad de personas" {...field} />
                    </FormItem>
                  )}
                />
                <Button disabled={!isValid || isSubmitting} type="submit">
                  Guardar
                </Button>
              </form>
            </Form>
          )}
          {!isCreating && (
            <div
              className={cn(
                "text-sm mt-2",
                !initialData.members!.length && "text-slate-500 italic"
              )}
            >
              {!initialData.members.length && "No chapters"}
              <ListMembers
                onEdit={onEdit}
                onReorder={onReorder}
                items={initialData.members || []}
              />
            </div>
          )}
          {!isCreating && (
            <>
              <p className="text-xs text-muted-foreground mt-4">
                Drag and drop si quieres reordenar los miembros de la junta
                directiva{" "}
              </p>
              <span className="text-xs text-muted-foreground font-light underline">
                Luego de crearlos, no podras modificarlos
              </span>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FormJuntaDirectiva;
