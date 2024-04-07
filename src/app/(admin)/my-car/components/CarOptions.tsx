import React from "react";
import { IoMdCheckmark } from "react-icons/io";

type Props = {
  active: number;
  setActive: (active: number) => void;
};

const CarOptions = ({ active, setActive }: Props) => {
  const options = [
    "Informacion de la corporacion",
    "Definir junta directiva",
    "Miembros de la junta directiva",
    "Ultimos pasos",
  ];
  return (
    <div>
      {options.map((option: any, index: number) => (
        <div key={index} className={`w-full flex py-5 `}>
          <div
            className={`flex w-[35px] h-[35px] rounded-full items-center justify-center ${
              active + 1 > index
                ? "bg-[#] border border-black dark:border-white cursor-pointer"
                : "bg-[#6a69691c] dark:bg-[#e5e5e52d]"
            } relative`}
          >
            <IoMdCheckmark className="text-[25px]" />
            {index !== options.length - 1 && (
              <div
                className={`absolute w-1 h-[30px] ${
                  active + 1 > index
                    ? "bg-[#5c7dff]"
                    : "bg-[#6a69697b] dark:bg-[#e5e5e54a]"
                } bottom-[-100%]
                    }`}
              />
            )}
          </div>
          <h5
            className={`pl-3 ${
              active === index
                ? "dark:text-white text-black"
                : " dark:text-gray-400 text-gray-400"
            } textt-[20px]`}
          >
            {option}
          </h5>
        </div>
      ))}
    </div>
  );
};

export default CarOptions;
