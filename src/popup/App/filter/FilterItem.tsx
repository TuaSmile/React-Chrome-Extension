import classNames from "classnames";

import Checkbox from "./Checkbox";

const FilterItem = ({
  label,
  isChecked,
  isLastOne,
  onClick,
}: {
  label: string;
  isChecked: boolean;
  isLastOne?: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      className={classNames(
        "flex items-center justify-between border-b border-[#C9C8C8] pb-2 pt-2",
        isLastOne && "border-none pb-0",
      )}
      onClick={onClick}
    >
      <p>{label}</p>
      <Checkbox isChecked={isChecked} />
    </div>
  );
};

export default FilterItem;
