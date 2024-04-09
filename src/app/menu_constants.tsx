import { SideNavItemGroup } from "@/types/type";
import {
  BsEnvelope,
  BsGear,
  BsHouseDoor,
  BsKanban,
  BsListUl,
  BsQuestionCircle,
} from "react-icons/bs";

export const SIDENAV_ITEMS: SideNavItemGroup[] = [
  {
    title: "Dashboards",
    menuList: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: <BsHouseDoor size={20} />,
      },
    ],
  },
  {
    title: "Gestion",
    menuList: [
      {
        title: "Mi Coorporación",
        path: "/my-car",
        icon: <BsEnvelope size={20} />,
      },
      {
        title: "Reuniones",
        path: "/products",
        icon: <BsKanban size={20} />,
        submenu: true,
        subMenuItems: [
          { title: "Crear Invitacion", path: "/create-invitation" },
          {
            title: "Invitaciones Pendientes",
            path: "/createInvitacion/pendding",
          },
          {
            title: "Historial de Invitaciones",
            path: "/createInvitacion/history",
          },
        ],
      },
      {
        title: "Votaciones",
        path: "/orders",
        icon: <BsListUl size={20} />,
        submenu: true,
        subMenuItems: [
          { title: "Votar", path: "/votaciones" },
          { title: "Resultados", path: "/votaciones/result" },
        ],
      },
    ],
  },
  {
    title: "Otros",
    menuList: [
      {
        title: "Cuenta",
        path: "/account",
        icon: <BsGear size={20} />,
      },
      {
        title: "Ayuda",
        path: "/help",
        icon: <BsQuestionCircle size={20} />,
      },
    ],
  },
];
