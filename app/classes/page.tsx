import ClassesPage from "@/sections/Classes";
import { Header } from "@/sections/Header";
import Uploader from "@/components/uploader";
import { Hero } from "@/sections/Hero";
export default function Home(){
    return(
        <>
    <Header/>
    {/* <ClassesPage/> */}
    <Hero/>
    <Uploader/>

    </>
    );
}