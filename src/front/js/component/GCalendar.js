import React from 'react';

const GCalendar = () => {
  return (
    <div style={{ position: 'relative', paddingBottom: '75%', height: 0, overflow: 'hidden', maxWidth: '100%', background: '#0A0E1A', color: 'white' }}>
      <iframe 
        src="https://calendar.google.com/calendar/embed?height=600&wkst=2&ctz=Europe%2FMadrid&bgcolor=%23EF6C00&showTitle=0&showTabs=0&showTz=0&showPrint=0&src=bnJjYXBsaWNhdGlvbnNAZ21haWwuY29t&src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=ZW4uc3BhaW4jaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20&color=%23039BE5&color=%2333B679&color=%230B8043" 
        style={{ border: 'solid 1px #777', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} 
      ></iframe>
    </div>
  );
};

export default GCalendar;