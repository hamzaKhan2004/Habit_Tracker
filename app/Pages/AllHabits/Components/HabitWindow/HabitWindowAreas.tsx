import React from "react";
import MultipleSelectChip from "./MultipleSelectChip";
function HabitWindowAreas({
  onChange,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (selectedItems: any) => void;
}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function getSelectedItems(selectedItems: any) {
    onChange(selectedItems);
  }
  return (
    <div className="flex flex-col gap-2 mt-10 px-3">
      <span className="font-semibold text-[17px]">Areas</span>
      <MultipleSelectChip onChange={getSelectedItems} />
    </div>
  );
}

export default HabitWindowAreas;
