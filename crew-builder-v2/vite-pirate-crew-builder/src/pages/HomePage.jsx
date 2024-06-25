import InputForm from "../components/InputForm.jsx";
import MemberContainer from "../components/MemberContainer.jsx";
import Footer from "../components/Footer.jsx";

function HomePage() {
    return (
        <>
            <div id="main-container">
                <InputForm/>
                <MemberContainer/>
            </div>
            <div>
                <Footer/>
            </div>
        </>
    );
}

export default HomePage;
