import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import React from "react";

const VotingPage = () => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardDescription>
            Selecciona de acuerdo a tu punto de vista
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="grid gap-2">
              <h1 className="text-lg font-bold tracking-tighter">
                Aprobacion del tema N° 1: Tema 1
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                ¿Estas de acuerdo con el tema?
              </p>
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="outline">
                  Si
                </Button>
                <Button size="sm" variant="outline">
                  No
                </Button>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Tu respuesta ha sido guardada, Clic en continuar para seguir
              </p>
            </div>
          </div>
          <CardFooter>
            <div className="ml-auto flex items-center space-x-2">
              <Button size="sm">Continuar</Button>
            </div>
          </CardFooter>
        </CardContent>
      </Card>
    </div>
  );
};

export default VotingPage;
