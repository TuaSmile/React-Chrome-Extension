const Checkbox = ({ isChecked }: { isChecked: boolean }) => {
  return (
    <div className="h-5 w-5 items-center justify-center">
      {isChecked ? (
        <img src={require("../../../icons/icon-check.png")} alt="" />
      ) : (
        <img src={require("../../../icons/icon-uncheck.png")} alt="" />
      )}
    </div>
  );
};

export default Checkbox;
