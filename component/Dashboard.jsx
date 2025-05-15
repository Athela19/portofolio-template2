import Homepage from "./Home/homePage";
import Aboutpage from "./Home/aboutPage";
import Skillpage from "./Home/skillPage";

export default function Dashboard() {
    return (
        <div>
            <Homepage/>
            <Aboutpage />
            <Skillpage />
        </div>
    );
}