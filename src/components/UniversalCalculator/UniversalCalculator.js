import { useRef } from "react";
import Calculator from "../../modules/Calculator/Calculator";
import PolynomialCalculator from "../../modules/Calculator/PolynomialCalculator";

import './UniversalCalculator.css';

const UniversalCalculator = () => {
    const number1Ref = useRef();
    const number2Ref = useRef();
    const resultRef = useRef();
    const countPolyValueRef = useRef();
    const polyAreaRef = useRef();
    const polyNumber1Ref = useRef();
    const polyNumber2Ref = useRef();

    const clearAllBtnHandler = () => {
        number1Ref.current.value = '';
        number2Ref.current.value = '';
        resultRef.current.value = '';
    }

    const clearAllPolyBtnHandler = () => {
        polyAreaRef.current.value = '';
        countPolyValueRef.current.value = '';
    }

    const operandHandler = (operand) => {
        const calc = new Calculator()
        const num1 = calc.getValue(number1Ref.current.value);
        const num2 = calc.getValue(number2Ref.current.value);
        const result = calc[operand](num1, num2);
        resultRef.current.value = result ? result.toString() : 'АшЫПкО!!!';
    }

    const polyOperandHandler = (operand) => {
        const calc = new PolynomialCalculator();
        const num1 = calc.getPolynomial(number1Ref.current.value);
        const num2 = calc.getPolynomial(number2Ref.current.value);
        const result = calc[operand](num1, num2);
        polyAreaRef.current.value = result ? result.toString() : 'АшЫПкО!!!';
    }

    const valueHandler = () => {
        const calc = new PolynomialCalculator();
        const str = polyAreaRef.current.value;
        const a = calc.getValue(str.includes('=') ?
            str.split('=')[1] :
            (str.split('\n').length === 1) ? str.split('\n')[0] : NaN
        );
        const p = (new Calculator()).getValue(countPolyValueRef.current.value);
        if (!(p)) {
            countPolyValueRef.current.value = NaN;
            return;
        }
        const result = a.getValue(p);
        if (result) {
            countPolyValueRef.current.value = result.toString();
        }
    }

    return (
        <div className='allCalc'>
            <div className="block_">
            <p className="nameCalculator">Universal Calculator</p>
                <div className="block">
                    <textarea ref={number1Ref} className="area" placeholder="num1"></textarea>
                    <textarea ref={number2Ref} className="area" placeholder="num2"></textarea>
                    <div>
                        <button onClick={() => operandHandler('add')} className='CalcBtn'>+</button>
                        <button onClick={() => operandHandler('sub')} className='CalcBtn'>-</button>
                        <button onClick={() => operandHandler('mult')} className='CalcBtn'>*</button>
                        <button onClick={() => operandHandler('div')} className='CalcBtn'>/</button>
                        <button onClick={() => operandHandler('pow')} className='CalcBtn'>^</button>
                        <button onClick={() => operandHandler('prod')} className='CalcBtn'>.</button>
                    </div>
                    <textarea ref={resultRef} className="area" placeholder="result" rows="2" cols="20"
                        readOnly></textarea>
                    <button onClick={clearAllBtnHandler} className=''>Clear All</button>
                </div>
            </div>
            <div className="block_">
            <p className="nameCalculator">Polynomial Calculator</p>
                <div className="block">
                    <textarea ref={polyNumber1Ref} className="area" placeholder="poly 1" rows="2" cols="20"></textarea>
                    <textarea ref={polyNumber2Ref} className="area" placeholder="poly 2" rows="2" cols="20"></textarea>
                    <div>
                        <button onClick={() => polyOperandHandler('add')} className='CalcBtn'>+</button>
                        <button onClick={() => polyOperandHandler('sub')} className='CalcBtn'>-</button>
                        <button onClick={() => polyOperandHandler('mult')} className='CalcBtn'>*</button>
                        <button onClick={() => operandHandler('prod')} className='CalcBtn'>.</button>
                    </div>
                    <textarea ref={polyAreaRef} className="area" placeholder="result: "></textarea>
                    <button onClick={clearAllPolyBtnHandler} className=''>clear all</button>
                    <button onClick={valueHandler} className=''>считать значение</button>
                </div>
            </div>
        </div>
    );
}

export default UniversalCalculator;