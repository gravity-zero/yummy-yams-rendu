const initialState = {
  isAuthenticated: false,
  user: null,
  error: null,
};
  
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // Définissez les cas pour gérer les actions d'inscription et de connexion réussies ou échouées
    default:
      return state;
  }
};
  
export default authReducer;