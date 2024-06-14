export type NumberInput = number | "";

export const handleNumberInput = (
  event: React.ChangeEvent<HTMLInputElement>,
  setState: React.Dispatch<React.SetStateAction<NumberInput>>
) => {
  const value = event.target.value;
  if (value == "") {
    setState("");
  }
  if (!Number(value) || value.length > 3) {
    return;
  }
  setState(Number(value));
};
