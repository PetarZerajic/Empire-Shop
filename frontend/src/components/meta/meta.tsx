import { Helmet } from "react-helmet-async";

export const Meta = ({title}: {title:string}) => {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
};
