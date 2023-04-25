import ReactMarkdown from "react-markdown";
import React, {useEffect, useState} from "react";
import './Pages.css';

function MarkdownPage({shown, file = 'how-to-create-pattern.md'}) {
    const [post, setPost] = useState('');
    useEffect(() => {
        import(`./markdown/${file}.md`)
            .then(res => {
                fetch(res.default)
                    .then(res => res.text())
                    .then(res => setPost(res))
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    });
    return (
        <div className={`markdown ${shown ? 'showpage' : 'hidepage'}`}
             style={{height: window.innerHeight - 180, width: window.innerWidth}}>
            <div className={'markdown-container'}>
                <div style={{display: "flex", flexDirection: "row", justifyContent: "right", color: "#4264bb"}}>
                    <p>author : LegendSayantan</p></div>
                <div style={{transform: 'scale(0.85)', position: "absolute", left: '-5vw', top: '-20vh'}}>
                    <ReactMarkdown>
                        {post}
                    </ReactMarkdown>
                </div>
            </div>
        </div>
    );
}

export default MarkdownPage;