import { Helmet } from "react-helmet-async";

interface IProps {
  title: string;
}

export const Meta = ({title}: IProps) => {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
};
