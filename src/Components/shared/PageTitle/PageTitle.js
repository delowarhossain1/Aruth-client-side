import React from "react";
import { Helmet } from "react-helmet-async";

const PageTitle = ({text = 'hello'}) => {
  return (
    <>
      <Helmet>
        <title>Aruot - {text}</title>
      </Helmet>
    </>
  );
};

export default PageTitle;
