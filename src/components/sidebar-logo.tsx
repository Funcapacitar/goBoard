import { useTheme } from "next-themes";
import Image from "next/image"

export const SideBarLogo=()=>
{
    const { theme } = useTheme();
return <Image width={25} alt="" className="w-10 mx-3.5 min-h-fit items-center"
height={35} src={theme === 'dark' || theme === 'custom' ? '/logo.png' : '/next.svg'}/>
}