import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

export function ThreadList() {
    const [threadList, setThreadList] = useState(null);
    const [threadOffset, setThreadOffset] = useState(0);
    function GetThreadList(offset) {
        const url = 'https://2y6i6tqn41.execute-api.ap-northeast-1.amazonaws.com/threads?offset=' + offset;
        fetch(url)
            .then((res) => res.json())
            .then((result) => {
                setThreadList(result);
                // console.log(result);
            },
            (error) => {
                console.log('fetch error');
            })    
    }
    function NextClickHandler() {
        setThreadOffset(threadOffset + 10);
        GetThreadList(threadOffset+10);
    }
    function ResetClickHandler() {
        setThreadOffset(0);
        GetThreadList(0);
    }
    useEffect(() => GetThreadList(threadOffset), [])
    if (threadList == null) return (<div><p>loading...</p></div>)
    return (
        <div>
            <button type="button" onClick={NextClickHandler}>Next</button>
            <button type="button" onClick={ResetClickHandler}>Reset</button>
            <p>{threadOffset}～{threadOffset+10}を表示中</p>
            <ol className="thread-list">
                {threadList.map((e, index) => {
                    return (<li key={e.id}><Link to={`/thread/${String(e.id)}`}>{e.title}【id: {e.id}】</Link></li>);
                })}
            </ol>
        </div>
    )
}