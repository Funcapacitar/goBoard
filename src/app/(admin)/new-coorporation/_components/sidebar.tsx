
import React from 'react'

type Props = {
    active: number;
    setActive: (active:number) => void;
}

 const Sidebar = ({active, setActive}: Props) => {
  return (
    <div>
        <nav className="grid gap-2 text-sm text-muted-foreground">
        <div
        className={` items-center px-2 py-[5px] cursor-pointer ${
          active === 1 ? "dark:bg-slate-800 bg-slate-200 " : " bg-transparent"
        }`}
        onClick={() => setActive(1)}
      >
              Informacion General
            </div>
            <div
        className={` items-center px-2 py-[5px] cursor-pointer ${
          active === 2 ? "dark:bg-slate-800 bg-slate-200 " : " bg-transparent"
        }`}
        onClick={() => setActive(2)}
      >Junta Directiva</div>
            <div
        className={` items-center px-2 py-[5px] cursor-pointer ${
          active === 3 ? "dark:bg-slate-800 bg-slate-200 " : " bg-transparent"
        }`}
        onClick={() => setActive(3)}
      >Datos adicionales</div>
           
          </nav>
    </div>
  )
}

export default Sidebar;