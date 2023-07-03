import React from 'react';

interface IHeading {
  children: string;
}

const Heading: React.FC<IHeading> = ({ children }) => {
  return <h1>{children}</h1>;
};

export default Heading;
