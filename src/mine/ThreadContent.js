import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function ThreadContent(props) {
    const [contentList, setContentList] = useState(null);
    const [contentOffset, setContentOffset] = useState(0);
    function GetContentList(offset) {
        console.log(offset);
        const url = 'https://2y6i6tqn41.execute-api.ap-northeast-1.amazonaws.com/threads/' + props.thread_id + '/posts?offset=' + offset;
        fetch(url, {method: 'GET'})
         .then(res => res.json())
         .then(result => {
            console.log(result);
            setContentList(result.posts);
         }, 
         (error) => {
            console.log('error', error);
         })
    }
    function NextClickHandler() {
        const new_offset = contentOffset + 10;
        setContentOffset(new_offset);
        GetContentList(new_offset);
    }
    function ResetClickHandler() {
        setContentOffset(0);
        GetContentList(0);
    }
    function ReloadList(props) {
        return(
        <ol>
            {props.contents.map(e => {
                return (<li key={e.id}>{e.post}</li>)
            })}
        </ol>
        )
    }
    useEffect(() => GetContentList(contentOffset), [])
    if (contentList == null) return (<div><p>loading...</p></div>)
    if (contentList.length == 0) return (
        <div>
            <p>this thread has no content...</p>
            <Link to='/'>Topに戻る</Link>
        </div>)
    return (
        <div>
            <h2>{props.title}</h2>
            <div>
                <h4>thread information</h4>
                <ul>
                    <li>title: {props.title}</li>
                    <li>id: {props.thread_id}</li>
                </ul>
                <h4>Content</h4>
                <p>{contentOffset}～{contentOffset+10}を表示中</p>
                <button type='button' onClick={NextClickHandler}>Next</button>
                <button type='button' onClick={ResetClickHandler}>Reset</button>
                <ReloadList contents={contentList}/>
            </div>
            <Link to='/'>Topに戻る</Link>
        </div>
    )
}