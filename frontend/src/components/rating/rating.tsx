import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import "./rating.css";

interface IProps {
  value: number;
  text?: string;
  handleChangeRating?(value: number): void;
}

export const Rating = (props: IProps) => {
  const { value, text, handleChangeRating } = props;

  const handleStarClick = (index: number) => {
    let newValue = index + 1;
    if (value === newValue) {
      newValue -= 0.5;
    }
    handleChangeRating && handleChangeRating(newValue);
  };
  const stars = [];

  for (let i = 0; i < 5; i++) {
    if (value >= i + 1) {
      stars.push(<FaStar key={i} onClick={() => handleStarClick(i)} />);
    } else if (value >= i + 0.5) {
      stars.push(<FaStarHalfAlt key={i} onClick={() => handleStarClick(i)} />);
    } else {
      stars.push(<FaRegStar key={i} onClick={() => handleStarClick(i)} />);
    }
  }
  return (
    <div className="rating">
      {stars.map((star, index) => (
        <span key={index}>{star}</span>
      ))}
      <span className="text">{text}</span>
    </div>
  );
};
