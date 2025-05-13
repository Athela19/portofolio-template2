import Navbar from "./Layout/Navbar";
import Footer from "./Layout/Footer";

export default function Appshell({ children }) {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    );
}