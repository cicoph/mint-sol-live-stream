import { useState } from 'react';

interface ButtonAttr {
    id: number;
    text: string;
    time: number;
    isDefault: boolean;
}

type ButtonsList = ButtonAttr[];

export type OnChosenFunction = ( arg0: number ) => void;

const btnList: ButtonsList = [
    {
        id: 1,
        text: '5min',
        time: 5,
        isDefault: true,
    },
    {
        id: 2,
        text: '30min',
        time: 30,
        isDefault: false,
    },
    {
        id: 3,
        text: '1h',
        time: 60,
        isDefault: false,
    },
    {
        id: 4,
        text: '3H',
        time: 180,
        isDefault: false,
    },
    {
        id: 5,
        text: '24H',
        time: 1440,
        isDefault: false,
    },
    
];

const ButtonsTime = ( { onChosen } : { onChosen: OnChosenFunction } ) => {
    const defaultBtn = btnList.find( btn => btn.isDefault === true );
    const [ activeButtonId, setActiveButtonId ] = useState( defaultBtn ? defaultBtn.id : null);
    const handleButtonClick = ( button: ButtonAttr ) => {
        setActiveButtonId( Number( button.id ) );
        onChosen( button.time )
    };

    return (
        <div className="inline-flex" role="group">
            { btnList.map( ( button: ButtonAttr ) => 
                <button key={button.id} id={`button-${button.id}`} className={`${button.id === activeButtonId ? 'bg-gray-100' : 'bg-white'} py-2 px-2 mx-2 shadow-sm text-xs font-medium text-gray-900 rounded-md hover:bg-gray-100 hover:text-blue-700`} onClick={ () => handleButtonClick( button ) }>
                    {button.text}
                </button>
            )}
        </div>
    );
}

export default ButtonsTime;