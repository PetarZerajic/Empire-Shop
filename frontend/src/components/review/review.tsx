import { Button, Form, ListGroup } from "react-bootstrap";
import { Message } from "../../components/message/message";
import { Link } from "react-router-dom";
import { Rating } from "../../components/rating/rating";
import { IUserInfo } from "../../interfaces/IUsers";
import { IProducts } from "../../interfaces/IProducts";
import { Routes } from "../../router/routes";
import { ChangeEvent, FormEvent } from "react";

interface IProps {
  isReviewAdded: unknown;
  userInfo: IUserInfo | null;
  inputValues: { rating: number; comment: string };
  isLoading: boolean;
  product: { data: IProducts };
  handleOnSubmit(event: FormEvent): Promise<void>;
  handleChangeRating(value: number): void;
  handleChange(event: ChangeEvent<HTMLInputElement>): void;
}

export const Review = (props:IProps) => {
    const { isReviewAdded,userInfo, handleOnSubmit,inputValues,handleChangeRating,
        handleChange,isLoading,product} = props;
       return (
         <>
           <h2>{isReviewAdded ? "Reviews" : "Create Review"}</h2>
           {userInfo ? (
             <div className="mt-4">
               {!isReviewAdded ? (
                 <Form onSubmit={handleOnSubmit}>
                   <Form.Group controlId="rating" className="my-2">
                     <Form.Label>Rating</Form.Label>
                     <Rating
                       value={inputValues.rating}
                       handleChangeRating={handleChangeRating}
                     />
                   </Form.Group>
                   <Form.Group className="my-2">
                     <Form.Label>Comment</Form.Label>
                     <Form.Control
                       as="textarea"
                       name="comment"
                       value={inputValues.comment}
                       onChange={handleChange}
                     />
                   </Form.Group>
                   <Button disabled={isLoading} type="submit">
                     Submit
                   </Button>
                 </Form>
               ) : null}
             </div>
           ) : (
             <Message>
               Please <Link to={Routes.Login}>log in</Link> to write a review
             </Message>
           )}
           <ListGroup.Item className="mt-5" variant="flush">
             {product.data.reviews?.map((review) => (
               <ListGroup.Item key={review._id}>
                 <strong>{review.name}</strong>
                 <Rating value={review.rating} />
                 <p>{review.createdAt?.substring(0, 10)}</p>
                 <p>{review.comment}</p>
               </ListGroup.Item>
             ))}
           </ListGroup.Item>
         </>
        )}
