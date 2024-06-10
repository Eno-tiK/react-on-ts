import React from "react";
import { TFunction } from "../Graph2D";
import Func from "./Func/Func";

export type TUI2D = {
    funcs: TFunction[];
    changeFunction: () => void;
    deleteFunction?: (index: number) => void;
}

const UI2D: React.FC<TUI2D> = (props: TUI2D) => {
    const { funcs, changeFunction } = props;
    const [count, setCount] = React.useState<number>(funcs.length);

    const addFunctionHandler = () => {
        const func = {
            f: (x: number) => 0,
            color: 'black',
            width: 2
        };
        funcs.push(func);
        setCount(funcs.length);
    }

    const deleteFunction = (index: number) => {
        funcs.splice(index, 1);
        setCount(funcs.length);
        changeFunction();
    }

    return (<>
        <button className="beautyButton" onClick={addFunctionHandler}>+</button>
        <div className="func">{
            funcs.map((func, index) =>
                <Func key={index} func={func} changeFunction={changeFunction} deleteFunction={deleteFunction}/>
            )
        }</div>
    </>);
}

export default UI2D