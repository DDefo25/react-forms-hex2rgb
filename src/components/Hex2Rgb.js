import hexRgb from 'hex-rgb';
import { useState } from 'react';

function Hex2Rgb() {
    const [hex, setHex] = useState({
        hex: '#',
        rgb: ''
    });

    function checkHex(str) {
        for(let i = 0; i < str.length; i++) {
            let ch = str[i];
            if ((ch < '0' || ch > '9') &&
                (ch < 'A' || ch > 'F'))
            {
                return false
            }
        }
        return true
    }

    const handleOnChange = ({target}) => {
        const {name, value} = target; 

        if (checkHex(value.substring(1).toUpperCase()) && value.length === 7) {
            setHex(prevHex => ({...prevHex, [name]: value, rgb: hexRgb(value, {format: 'css'})}))
        } else if (value.length > 7 || !checkHex(value.substring(1).toUpperCase())) {
            setHex(prevHex => ({...prevHex, [name]: value, rgb: 'Ошибка!'}))
        } else {
            setHex(prevHex => ({...prevHex, [name]: value[0] !== '#' ? '#' + value : value, rgb: ''}))
        }
    }

    return (
        <div className='background' style={{backgroundColor: hex.rgb}}>
            <form className='form'>
                <input name='hex' className="form-control text-center" value={hex.hex} onChange={handleOnChange}/>
                <input name='rgb' className="rgb form-control text-center" value={hex.rgb} readonly />
            </form>
        </div>
    )
}

export default Hex2Rgb;