import React, { KeyboardEvent } from "react";
import { TFunction } from "../../Graph2D";
import { TUI2D } from "../UI2D";

import './Func.css'

type TFunc = Omit<TUI2D, 'funcs'> & { 
    func: TFunction;
}

const Func: React.FC<TFunc> = (props: TFunc) => {
    const { func, changeFunction, deleteFunction } = props;

    const funcChange = (event: KeyboardEvent<HTMLInputElement>) => {
        try {
            let f = (x: number) => 0;
            eval(`f = function(x) {return ${event.currentTarget.value};}`);
            func.f = f;
            changeFunction();
        } catch (e) {
            //console.log('ошибка ввода', e);
        }
    }
    
    const colorChange = (event: KeyboardEvent<HTMLInputElement>) => {
        func.color = event.currentTarget.value;
        changeFunction();
    }  

    const widthChange = (event: KeyboardEvent<HTMLInputElement>) => {
        let width = parseInt(event.currentTarget.value);
        func.width = width;
        changeFunction();
    }  
    
    return (<div>
            <input onKeyUp={funcChange} placeholder="f(x)" className="funcBtn"/>
            <input onKeyUp={colorChange} placeholder="color" className="funcBtn"/>
            <input onKeyUp={widthChange} placeholder="width" className="funcBtn"/>
            <button>Удалить</button>
        </div>);
}

export default Func