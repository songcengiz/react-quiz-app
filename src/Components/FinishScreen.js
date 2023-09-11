function FinishScreen({ point, maxPoints, dispatch, reviewQuestions }) {
  const percent = Math.ceil((point / maxPoints) * 100);
  let emoji;
  if (percent === 100) emoji = "🥇";
  if (percent >= 80 && percent < 100) emoji = "🥳";
  if (percent >= 50 && percent < 80) emoji = "🧘🏻";
  if (percent >= 0 && percent < 50) emoji = "😑";
  if (percent === 0) emoji = "🤦🏻‍♀️";
  return (
    <>
      <p className="result">
        <span>{emoji}</span>
        Your scored <strong>{point}</strong> out of {maxPoints} ({percent}%)
      </p>

      <button className="rating" onClick={() => dispatch({ type: "rating" })}>
        🌟Do you want to evaluate our application?
      </button>

      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart Quiz
      </button>
      {reviewQuestions.length > 0 && (
        <button
          className="btn timer"
          onClick={() => dispatch({ type: "review" })}
        >
          Review Answer
        </button>
      )}
    </>
  );
}

export default FinishScreen;
