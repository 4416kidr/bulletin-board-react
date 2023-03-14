import React, { useEffect } from "react";
import { useState } from "react";

export function ThreadList() {
    const [threadList, setThreadList] = useState(null);
    const [threadOffset, setThreadOffset] = useState(0);
    function GetThreadList(offset) {
        const url = 'https://2y6i6tqn41.execute-api.ap-northeast-1.amazonaws.com/threads?offset=' + offset;
        fetch(url)
            .then((res) => res.json())
            .then((result) => {
                setThreadList(result);
                console.log(result);
            },
            (error) => {
                console.log('fetch error');
            })    
    }
    function NextClickHandler() {
        setThreadOffset(threadOffset + 10);
        GetThreadList(threadOffset);
    }
    function ResetClickHandler() {
        setThreadOffset(0);
        GetThreadList(threadOffset);
    }
    useEffect(() => GetThreadList(threadOffset, setThreadList), [])
    if (threadList == null) return (<div><p>loading...</p></div>)
    return (
        <div>
            <button type="button" onClick={NextClickHandler}>Next</button>
            <button type="button" onClick={ResetClickHandler}>Reset</button>
            <p>{threadOffset}～{threadOffset+10}を表示中</p>
            <ol className="thread-list">
                {threadList.map((e, index) => <li className="threads" key={index}>{e.title}</li>)}
            </ol>
        </div>
    )
}