import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function ThreadContent(props) {
    const [contentList, setContentList] = useState(null);
    const [contentOffset, setContentOffset] = useState(0);
    function GetContentList(offset) {
        const url = 'https://2y6i6tqn41.execute-api.ap-northeast-1.amazonaws.com/threads/' + props.thread_id + '/posts?offset=' + offset;
        fetch(url, {method: 'GET'})
         .then(res => res.json())
         .then(result => {
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
    function LinkToContentNew() {
        return (<Link to={`/thread/${props.thread_id}/new`}>投稿画面に入る</Link>);
    }
    function MakeContent() {
        if (contentList == null) return (<div><p>loading...</p></div>)
        if (contentList.length == 0) return (
            <div>
                <button type='button' onClick={ResetClickHandler}>Reset</button>
                <p>no content...</p>
            </div>)
        return (
            <div>
                <h4>Content</h4>
                <p>{contentOffset}～{contentOffset+10}を表示中</p>
                <button type='button' onClick={NextClickHandler}>Next</button>
                <button type='button' onClick={ResetClickHandler}>Reset</button>
                <ReloadList contents={contentList}/>
            </div>
        )
    }
    useEffect(() => GetContentList(contentOffset), [])

    return (
        <div>
            <h2>{props.thread_id}のスレッド内容</h2>
            <MakeContent />
            <p><LinkToContentNew /></p>
            <Link to='/'>Topに戻る</Link>
        </div>
    )
}