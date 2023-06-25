const Checkbox = ({ onChange, text, state }) => {
  return (
    <div>
      <input type="checkbox" onChange={onChange} checked={state} />
      <label> {text}</label>
    </div>
  );
};

export default Checkbox;
