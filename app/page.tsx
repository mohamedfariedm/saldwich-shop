import Image from "next/image";
import 'bootstrap/dist/css/bootstrap.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HomeComponent from "./pages/home/HomeComponent";
export default function Home() {
  return (
    <div>
      <HomeComponent />
    </div>
  );
}
