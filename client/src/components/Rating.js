import { AiFillStar, AiOutlineStar } from "react-icons/ai";
export default function Rating({ rating, Click, style }) {
  return (
    // simply onClick execute the function given by parent
    <>
      {/* with every star (which is a button of raw form ) there is a function which det the ind and  onClick alls the function   */}
      {[...Array(5)].map((ele, ind) => {
        return (
          <span key={ind} onClick={() => Click(ind)} style={style}>
            {/* onCLick is liked with each buttom and on clicking of anyone the inital star is set up  */}
            {rating >= ind + 1 ? (
              <AiFillStar fontSize="15px" />
            ) : (
              <AiOutlineStar fontSize="15px" />
            )}
          </span>
        );
      })}
    </>
  );
}
