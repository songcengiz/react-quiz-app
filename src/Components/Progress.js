function Progress({ index, numQuestions, maxPoints, answer, point }) {
  return (
    <div className="progress">
      <progress max={numQuestions} value={index + Number(answer !== null)} />
      <p>
        Question <strong> {index}</strong>/{numQuestions}
      </p>
      <p>
        <strong> {point}</strong>/{maxPoints}
      </p>
    </div>
  );
}

export default Progress;
