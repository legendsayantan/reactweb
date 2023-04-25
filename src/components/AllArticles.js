import Article from "./Article";
import PointedStar from "./PointedStar";
import React from "react";
import "./SectionsForPC.css"

function AllArticles({shown, loadArticle,mobile}) {
    const flexStyle = {
        display: 'flex',
        flexDirection: mobile?'column':'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: mobile?(window.innerHeight-200)/2:"auto",
        overflow: 'visible',
    };
    const getArticleStyle = () => {
        return {
            margin: '0 15px',
            transform: 'translateY(0)',
            opacity: 1,
            transition: 'all 0.5s ease-in-out',
        }
    }
    const getArticleHiddenStyle = (x, y) => {
        return {
            margin: '0 15px',
            transform: `translate(${x}%,${y}%)`,
            opacity: 0,
            transition: 'all 0.5s ease-in-out',
        }
    }
    let allData = require('../data/articles.json');
    return (
        <div style={{width: window.innerWidth}}>
            {mobile ||
                <div style={shown ? getArticleStyle() : getArticleHiddenStyle(0, -100)}>
                    <h3 className={'heading'}>Latest Articles</h3>
                </div>
            }
            <div style={flexStyle}>
                <div style={shown ? getArticleStyle() : getArticleHiddenStyle(-100, -100)} onClick={() => {
                    loadArticle(allData[0].file);
                }}>
                    <Article mobile={mobile}
                        name={allData[0].name}
                        desc={allData[0].desc}
                        imageUrl={allData[0].image}
                    />
                </div>
                <div style={shown ? getArticleStyle() : getArticleHiddenStyle(100, -100)} onClick={() => {
                    loadArticle(allData[1].file);
                }}>
                    <Article mobile={mobile}
                        name={allData[1].name}
                        desc={allData[1].desc}
                        imageUrl={allData[1].image}
                    />
                </div>
            </div>
            <div style={{height: mobile?'10px':'50%'}}>
                <div style={shown ? getArticleStyle() : getArticleHiddenStyle(0, 500)}>
                    <PointedStar/>
                </div>
            </div>
            <div style={flexStyle}>
                <div style={shown ? getArticleStyle() : getArticleHiddenStyle(-100, 100)} onClick={() => {
                    loadArticle(allData[2].file);
                }}>
                    <Article mobile={mobile}
                        name={allData[2].name}
                        desc={allData[2].desc}
                        imageUrl={allData[2].image}
                    />
                </div>
                <div style={shown ? getArticleStyle() : getArticleHiddenStyle(100, 100)} onClick={() => {
                    loadArticle(allData[3].file);
                }}>
                    <Article mobile={mobile}
                        name={allData[3].name}
                        desc={allData[3].desc}
                        imageUrl={allData[3].image}
                    />
                </div>
            </div>
        </div>
    )
}

export default AllArticles;