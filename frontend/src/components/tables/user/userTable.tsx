import { IUsers } from '../../../interfaces/IUsers';
import { Button, OverlayTrigger, Table, Tooltip } from 'react-bootstrap'
import { FaCheck, FaEdit, FaTimes, FaTrash } from 'react-icons/fa'

interface IProps {
    users: {data: IUsers[]};
    handleOpenForm(user:IUsers):void;
    deleteItemHandler(id:string):void
    }
    
    export const UserTable = ({users, handleOpenForm, deleteItemHandler}: IProps) => {
        return (
            <Table striped hover responsive className="table-sm">
            <thead>
            <tr>
                <th />
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ADMIN</th>
                <th />
            </tr>
            </thead>
            <tbody>
            {users.data.map((user) => (
                <tr key={user._id}>
                <td>
                    <img src={`/images/users/${user.photo}`} alt={user.name} />
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                    {user.role.startsWith("admin") ? (
                    <FaCheck style={{ color: "green" }} />
                    ) : (
                    <FaTimes color="red" />
                    )}
                </td>
                <td>
                    <OverlayTrigger
                    overlay={<Tooltip id="tooltip-top">Edit</Tooltip>}
                    >
                    <Button
                        variant="light"
                        className="btn-sm mx-2"
                        onClick={() => handleOpenForm(user)}
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
                        onClick={() => deleteItemHandler(user._id)}
                    >
                        <FaTrash id="trash" />
                    </Button>
                    </OverlayTrigger>
                </td>
                </tr>
            ))}
            </tbody>
        </Table>
        )
    }
