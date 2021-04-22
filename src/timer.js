/*import React from 'react';
function TimerComponent(){
    const [time, setTime] = React.useState(0);
    console.log('update component');
    React.useEffect(function(){
        setTime(time+1);
    }, []);
    return <div>
        <h3>{time}</h3>
        <button >up 1 tick</button>
    </div>

}

export default TimerComponent;