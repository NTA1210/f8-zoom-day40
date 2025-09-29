const Redux = {
  __DO_NOT_USE__ActionTypes: { type: "@@redux/INIT" },
  createStore(reducer, initState) {
    let state = reducer(initState, this.__DO_NOT_USE__ActionTypes);

    const listeners = [];

    return {
      getState() {
        return state;
      },
      dispatch(action) {
        state = reducer(state, action);

        listeners.forEach((listener) => listener());
      },
      subscribe(listener) {
        if (typeof listener === "function") {
          listeners.push(listener);
        }

        return () => {
          const index = listeners.indexOf(listener);
          if (index > -1) {
            listeners.splice(index, 1);
          }
        };
      },
    };
  },
};

export default Redux;
