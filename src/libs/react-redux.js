import { useEffect, useState } from "react";
import { useContext } from "react";
import { Context } from "@/contexts/ReduxContext";

function useStore() {
  const store = useContext(Context);
  return store;
}

function useSelector(selector) {
  const store = useContext(Context);

  const [value, setValue] = useState(() => {
    return selector(store.getState());
  });

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      if (value === selector(store.getState())) return;
      setValue(selector(store.getState()));
    });

    return () => {
      unsubscribe();
    };
  }, [selector, value, store]);

  return value;
}

function useDispatch() {
  const store = useContext(Context);

  return store.dispatch;
}

export { useStore, useSelector, useDispatch };
