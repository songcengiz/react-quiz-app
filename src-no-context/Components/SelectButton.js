function SelectButton({ typeNumber, dispatch }) {
  return (
    <div className="start">
      <h3>Choose Level of the Questions🍩</h3>
      <select
        className="btn btn-ui"
        onChange={(e) =>
          dispatch({ type: "dataSuccess", payload: Number(e.target.value) })
        }
      >
        {" "}
        <option>Choose</option>
        <option value={10}>Easy Questions</option>
        <option value={20}>Medium Questons</option>
        <option value={30}>Difficult Questions</option>
        <option value={0}>All Questions</option>
      </select>
    </div>
  );
}

export default SelectButton;
