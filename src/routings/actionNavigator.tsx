export const actionNavigateTo = (route: string, params?: {}) => ({
   type: route,
   payload: params
});