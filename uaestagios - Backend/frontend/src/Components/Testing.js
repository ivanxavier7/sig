import React, { useEffect, useState } from 'react'

function Testing() {

    const [count, setCount] = useState(1)
    
    useEffect(()=>{
        console.log('This is our use effect 1');
    }, [])

    useEffect(()=>{
        console.log(`The current count is: ${count}`);
    }, [count])

    function IncreaseCount() {
        setCount(current=>current + 1)
    }

    function DecreaseCount() {
        setCount(current=>current - 1)
    }

    return (
        <>
            <h1>The current count is: {count}</h1>
            <button onClick={IncreaseCount}>Increase</button>
            <br />
            <button onClick={DecreaseCount}>Decrease</button>
        </>
    )
}

export default Testing