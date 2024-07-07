import InputForm from "../components/InputForm.jsx";
import MemberCardContainer from "../components/MemberCardContainer.jsx";
import Footer from "../components/Footer.jsx";

function HomePage() {
    return (
        <>
            <div id="main-container">
                <InputForm />
                <MemberCardContainer />
            </div>
            <Footer />
        </>
    );
}

export default HomePage;
