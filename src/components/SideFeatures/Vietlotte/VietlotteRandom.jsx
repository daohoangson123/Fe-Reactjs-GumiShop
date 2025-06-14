import { useState } from 'react';
import './VietlotteRandom.css';

function App() {
    const [lotteList, setLotteList] = useState([]);
    const [lotteType, setLotteType] = useState('Mega');

    const initialLotte = {
        id: '?',
        type: lotteType,
        value: ['?', '?', '?', '?', '?', '?'],
    };
    const [lotteNumbers, setLotteNumbers] = useState(initialLotte.value);

    const count = 6;

    const lotte = [
        { type: 'Mega', value: 45 },
        { type: 'Power', value: 55 },
    ];

    const compareNumbers = (a, b) => {
        return a - b;
    };

    const changeLotteType = (type) => {
        setLotteNumbers(initialLotte.value);
        setLotteType(type);
    };

    const roll = (max) => {
        let temp = [];
        for (let index = 0; index < count; index++) {
            const num = Math.floor(Math.random() * max + 1);
            if (!temp.includes(num)) {
                temp = [...temp, num];
            } else {
                index = index - 1;
            }
        }

        const result = {
            id: temp.toString().split(',').join(''),
            type: lotteType,
            value: temp,
        };

        setLotteNumbers(temp);

        setLotteList([
            ...lotteList,
            { ...result, value: temp.sort(compareNumbers) },
        ]);
    };

    const reset = () => {
        setLotteNumbers(initialLotte.value);
        setLotteList([]);
    };

    const random = (max) => {
        roll(max);
    };

    return (
        <div
            style={{
                width: 'min(320px, 80vw)',
                margin: 'auto',
                padding: '10px',
                background: 'var(--color-alt-rgba-1)',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    gap: '20px',
                    justifyContent: 'space-evenly',
                }}
            >
                {lotte.map((item) => (
                    <button
                        key={item.type}
                        onClick={() => changeLotteType(item.type)}
                        style={{
                            color: 'white',
                            background:
                                item.type === 'Mega' && lotteType === 'Mega'
                                    ? 'red'
                                    : item.type === 'Power' &&
                                        lotteType === 'Power'
                                      ? 'orange'
                                      : 'gray',
                        }}
                        className={`lottetypebutton ${lotteType}`}
                    >
                        {item.type} : 6/{item.value}
                    </button>
                ))}
            </div>
            <div
                style={{
                    display: 'flex',
                    gap: '10px',
                    justifyContent: 'center',
                    margin: '20px',
                }}
            >
                {lotteNumbers?.map((lotteNum, lotteNumIndex) => (
                    <div
                        className="lottenumber"
                        style={{
                            display: 'grid',
                            placeItems: 'center',
                            width: '35px',
                            height: '35px',
                            borderRadius: '100%',
                            color: 'white',
                            background: lotteType === 'Mega' ? 'red' : 'orange',
                            animationDelay: `${(lotteNumIndex + 0.1) * 0.1}s`,
                        }}
                        key={(lotteNumIndex + 1) * Math.random()}
                    >
                        {lotteNum}
                    </div>
                ))}
            </div>
            <div
                style={{
                    display: 'flex',
                    gap: '20px',
                    justifyContent: 'space-evenly',
                }}
                className="vietlotteactions"
            >
                <button
                    style={{
                        color: 'white',
                        background: lotteType === 'Mega' ? 'red' : 'orange',
                    }}
                    onClick={() => random(lotteType === 'Mega' ? 45 : 55)}
                >
                    Roll
                </button>

                <button
                    style={{
                        color: 'white',
                        background: lotteType === 'Mega' ? 'red' : 'orange',
                    }}
                    onClick={reset}
                >
                    Reset
                </button>
            </div>
            <div>
                Lotte List
                <div style={{ maxHeight: '300px', overflow: 'auto' }}>
                    {lotteList
                        .map((lotteItem, lotteItemIndex) => (
                            <div
                                key={lotteItem.id * Math.random()}
                                style={{
                                    display: 'flex',
                                    gap: '10px',
                                    justifyContent: 'space-between',
                                    padding: '10px',
                                    border: '1px solid black',
                                }}
                            >
                                <div
                                    style={{
                                        width: '25px',
                                        height: '25px',
                                    }}
                                >
                                    {lotteItemIndex + 1}
                                </div>
                                {lotteItem?.value?.map((lotteItemNum) => (
                                    <div
                                        style={{
                                            display: 'grid',
                                            placeItems: 'center',
                                            width: '25px',
                                            height: '25px',
                                            borderRadius: '100%',
                                            color: 'white',
                                            background:
                                                lotteItem.type === 'Mega'
                                                    ? 'red'
                                                    : 'orange',
                                        }}
                                        key={lotteItemNum}
                                    >
                                        {lotteItemNum}
                                    </div>
                                ))}
                            </div>
                        ))
                        .reverse()}
                </div>
            </div>
        </div>
    );
}

export default App;
