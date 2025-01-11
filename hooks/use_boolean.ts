import React from "react";

interface BooleanFunctions {
  on: VoidFunction;
  off: VoidFunction;
  toggle: VoidFunction;
}
export const useBoolean = (
  initialState: boolean = false
): [boolean, BooleanFunctions] => {
  const [state, setState] = React.useState<boolean>(initialState);

  const setTrue = React.useCallback(() => {
    setState(true);
  }, []);

  const setFalse = React.useCallback(() => {
    setState(false);
  }, []);

  const toggle = React.useCallback(() => {
    setState((prev) => !prev);
  }, []);

  return [
    state,
    {
      on: setTrue,
      off: setFalse,
      toggle,
    },
  ];
};
