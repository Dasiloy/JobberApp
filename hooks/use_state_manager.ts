import React from "react";
import { produce } from "immer";

interface ObjectOnly {}

interface UseManageState<T extends ObjectOnly> {
  defaultValue: T;
  useTemp?: boolean | (keyof T)[];
  onReset?: (current: T) => void;
  onManageState?: (key: keyof T, value: any, prev: T) => void;
}

const useStateManager = <T extends ObjectOnly>({
  defaultValue,
  onReset,
  onManageState,
  useTemp = false,
}: UseManageState<T>) => {
  const [state, setState] = React.useState<T>(defaultValue);
  const [tempState, setTempState] = React.useState<T>(defaultValue);

  const isTempAll = typeof useTemp === "boolean" && useTemp === true;
  const useTempKeys = Array.isArray(useTemp) ? useTemp : null;

  const manage = <K extends keyof T>(key: K, value: T[K]) => {
    const isTempForKey =
      isTempAll || !!(useTempKeys && useTempKeys.includes(key));

    if (isTempForKey) {
      setTempState((prev) => ({ ...prev, [key]: value }));
    } else {
      setState((prev) => ({ ...prev, [key]: value }));
    }
    onManageState?.(key, value, state);
  };

  const set = (newState: Partial<T> | ((prevState: T) => Partial<T>)) => {
    if (typeof newState === "function") {
      if (isTempAll) {
        setTempState((prev) => ({
          ...prev,
          ...(newState(prev) as Partial<T>),
        }));
      } else if (useTempKeys) {
        setTempState((prevTemp) => {
          const nextState = newState(prevTemp);
          const updatedTemp = { ...prevTemp };
          const updatedState = { ...state };

          Object.keys(nextState).forEach((key) => {
            if (useTempKeys.includes(key as keyof T)) {
              updatedTemp[key as keyof T] = nextState[key as keyof T]!;
            } else {
              updatedState[key as keyof T] = nextState[key as keyof T]!;
            }
          });

          setState(updatedState);
          return updatedTemp;
        });
      } else {
        setState((prev) => ({
          ...prev,
          ...(newState(prev) as Partial<T>),
        }));
      }
    } else {
      if (isTempAll) {
        setTempState((prev) => ({
          ...prev,
          ...newState,
        }));
      } else if (useTempKeys) {
        const updatedTemp = { ...tempState };
        const updatedState = { ...state };

        Object.keys(newState).forEach((key) => {
          if (useTempKeys.includes(key as keyof T)) {
            updatedTemp[key as keyof T] = newState[key as keyof T]!;
          } else {
            updatedState[key as keyof T] = newState[key as keyof T]!;
          }
        });

        setState(updatedState);
        setTempState(updatedTemp);
      } else {
        setState((prev) => ({
          ...prev,
          ...newState,
        }));
      }
    }
  };

  const applyTemp = () => {
    if (useTempKeys) {
      setState((prevState) => {
        const newState = { ...prevState };

        useTempKeys.forEach((key) => {
          if (key in tempState) {
            (newState[key] as T[keyof T]) = tempState[key];
          }
        });

        return newState;
      });
    } else if (isTempAll) {
      setState(tempState);
    }
  };

  const cancelTemp = () => {
    if (isTempAll) {
      setTempState(state);
    } else if (Array.isArray(useTempKeys) && useTempKeys.length > 0) {
      setTempState((prevTempState) =>
        produce(prevTempState, (draft: T) => {
          useTempKeys.forEach((key) => {
            draft[key as keyof T] = state[key as keyof T];
          });
        })
      );
    }
  };

  const reset = () => {
    setState(defaultValue);
    setTempState(defaultValue);
    onReset?.(state);
  };

  const stateManager = {
    set,
    reset,
    applyTemp,
    cancelTemp,
    manage,
    setRaw: setState,
  };

  return [state, stateManager, defaultValue, tempState] as [
    T,
    StateManager<T>,
    T,
    T
  ];
};

export interface StateManager<T> {
  reset: () => void;
  applyTemp: () => void;
  cancelTemp: () => void;
  set: (newState: T | ((prevState: T) => T)) => void;
  manage: <K extends keyof T>(key: K, value: T[K]) => void;
  setRaw: React.Dispatch<React.SetStateAction<T>>;
}

export default useStateManager;
