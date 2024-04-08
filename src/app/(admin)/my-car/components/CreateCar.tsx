"use client";
import React, { useState } from "react";
import CarOptions from "./CarOptions";
import CarInfo from "./CarInfo";
import CarBoardDirective from "./CarBoardDirective";

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
  { id: 1, name: "Medellin", departmentId: 1 },
  { id: 2, name: "Bogota", departmentId: 1 },
  { id: 3, name: "Madrid", departmentId: 2 },
  { id: 4, name: "Valledupar", departmentId: 3 },
];

const companies: Company[] = [
  { id: 1, name: "Corpocesar", address: "Dirección 1", cityId: 4 },
  { id: 2, name: "Corpoguajira", address: "Dirección 2", cityId: 4 },
  { id: 3, name: "CAMP", address: "Dirección 3", cityId: 2 },
  { id: 4, name: "CBM", address: "Dirección 4", cityId: 3 },
  { id: 5, name: "CARM", address: "Dirección 5", cityId: 1 },
];

export const CreateCar = () => {
  const [active, setActive] = useState(0);
  const [carInfo, setCarInfo] = useState({
    departamento: "",
    ciudad: "",
    nombre: "",
  });

  const [carData, setCarData] = useState({});
  const [carContentData, setCarContentData] = useState([
    {
      title: "",
      description: "",
      videoUrl: "",
      videoSection: "Cargo del delegado",
      links: [
        {
          title: "",
          url: "",
        },
      ],
      suggestion: "",
    },
  ]);

  const handleSubmit = async () => {
    //format benefits and requirements
    // const formattedBenefits = benefits.map((benefit) => ({
    //   title: benefit.title,
    // }));
    // const formattedRequirements = requirements.map((requirement) => ({
    //   title: requirement.title,
    // }));
    // //format courseContentData
    // const formattedCourseContentData = courseContentData.map((content) => ({
    //   title: content.title,
    //   description: content.description,
    //   videoUrl: content.videoUrl,
    //   videoSection: content.videoSection,
    //   links: content.links.map((link) => ({
    //     title: link.title,
    //     url: link.url,
    //   })),
    //   suggestion: content.suggestion,
    // }));

    //prepare our data objet
    const data = {
      departamento: carInfo.departamento,
      ciudad: carInfo.ciudad,
      nombre: carInfo.nombre,
    };
    setCarData(data);
  };
  return (
    <div className="flex !w-[100%] min-h-screen">
      <div className="w-[80%]">
        {active === 0 && (
          <CarInfo
            carInfo={carInfo}
            setCarInfo={setCarInfo}
            active={active}
            setActive={setActive}
            options={departments.map((department) => ({
              label: department.name,
              value: department.id.toString(),
            }))}
          />
        )}
        {active === 1 && (
          <CarBoardDirective
            carContentData={carContentData}
            setCarContentData={setCarContentData}
            active={active}
            setActive={setActive}
            handleSubmit={handleSubmit}
          />
        )}
      </div>
      <div className="w-[20%] mt-[100px] h-screen fixed top-16 right-0 ">
        <CarOptions active={active} setActive={setActive} />
      </div>
    </div>
  );
};
