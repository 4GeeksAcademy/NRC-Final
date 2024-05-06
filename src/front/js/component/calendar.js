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
        backgroundColor: '252C44',
        hideEventTypeDetails: false,
        hideLandingPageDetails: false,
        primaryColor: '00a2ff',
        textColor: 'fbfbfb'
      }}
      />
    </div>
  );
};

export default Calendly;

