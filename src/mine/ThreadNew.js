import React from "react";
import { useState, useEffect } from "react";

export function ThreadNew() {
    const [threadName, setThreadName] = useState('test');
    function handleChange(e) {
        setThreadName(e.target.value);
        if (e.target.value == null) setThreadName('');
    }
    useEffect(() => setThreadName(''), []);
    function handleSubmit(e) {
        const url = 'https://2y6i6tqn41.execute-api.ap-northeast-1.amazonaws.com/threads';
        const requestOptions = {
            method: 'POST', 
            body: JSON.stringify({"title": threadName})
        }
        fetch (url, requestOptions)
            .then(res => res.json())
            .then(result => {
                console.log(result);
            },
            error => {
                console.log('POST ERROR', error);
            })

    }
    return (
        <div>
            <h2>スレッド新規作成</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    スレッドの名前を 
                    <input type='text' value={threadName} onChange={handleChange}/>
                    にする
                </label>
                <p><input type='submit' value='作成する' /></p>
            </form>
        </div>
    );
}

