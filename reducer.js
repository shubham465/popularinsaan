export const initialState = {
    user: null,
    participants: null,
    results: null
};

export const actionTypes ={
    SET_USER: "SET_USER",
    fetchdata: "fetchdata",
    fetchresult: "fetchresult"
};

const reducer =(state, action) =>{
    console.log(action);
    switch(action.type){
        case actionTypes.SET_USER:
        return{
           ...state,
            user: action.user,
        };

        case actionTypes.fetchdata:
        return {
            ...state,
            participants: action.participants
        }

        case actionTypes.fetchresult:
            return {
                ...state,
                results: action.results
            }

        default:
            return state;
    }
};

export default reducer;