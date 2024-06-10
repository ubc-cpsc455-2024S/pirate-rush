import InputForm from "../components/InputForm.jsx";
import MemberContainer from "../components/MemberContainer.jsx";

function HomePage() {
  return (
    <>
        <div id="main-container">
            {/*<CrewContext.Provider>* Add context to not add more than 6 members/}
                <InputForm />
            {/*</CrewContext.Provider>*/}
            <MemberContainer />
        </div>
    </>
  );
}

export default HomePage;
