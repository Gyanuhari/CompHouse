import { useState, type ChangeEvent } from "react";

export default function useInput(
  initialValue: string,
  validators: (value: string) => boolean
) {
  const [value, setValue] = useState(initialValue);
  const [isEdited, setIsEdited] = useState(false);

  const hasError = isEdited && !validators(value);

  const handleInputBlur = () => setIsEdited(true);
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) =>
    setValue(event.target.value);

  return {
    value,
    hasError,
    handleInputBlur,
    handleInputChange,
  };
}
