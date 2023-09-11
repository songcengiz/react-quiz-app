function Questions({ question, answer, dispatch, secRemaining }) {
  const { question: que, options, correctOption } = question;

  const hasAnswer = answer !== null;

  function handleSubmit(index) {
    const newQuestion = { que, options, correctOption, index, secRemaining };
    dispatch({ type: "newAnswer", payload: index });
    dispatch({ type: "addQuestion", payload: newQuestion });
  }
  return (
    <div>
      <h4>{que}</h4>
      <div className="options">
        {options.map((option, index) => (
          <button
            key={index}
            disabled={hasAnswer}
            className={`btn btn-option ${answer === index ? "answer" : ""} ${
              hasAnswer ? (index === correctOption ? "correct" : "wrong") : ""
            }`}
            onClick={() => handleSubmit(index)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Questions;
