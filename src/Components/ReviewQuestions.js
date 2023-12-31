import { useQuiz } from "../contexts/QuizContext";

function ReviewQuestions() {
  const { reviewQuestions, index, secCompleted } = useQuiz();
  const {
    que,
    index: index2,
    correctOption,
    options,
    secRemaining,
  } = reviewQuestions.at(index);
  const secFinished = secCompleted - secRemaining;
  const min = Math.ceil(Math.abs(secFinished / 60));
  const sec = Math.floor(Math.abs(secFinished % 60));
  console.log(min, sec);

  return (
    <div>
      <div className="progress">
        {min < 10 && "0"}
        {min}:{sec < 10 && "0"}
        {sec}
      </div>

      <h4>{que}</h4>

      <div className="options">
        {options.map((option, i) => (
          <button
            key={i}
            disabled
            className={`btn btn-option ${index2 === i ? "answer" : ""} ${
              i === correctOption ? "correct" : "wrong"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ReviewQuestions;
