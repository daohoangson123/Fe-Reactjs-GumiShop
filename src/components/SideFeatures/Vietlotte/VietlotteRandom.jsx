import { useState } from 'react';
import './VietlotteRandom.css';

function App() {
    const initialLotte = ['?', '?', '?', '?', '?', '?'];
    const [lotteNumbers, setLotteNumbers] = useState(initialLotte);

    const [sort, setSort] = useState(false);

    const [lotteType, setLotteType] = useState('Mega');

    const count = 6;

    const lotte = [
        { type: 'Mega', value: 45 },
        { type: 'Power', value: 55 },
    ];

    const compareNumbers = (a, b) => {
        return a - b;
    };

    const changeLotteType = (type) => {
        setLotteNumbers(initialLotte);
        setLotteType(type);
    };

    const roll = (max) => {
        let temp = [];
        for (let index = 0; index < count; index++) {
            const num = Math.floor(Math.random() * max + 1);
            if (!temp.includes(num)) {
                temp.push(num);
            } else {
                index = index - 1;
            }
            if (sort) {
                setLotteNumbers(temp.sort(compareNumbers));
            } else {
                setLotteNumbers(temp);
            }
        }
    };

    const random = (max) => {
        setLotteNumbers([]);
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
                {lotteNumbers?.map((item, index) => (
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
                            animationDelay: `${index * 0.2}s`,
                        }}
                        key={item + Math.random()}
                    >
                        {item}
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
                    onClick={() => setSort(!sort)}
                >
                    Sort - {sort ? 'ON' : 'OFF'}
                </button>
                <button
                    style={{
                        color: 'white',
                        background: lotteType === 'Mega' ? 'red' : 'orange',
                    }}
                    onClick={() => setLotteNumbers(initialLotte)}
                >
                    Reset
                </button>
            </div>
        </div>
    );
}

export default App;
