import React from "react";
import { useCalendlyEventListener, InlineWidget } from "react-calendly";

const Calendly = () => {

  return (
    <div className="App">
      <InlineWidget url="https://calendly.com/nrcaplications/revision"
      styles={{
        height: '1000px'
        
      }}
      pageSettings={{
        backgroundColor: '101420',
        hideEventTypeDetails: false,
        hideLandingPageDetails: false,
        primaryColor: 'e97333',
        textColor: 'e97333'
      }}
      />
    </div>
  );
};

export default Calendly;

