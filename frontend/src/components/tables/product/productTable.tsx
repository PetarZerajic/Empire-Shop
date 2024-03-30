import { Button, OverlayTrigger, Table, Tooltip } from 'react-bootstrap'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { Paginate } from '../../../components/paginate/paginate'
import { IProducts } from '../../../interfaces/IProducts'


interface IProps{
    products: { data:IProducts[], pages:number, page:number }
    handleOpenForm(item:IProducts): void
    deleteItemHandler(_id:string): void
    }

export const ProductTable = ({products,handleOpenForm,deleteItemHandler}:IProps) => {
  return (
    <>
        <Table striped hover responsive className="table-sm">
        <thead>
            <tr>
            <th />
            <th>NAME</th>
            <th>PRICE</th>
            <th>CATEGORY</th>
            <th>BRAND</th>
            <th />
            </tr>
        </thead>
        <tbody>
            {products.data.map((item) => (
            <tr key={item._id}>
                <td>
                <Link to={`/product/${item._id}`}>
                    <img src={`/images/products/${item.imageCover}`} alt="" />
                </Link>
                </td>
                <td>{item.name}</td>
                <td>${item.price}</td>
                <td>{item.category}</td>
                <td>{item.brand}</td>
                <td>
                <OverlayTrigger
                    overlay={<Tooltip id="tooltip-top">Edit</Tooltip>}
                >
                    <Button
                    variant="light"
                    className="btn-sm mx-2"
                    onClick={() => handleOpenForm(item)}
                    >
                    <FaEdit />
                    </Button>
                </OverlayTrigger>
                <OverlayTrigger
                    overlay={<Tooltip id="tooltip-top">Delete</Tooltip>}
                >
                    <Button
                    variant="light"
                    className="btn-sm mx-2"
                    onClick={() => deleteItemHandler(item._id)}
                    >
                    <FaTrash id="trash" />
                    </Button>
                </OverlayTrigger>
                </td>
            </tr>
            ))}
        </tbody>
        </Table>
        <Paginate pages={products.pages} page={products.page} role="admin" />
  </>
  )
}
