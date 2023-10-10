import { useState } from "react";
import { useQuiz } from "../contexts/QuizContext";
function UserRating() {
  const { color, maxRating = 10, userRating, dispatch } = useQuiz();
  const [templateRate, setTemplateRate] = useState(0);
  return (
    <div>
      <div className="star">
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            color={color}
            onRate={() => dispatch({ type: "rating", payload: i + 1 })}
            full={templateRate ? templateRate >= i + 1 : userRating >= i + 1}
            onMouseOver={() => setTemplateRate(i + 1)}
            onMouseOut={() => setTemplateRate(0)}
          />
        ))}
        <h3>
          {templateRate === 10 && "😂"}
          {templateRate < 10 && templateRate >= 8 && "😃"}
          {templateRate < 8 && templateRate >= 5 && "🙂"}
          {templateRate < 5 && templateRate >= 0 && "😢"}
        </h3>
      </div>
      {userRating >= 1 && (
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "restart" })}
        >
          Thanks For Rating
        </button>
      )}
    </div>
  );
}

function Star({ onRate, full, onMouseOver, onMouseOut, color = "#ffa94d" }) {
  return (
    <div
      className="btn-star"
      onClick={() => onRate()}
      onMouseEnter={onMouseOver}
      onMouseLeave={onMouseOut}
    >
      {full ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={color}
          stroke={color}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke={color}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="{2}"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      )}
    </div>
  );
}

export default UserRating;
