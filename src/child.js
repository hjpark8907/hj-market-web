function ChildComponent(props){
    const {name, age} = props;
    return <div>
        <p> name is {name}, and {age} old years.</p>
        </div>
}

export default ChildComponent