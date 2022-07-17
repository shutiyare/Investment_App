import { createContext, useContext } from "react";
import useCrossTabState from "./useCrossTabState";

const StateContext = createContext();

const StateProvider = ({ children }) => {
    const {state, setState} = useCrossTabState("dahabInv",{});
    // console.log("ContextAPI => state = ", state);
    // const providerValue = useMemo(()=>{}, [state, setState]);
    return (
        <StateContext.Provider value={{ state, setState }}>
            {children}
        </StateContext.Provider>
    );
};

export default StateProvider;
export const useStateContext = () => useContext(StateContext);