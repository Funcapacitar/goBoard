"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { IoEyeOffSharp, IoEyeSharp } from "react-icons/io5";

const Login: React.FC = () => {
//   const [identificacion, setIdentificacion] = useState("");
//   const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const [credentials, setCredentials] = useState({
    identificacion: "",
    password: "",
  });
  const router = useRouter();
  const handleSubmit = async (e:any) => {
    e.preventDefault();
    const res = await axios.post("/api/auth/login", credentials);
    console.log(res);
    console.log(credentials.identificacion, credentials.password);

    if (res.status === 200) {
      router.push("/dashboard");
    }else{
		toast.error("Ocurrio un error al iniciar sesion");
	}
  };

  return (
    <>
      <div className="bg-blue-900 absolute login top-0 left-0 bg-gradient-to-b from-gray-900 via-gray-900 to-blue-800/50 bottom-0 leading-5 h-full w-full overflow-hidden"></div>
      <div className="relative   min-h-screen  sm:flex sm:flex-row  justify-center bg-transparent rounded-3xl shadow-xl">
        <div className="flex-col flex  self-center lg:px-14 sm:max-w-4xl xl:max-w-md  z-10">
          <div className="self-start hidden lg:flex flex-col  text-gray-300">
            <h1 className="my-3 font-semibold text-4xl">Bienvenido!</h1>
            <p className="pr-3 text-sm opacity-75">
              Inicia sesion para continuar con tu participacion en la junta
              directiva
            </p>
          </div>
        </div>
        <div className="flex justify-center self-center  z-10">
          <form className="w-full max-w-md" onSubmit={handleSubmit} method="POST">
            <div className="p-12 bg-white mx-auto rounded-3xl w-96 ">
              <div className="mb-7 flex items-center justify-center">
                <h3 className="font-semibold text-2xl text-gray-800">
                  Inicio de Sesion{" "}
                </h3>
              </div>
              <div className="space-y-6">
                <div className="">
                  <input
                    className=" w-full text-sm  px-4 py-3 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none focus:border-blue-900"
                    type="text"
                    id="cedula"
                    name="cedula"
					required
                    // value={identificacion}
                    onChange={(e) =>
						setCredentials({
						  ...credentials,
						  identificacion: e.target.value,
						})
					  }
                    placeholder="N° de Identificacion"
                  />
                </div>

                <div className="relative">
                  <input
                    placeholder="Contraseña"
                    id="password"
                    name="password"
					required
                    // value={password}
                    onChange={(e) =>
						setCredentials({
						  ...credentials,
						  password: e.target.value,
						})
					  }
                    type={show ? "text" : "password"}
                    className="text-sm text-gray-600 px-4 py-3 rounded-lg w-full bg-gray-200 focus:bg-transparent border border-gray-200 focus:outline-none focus:border-blue-900"
                  />
                  <div className="flex items-center absolute inset-y-0 right-0 mr-3  text-sm leading-5">
                    <IoEyeSharp
                      size={20}
                      className={
                        "text-blue-900  cursor-pointer " +
                        (show ? "hidden" : "block")
                      }
                      onClick={() => setShow(!show)}
                    />
                    <IoEyeOffSharp
                      size={20}
                      className={
                        "text-blue-900  cursor-pointer " +
                        (show ? "block" : "hidden")
                      }
                      onClick={() => setShow(!show)}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm ml-auto">
                    <a
                      href="#"
                      className="text-purple-700 hover:text-purple-600"
                    >
                      Olvidaste tu contraseña?
                    </a>
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center bg-purple-800  hover:bg-purple-700 text-gray-100 p-3  rounded-lg tracking-wide font-semibold  cursor-pointer transition ease-in duration-500"
                  >
                    Sign in
                  </button>
                </div>
              </div>
              <div className="mt-7 text-center text-gray-300 text-xs">
                <span>
                  Copyright © {new Date().getFullYear()}{" "}
                  <a
                    href="https://iecapacitar.edu.co"
                    rel=""
                    target="_blank"
                    title="Fundacion Capacitar"
                    className="text-purple-500 hover:text-purple-600 "
                  >
                    Fundacion Capacitar
                  </a>
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
      <svg
        className="absolute bottom-0 left-0 "
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#fff"
          fillOpacity="1"
          d="M0,0L40,42.7C80,85,160,171,240,197.3C320,224,400,192,480,154.7C560,117,640,75,720,74.7C800,75,880,117,960,154.7C1040,192,1120,224,1200,213.3C1280,203,1360,149,1400,122.7L1440,96L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
        ></path>
      </svg>
    </>
  );
};

export default Login;
