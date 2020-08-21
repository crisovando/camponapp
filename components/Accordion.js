import React, { useState } from 'react';

function AccordionContents({ children }) {
  return children;
}

function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div>
      {items.map((item, index) => (
        <>
          <button onClick={() => setOpenIndex(index)}>{item.title}</button>
          {index === openIndex ? <AccordionContents>{item.contents}</AccordionContents> : null}
        </>
      ))}
    </div>
  );
}

export default Accordion;
