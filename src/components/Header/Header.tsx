import React from 'react';
import { EPAGES } from '../../App';

import './Header.css';

type THeader = {
    setPageName: (name: EPAGES) => void;
}

const Header: React.FC<THeader> = (props: THeader) => {
    const { setPageName } = props;

    return (<div className='HeaderMenu'>
        <button onClick={() => setPageName(EPAGES.ESSAY)} className='HeaderBtn'>Esse</button>
        <button onClick={() => setPageName(EPAGES.STUDENT_SIMULATOR)} className='HeaderBtn'>RPG</button>
        <button onClick={() => setPageName(EPAGES.TARGET_SHOOTER)} className='HeaderBtn'>Shoot</button>
        <button onClick={() => setPageName(EPAGES.UNIVERSAL_CALCULATOR)} className='HeaderBtn'>Calc</button>
        <button onClick={() => setPageName(EPAGES.GRAPH_2D)} className='HeaderBtn'>Graph2D</button>
        <button onClick={() => setPageName(EPAGES.GRAPH_3D)} className='HeaderBtn'>Graph3D</button>
    </div>);
}

export default Header;