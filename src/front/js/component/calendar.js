import React from "react";
import { useCalendlyEventListener, InlineWidget } from "react-calendly";

const Calendly = () => {

  return (
    <div className="App">
      <InlineWidget url="https://calendly.com/nrcaplications/revision"
      styles={{
        height: '760px',
        
      }}
      pageSettings={{
        backgroundColor: '994508',
        hideEventTypeDetails: false,
        hideLandingPageDetails: false,
        primaryColor: '0A0E1A',
        textColor: 'FFFFFF'
      }}
      />
    </div>
  );
};

export default Calendly;

