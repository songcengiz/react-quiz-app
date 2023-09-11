function StartScreen({ dispatch, numQuestions }) {
  return (
    <div className="start">
      <h2>Welcome to React Quiz App</h2>
      <h3>
        {" "}
        <strong>{numQuestions}</strong> questions to test your React mastery
      </h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "filter" })}
      >
        Let's Start
      </button>
    </div>
  );
}

export default StartScreen;
