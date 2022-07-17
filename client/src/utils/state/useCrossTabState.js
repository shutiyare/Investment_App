import { useState, useEffect, useRef } from 'react';

function useCrossTabState(stateKey, defaultValue) {
    function initialState(){
        const localData = localStorage.getItem(stateKey);
        return localData ? JSON.parse(localData) : defaultValue
    }
    const [state, setState] = useState(initialState());
    // console.log("crossTab => state: ", state);
    const isNewSession = useRef(true);

    useEffect(() => {
        // console.log("crossTab.useEffect1 => state: ", state);
        if (isNewSession.current) {
            const currentState = localStorage.getItem(stateKey);
            if (currentState) {
                setState(JSON.parse(currentState));
            } else {
                setState(defaultValue);
            }
            isNewSession.current = false;
            return
        }
        try {
            localStorage.setItem(stateKey, JSON.stringify(state));
        } catch (error) { }
    }, [state, stateKey, defaultValue]);

    useEffect(() => {
        const onReceieveMessage = (e) => {
            const { key, newValue } = e
            if (key === stateKey) {
                setState(JSON.parse(newValue))
            }
        }
        window.addEventListener('storage', onReceieveMessage)
        return () => window.removeEventListener('storage', onReceieveMessage)
    }, [stateKey, setState]);
    // console.log("returnining in crossTab");

    return {state, setState}
}




export default useCrossTabState;