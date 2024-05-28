type CounterState = {
    count: number;
    status: string;
}

type CounterAction = {
    type: 'increment' | 'decrement' | 'reset'
}

type TStatusAction = {
    type: 'setStatus';
    payload: 'active' | 'inactive'
}

type TAction = CounterAction | TStatusAction;

export const initialState: CounterState = {
    count: 0,
    status: 'Pending...'
}

export const counterReducer = (state: CounterState, action: TAction): CounterState => {
    switch (action.type) {
        case 'increment':
            return {...state, count: state.count + 1}
        case 'decrement':
            return {...state, count: state.count - 1}
        case 'reset':
            return {...initialState}        
        case 'setStatus':
            return {...state, status: action.payload }
        default:
            const unhandledActionType: never = action;
            throw new Error(
              `Unexpected action type: ${unhandledActionType}. Please double check the counter reducer.`
            );
    }
}