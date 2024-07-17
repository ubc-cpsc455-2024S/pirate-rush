import React from 'react';
import InputForm from "../components/InputForm.jsx";
import MemberCardContainer from "../components/MemberCardContainer.jsx";
import Footer from "../components/Footer.jsx";

function HomePage() {
  return (
    <div id="home-container">
      <div id="main-container">
        <InputForm />
        <MemberCardContainer />
      </div>
      {/*<Footer />*/}
    </div>
  );
}

export default HomePage;
