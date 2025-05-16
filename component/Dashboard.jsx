import Homepage from "./Home/homePage";
import Aboutpage from "./Home/aboutPage";
import Skillpage from "./Home/skillPage";
import Project from "./Home/project";

export default function Dashboard() {
    return (
        <div>
            <Homepage/>
            <Aboutpage />
            <Skillpage />
            <Project />
        </div>
    );
}