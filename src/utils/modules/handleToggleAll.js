export const handleToggleAll = (
  items,
  union,
  numberOfChecked,
  not,
  checked,
  setChecked
) => {
  if (numberOfChecked(items) === items.length) {
    setChecked(not(checked, items));
  } else {
    setChecked(union(checked, items));
  }
};
