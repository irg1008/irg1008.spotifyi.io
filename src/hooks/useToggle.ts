import { useState } from "react";

const useToggle = (initial: boolean = false) => {
  const [isOn, setIsOn] = useState<boolean>(initial);

  const toggleIsOn = () => setIsOn(!isOn);

  return [isOn, toggleIsOn] as const;
};

export default useToggle;
