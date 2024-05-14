import { Button, Form, ListGroup } from "react-bootstrap";
import { Message } from "../../components/message/message";
import { Link } from "react-router-dom";
import { Rating } from "../../components/rating/rating";
import { IUserInfo } from "../../interfaces/IUsers";
import { IProducts } from "../../interfaces/IProducts";
import { Routes } from "../../router/routes";
import { ChangeEvent, FormEvent } from "react";

interface IProps {
  isReviewExist: unknown;
  userInfo: IUserInfo | null;
  inputValues: { rating: number; comment: string };
  reviewLoading: boolean;
  product: { data: IProducts } | undefined;
  handleOnSubmit(event: FormEvent): Promise<void>;
  handleChangeRating(value: number): void;
  handleChange(event: ChangeEvent<HTMLInputElement>): void;
}

export const Review = (props:IProps) => {
    const reviewIsNotAdded = !props.isReviewExist;
       return (
         <>
           <h2>{props.isReviewExist ? "Reviews" : "Create Review"}</h2>
           {props.userInfo ? (
             <div className="mt-4">
               {reviewIsNotAdded && (
                 <Form onSubmit={props.handleOnSubmit}>
                   <Form.Group controlId="rating" className="my-2">
                     <Form.Label>Rating</Form.Label>
                     <Rating
                       value={props.inputValues.rating}
                       handleChangeRating={props.handleChangeRating}
                     />
                   </Form.Group>
                   <Form.Group className="my-2">
                     <Form.Label>Comment</Form.Label>
                     <Form.Control
                       as="textarea"
                       name="comment"
                       value={props.inputValues.comment}
                       onChange={props.handleChange}
                     />
                   </Form.Group>
                   <Button disabled={props.reviewLoading} type="submit">
                     Submit
                   </Button>
                 </Form>
               )}
             </div>
           ) : (
             <Message>
               Please <Link to={Routes.Login}>log in</Link> to write a review
             </Message>
           )}
           <ListGroup.Item className="mt-5" variant="flush">
             {props.product?.data.reviews?.map((review) => (
               <ListGroup.Item key={review._id}>
                 <strong>{review.name}</strong>
                 <Rating value={review.rating} />
                 <p>{review.createdAt?.substring(0, 10)}</p>
                 <p>{review.comment}</p>
               </ListGroup.Item>
             )).reverse()}
           </ListGroup.Item>
         </>
        )}
