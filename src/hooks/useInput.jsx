import { useEffect, useState } from "react";

export default function useInput(defaultValue, validationFn) {
  const [enteredValue, setEnteredValue] = useState(defaultValue);
  useEffect(() => {
    if (defaultValue) {
      setEnteredValue(defaultValue);
    }
  }, [defaultValue]);

  const [didEdit, setDidEdit] = useState(false);

  let isValid = true;
  if (validationFn) {
    isValid = validationFn(enteredValue);
  }

  const handleInputChange = (event) => {
    if (event) {
      setEnteredValue(event.target.value);
    } else {
      setEnteredValue("");
    }
    setDidEdit(false);
  };

  const handleInputBlur = () => {
    setDidEdit(true);
  };

  return {
    value: enteredValue,
    handleInputBlur,
    handleInputChange,
    hasError: didEdit && !isValid,
  };
}
