const combineThunks = (...thunks: []) => (dispatch: any): void => {
    thunks.forEach(thunk => dispatch(thunk));
  };
    
  export default combineThunks;
    