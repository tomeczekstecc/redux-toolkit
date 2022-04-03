import React, {useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {increment, decrement, reset, incrementByAmount} from "./counterSlice";


const Counter = () => {

    const count = useSelector(state => state.counter.count);
    const dispatch = useDispatch();

    const [incrementAmount, setIncrementAmount] = useState(5)

    const resetAll = () => {
        setIncrementAmount(0)
        dispatch(reset())
    }

    return <section>
        <p>Count: {count}</p>
        <div>
            <button onClick={() => dispatch(increment())}>+</button>
            <button onClick={() => dispatch(decrement())}>-</button>
            <div>
                <button onClick={() => dispatch(reset())}>0</button>
                <button
                    onClick={() => dispatch(incrementByAmount(incrementAmount))}>{incrementAmount}</button>
            </div>
            <input value={incrementAmount} onChange={e => setIncrementAmount(
                +e.target.value)}/>
            <button onClick={() => resetAll()}>Reset all</button>
        </div>
    </section>
};

export default Counter;
