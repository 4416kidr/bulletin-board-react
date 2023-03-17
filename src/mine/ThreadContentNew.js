import React from "react";
import { useState, useEffect } from "react";

export function ThreadContentNew(props) {
    const [content, setContent] = useState('nothing');
    function handleChange(e) {
        setContent(e.target.value);
        if (e.target.value == null) setContent('');
    }
    useEffect(() => setContent('no content'), [])
    function handleSubmit(e) {
        const main_url = 'https://2y6i6tqn41.execute-api.ap-northeast-1.amazonaws.com/'
        const url = main_url + 'threads/' + props.thread_id + '/posts';
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify({'post': content})
        }
        fetch(url, requestOptions)
            .then(res => res.json())
            .then(result => {
                console.log(result);
            },
            error => {
                console.log('POST ERROR', error);
            });
    }
    return (
        <div>
            <h2>{props.thread_id}へ投稿する</h2>
            <form onSubmit={handleSubmit}>
                <p>投稿内容</p>
                <input type='text' value={content} onChange={handleChange}/>
                <p><input type='submit' value='送信する' /></p>
            </form>
            <p>送信内容: {content}</p>
        </div>
    )
}

