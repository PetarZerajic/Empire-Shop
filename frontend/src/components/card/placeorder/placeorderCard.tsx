import { Card,ListGroup,Row,Col, Button } from 'react-bootstrap'
import { Loader } from '../../loader/loader'

interface IProps{
    itemsPrice:number;
    shippingPrice:number;
    totalPrice:number;
    taxPrice:number;
    isLoading:boolean
    placeOrderHandler():void
}

export const PlaceorderCard = (props:IProps) => {
    const {itemsPrice,shippingPrice,taxPrice,totalPrice,placeOrderHandler,isLoading}=props
  return (
    <Card>
         <ListGroup variant="flush">
            <ListGroup.Item>
                <h2>Order Summary</h2>
            </ListGroup.Item>
            <ListGroup.Item>
                <Row>
                  <Col>Items:</Col>
                  <Col>${itemsPrice}</Col>
                </Row>
            </ListGroup.Item>
            <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>${shippingPrice.toFixed(2)}</Col>
                </Row>
            </ListGroup.Item>
            <ListGroup.Item>
                <Row>
                  <Col>Tax:</Col>
                  <Col>${taxPrice}</Col>
                </Row>
            </ListGroup.Item>
            <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>
                  <Col>${totalPrice}</Col>
                </Row>
            </ListGroup.Item>
             <ListGroup.Item className="d-flex justify-content-center">
                <Button
                  id="placeorder-btn"
                  className="m-1"
                  type="button"
                  onClick={placeOrderHandler}
                >
                  {isLoading ? (
                    <Loader width={30} height={30} />
                  ) : (
                    "Place Order"
                  )}
                </Button>
            </ListGroup.Item>
        </ListGroup>
    </Card>
  )
}
