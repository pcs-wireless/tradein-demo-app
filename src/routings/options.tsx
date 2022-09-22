export default {
    onBeforeChange: async (dispatch: any, getState: () => { (): any; new(): any; location: { type: any; }; }, { action }: any) => {
      // On before router change codes here
      const { type } = getState().location;
    },
    onAfterChange: async (dispatch: any, getState: any, { action }: any) => {
      // On after router change codes here
    }
  };
  