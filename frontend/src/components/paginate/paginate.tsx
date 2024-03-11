import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Routes } from "../../router/routes";

interface IProps {
  pages: number;
  page: number;
  role?: string;
}

export const Paginate = (props: IProps) => {
  const { pages, page, role } = props;
  const pageNumbers = [];

  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  }

  return (
    pages > 1 && (
      <Pagination className="d-flex justify-content-center align-items-center">
        {pageNumbers.map((number) => (
          <LinkContainer
            key={number}
            to={
              role === "admin"
                ? `${Routes.AdminProductList}/page/${number}`
                : `/page/${number}`
            }
          >
            <Pagination.Item active={number === page}>{number}</Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  );
};
