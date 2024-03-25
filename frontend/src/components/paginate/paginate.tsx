import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

interface IProps {
  pages: number;
  page: number;
  keyword?: string | undefined
  role?: "admin" | "user";
}

export const Paginate = (props: IProps) => {
  const { pages, page,role,keyword } = props;
  const pageNumbers:number[] = [];

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
              role === "admin" ? `/admin/productlist/page/${number}`:
              role==="user" && keyword ? `/search/${keyword}/page/${number}` : `/page/${number}`
            }
          >
            <Pagination.Item active={number === page}>{number}</Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  );
};
