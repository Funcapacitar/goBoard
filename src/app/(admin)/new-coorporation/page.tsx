"use client";

import FormAdd from "./_components/FormAdd";
import FormJuntaDirectiva from "./_components/FormJuntaDirectiva";
import FormInvitacion from "./_components/formdate";
import Sidebar from "./_components/sidebar";
import { useState } from "react";

export default function Dashboard() {
  const [active, setactive] = useState(1);

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex  flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">Datos de la Coorporación</h1>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <Sidebar active={active} setActive={setactive} />
          <div className="grid gap-6">
            {active === 1 && (
              <div className="w-full h-full bg-transparent ">
                <FormInvitacion />
              </div>
            )}
            {active === 2 && (
              <div className="w-full h-full bg-transparent ">
                <FormJuntaDirectiva />
              </div>
            )}
            {active === 3 && (
              <div className="w-full h-full bg-transparent ">
                <FormAdd />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
