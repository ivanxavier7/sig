import React, { useState } from 'react'

function AppleComponent() {

    const [numberOfApples, setNumberOfApples] = useState(0)

    function appleDisplay(numberOfApples) {
        if (numberOfApples === 1) {
            return `John has ${numberOfApples} apple`;
        }
        else if (numberOfApples > 1) {
            return `John has ${numberOfApples} apples`;
        }
        else {
            return `John owes us ${Math.abs(numberOfApples)} apples`;
        }
        }

    function IncreaseApple() {
        setNumberOfApples((currentValue) => currentValue + 1)
    }

    function DecreaseApple() {
        setNumberOfApples((currentValue) => currentValue - 1)
    }
  return (
    <>
        <div>
        <h1>{appleDisplay(numberOfApples)}</h1>
        </div>
        <button style={{ display: numberOfApples >= 10 ? "None" : ""}} onClick={IncreaseApple} className='add-btn'>Increase</button>
        <button onClick={DecreaseApple} className='decrease-btn'>Decrease</button>
        {numberOfApples > 10 ? <h1>John has too many apples</h1> : ''}
    </>
  )
}

export default AppleComponent