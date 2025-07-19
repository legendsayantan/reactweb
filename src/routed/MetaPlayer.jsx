import React, { useState, useEffect, useRef } from 'react';

// Main Component - can be embedded in any existing React page
export default function MetaPlayer() {
    // State for the JSON input from the user
    const [jsonInput, setJsonInput] = useState('');
    // State to hold the parsed playlist data
    const [playlist, setPlaylist] = useState([]);
    // State for the main session title
    const [sessionTitle, setSessionTitle] = useState('');
    // State to track the index of the currently playing segment
    const [currentIndex, setCurrentIndex] = useState(-1);
    // State to toggle the visibility of extra details
    const [detailsExpanded, setDetailsExpanded] = useState(false);
    // State for the share button text
    const [shareText, setShareText] = useState('Share');
    // State to track if the YouTube API is fully initialized
    const [ytApiReady, setYtApiReady] = useState(false);

    // Refs for player and internal logic
    const playerRef = useRef(null);
    // Use a ref to store the timestamp of the last advancement.
    const lastAdvanceTimeRef = useRef(0);

    // Helper function to format seconds into HH:MM:SS
    const formatTime = (totalSeconds) => {
        if (isNaN(totalSeconds) || totalSeconds < 0) return "00:00:00";
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = Math.floor(totalSeconds % 60);
        return [hours, minutes, seconds]
            .map(v => v < 10 ? "0" + v : v)
            .join(":");
    };

    // This effect loads the YouTube IFrame Player API script
    useEffect(() => {
        // The YouTube API will call this function globally when it's ready.
        window.onYouTubeIframeAPIReady = () => {
            setYtApiReady(true);
        };

        const loadScript = (id, src) => {
            if (document.getElementById(id)) {
                if (window.YT && window.YT.Player) {
                    setYtApiReady(true);
                }
                return;
            }
            const tag = document.createElement('script');
            tag.id = id;
            tag.src = src;
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        };

        loadScript('youtube-api', "https://www.youtube.com/iframe_api");

    }, []);

    // Central function to advance to the next segment
    const advanceToNextSegment = () => {
        const now = Date.now();
        if (now - lastAdvanceTimeRef.current < 2000) {
            return;
        }
        lastAdvanceTimeRef.current = now;

        setCurrentIndex(prevIndex => {
            if (prevIndex < playlist.length - 1) {
                return prevIndex + 1;
            }
            if (playerRef.current) playerRef.current.stopVideo();
            return -1;
        });
    };

    // This is the core effect for controlling the player
    useEffect(() => {
        if (currentIndex < 0 || playlist.length === 0 || !ytApiReady) {
            if (playerRef.current && typeof playerRef.current.destroy === 'function') {
                playerRef.current.destroy();
                playerRef.current = null;
            }
            return;
        }

        const segment = playlist[currentIndex];
        const videoId = extractVideoId(segment.url);

        if (!videoId) {
            console.error("Could not extract video ID for segment:", segment);
            advanceToNextSegment();
            return;
        }

        const prevSegment = currentIndex > 0 ? playlist[currentIndex - 1] : null;
        const nextSegment = currentIndex < playlist.length - 1 ? playlist[currentIndex + 1] : null;

        let startSeconds = segment.startTime;
        let endSeconds; // Initialize as undefined

        // Determine start time
        if (prevSegment && extractVideoId(prevSegment.url) === videoId) {
            if (prevSegment.endTime < segment.startTime) {
                startSeconds = (prevSegment.endTime + segment.startTime) / 2;
            } else {
                startSeconds = segment.startTime;
            }
        } else {
            startSeconds = segment.startTime - 2;
        }

        startSeconds = Math.max(0, startSeconds);

        // Determine end time
        if (nextSegment) {
            // There is a next segment
            if (extractVideoId(nextSegment.url) === videoId) {
                // Next segment is from the same video
                if (segment.endTime < nextSegment.startTime) {
                    // Gap exists, end at the midpoint to fill it
                    endSeconds = (segment.endTime + nextSegment.startTime) / 2;
                } else {
                    // Continuous or overlapping, end exactly at the specified time (no buffer)
                    endSeconds = segment.endTime;
                }
            } else {
                // Next segment is a different video, add end buffer
                endSeconds = segment.endTime + 2;
            }
        }
        // If there is no nextSegment, `endSeconds` remains undefined, so the video plays to the end.

        const startPlayer = () => {
            if (playerRef.current && typeof playerRef.current.loadVideoById === 'function') {
                const playerOptions = {
                    videoId: videoId,
                    startSeconds: startSeconds,
                };
                // Only add endSeconds if it has a value
                if (endSeconds !== undefined) {
                    playerOptions.endSeconds = endSeconds;
                }
                playerRef.current.loadVideoById(playerOptions);
            }
        };

        if (!playerRef.current || typeof playerRef.current.loadVideoById !== 'function') {
            if (playerRef.current && typeof playerRef.current.destroy === 'function') {
                playerRef.current.destroy();
            }

            let playerEl = document.getElementById('youtube-player');
            if (!playerEl) {
                const playerWrapper = document.querySelector('.player-wrapper');
                if (playerWrapper) {
                    playerEl = document.createElement('div');
                    playerEl.id = 'youtube-player';
                    playerWrapper.innerHTML = '';
                    playerWrapper.appendChild(playerEl);
                }
            }

            playerRef.current = new window.YT.Player('youtube-player', {
                height: '100%',
                width: '100%',
                videoId: videoId,
                playerVars: { autoplay: 1, controls: 1, modestbranding: 1, rel: 0 },
                events: { 'onReady': startPlayer, 'onStateChange': onPlayerStateChange },
            });
        } else {
            startPlayer();
        }

    }, [currentIndex, playlist, ytApiReady]);

    const onPlayerStateChange = (event) => {
        if (event.data === window.YT.PlayerState.ENDED) {
            advanceToNextSegment();
        }
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            const playerIframe = playerRef.current?.getIframe?.();
            if (!playerIframe) return;
            // Always redirect keyboard input to the player
            if (document.activeElement !== playerIframe) {
                playerIframe.focus();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const extractVideoId = (url) => {
        try {
            const urlObj = new URL(url);
            if (urlObj.hostname === 'youtu.be') return urlObj.pathname.slice(1);
            if (urlObj.hostname.includes('youtube.com')) return urlObj.searchParams.get('v');
        } catch (error) { console.error("Invalid URL:", url, error); }
        return null;
    };

    const handleLoadPlaylist = () => {
        if (!jsonInput.trim()) return alert("Please paste the playlist JSON into the text area.");
        try {
            const data = JSON.parse(jsonInput);
            if (data && data.metaPlaylist) {
                setSessionTitle(data.sessionTitle || 'Meta Playlist');
                setPlaylist(data.metaPlaylist);
                setCurrentIndex(0);
            } else {
                alert('Invalid JSON: "metaPlaylist" array not found.');
            }
        } catch (error) {
            alert('Error parsing JSON: ' + error.message);
        }
    };

    const handleShare = () => {
        if (!jsonInput.trim()) return;
        try {
            // Parse the JSON to create a JavaScript object
            const playlistObject = JSON.parse(jsonInput);
            // Stringify the object without any whitespace (making it compact)
            const compactJsonString = JSON.stringify(playlistObject);

            const tempTextArea = document.createElement('textarea');
            tempTextArea.value = compactJsonString; // Use the compact string
            document.body.appendChild(tempTextArea);
            tempTextArea.select();
            document.execCommand('copy');
            document.body.removeChild(tempTextArea);

            setShareText('Playlist data copied');
            setTimeout(() => setShareText('Share'), 2000);

        } catch (error) {
            console.error("Failed to copy playlist data:", error);
            alert("Could not copy playlist data.");
        }
    };

    const currentSegment = currentIndex > -1 ? playlist[currentIndex] : null;

    return (
        <>
            <style>{`
                .meta-player-container { background-color: #111827; color: white; height: 100vh; font-family: sans-serif; padding: 16px; display: flex; flex-direction: column; box-sizing: border-box; }
                .load-playlist-container { max-width: 896px; margin: 0 auto; width: 100%; background-color: #1f2937; padding: 24px; border-radius: 12px; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05); }
                .load-playlist-container h2 { font-size: 1.5rem; font-weight: 600; margin-bottom: 12px; color: #67e8f9; }
                .json-textarea { width: 100%; height: 16rem; padding: 12px; background-color: #111827; border: 2px solid #374151; border-radius: 8px; color: #d1d5db; transition: border-color 0.2s; box-sizing: border-box; }
                .json-textarea:focus { outline: none; border-color: #06b6d4; }
                .load-button { margin-top: 16px; padding: 12px 32px; background-color: #0891b2; border: none; border-radius: 8px; font-weight: bold; color: white; font-size: 1.125rem; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06); cursor: pointer; transition: all 0.3s; }
                .load-button:hover { background-color: #06b6d4; transform: translateY(-2px); }
                .player-view-grid { flex-grow: 1; display: flex; flex-direction: column; gap: 16px; max-width: 1536px; width: 100%; margin: 0 auto; padding-top: 16px; overflow: hidden; }
                .playlist-sidebar { background-color: #1f2937; padding: 16px; border-radius: 12px; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05); display: flex; flex-direction: column; flex-shrink: 0; }
                .playlist-sidebar h2 { font-size: 1.25rem; font-weight: bold; margin-bottom: 12px; color: #67e8f9; flex-shrink: 0; }
                .playlist-scroll-area { flex-grow: 1; overflow-y: auto; padding-right: 8px; }
                .playlist-item { padding: 6px 8px; border-radius: 6px; cursor: pointer; transition: all 0.2s; margin-bottom: 4px; background-color: #374151; }
                .playlist-item:hover { background-color: #4b5563; }
                .playlist-item.active { background-color: #0891b2; box-shadow: 0 4px 14px 0 rgba(8, 145, 178, 0.39); transform: scale(1.02); }
                .playlist-item h4 { font-weight: bold; color: white; line-height: 1.25; font-size: 0.9rem; margin: 0; }
                .playlist-item p { font-size: 0.8rem; color: #d1d5db; margin: 0; }
                .main-content { display: flex; flex-direction: column; gap: 16px; flex-grow: 1; overflow: hidden; }
                .player-wrapper { width: 100%; aspect-ratio: 16 / 9; background-color: black; border-radius: 12px; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05); overflow: hidden; position: relative; flex-shrink: 0; }
                .details-card { background-color: #1f2937; padding: 20px; border-radius: 12px; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05); overflow-y: auto; }
                .description-text { color: #9ca3af; margin: 0; }
                .details-footer { display: flex; justify-content: space-between; align-items: center; margin-top: 12px; }
                .details-button { color: #22d3ee; background: none; border: none; cursor: pointer; font-weight: 600; font-size: 0.875rem; }
                .details-button:hover { color: #67e8f9; }
                .share-button { background-color: #374151; color: #d1d5db; padding: 6px 12px; border-radius: 6px; transition: all 0.2s; }
                .share-button:hover { background-color: #4b5563; }
                .expanded-details { margin-top: 8px; padding: 12px; background-color: rgba(17, 24, 39, 0.7); border-radius: 8px; font-size: 0.875rem; }
                .expanded-details p { margin-bottom: 4px; }
                .expanded-details .detail-label { font-weight: bold; color: #d1d5db; }
                @media (min-width: 1024px) { 
                    .player-view-grid { flex-direction: row; } 
                    .playlist-sidebar { width: 25%; max-height: calc(100vh - 48px); } 
                    .main-content { width: 75%; max-height: calc(100vh - 48px); } 
                }
                @media (min-width: 1280px) { 
                    .playlist-sidebar { width: 20%; } 
                    .main-content { width: 80%; } 
                }
            `}</style>
            <div className="meta-player-container">
                {playlist.length === 0 ? (
                    <div className="load-playlist-container">
                        <h2>Load Your Playlist</h2>
                        <textarea
                            className="json-textarea"
                            onChange={(e) => setJsonInput(e.target.value)}
                        />
                        <button onClick={handleLoadPlaylist} className="load-button">
                            Load & Play
                        </button>
                    </div>
                ) : (
                    <div className="player-view-grid">
                        <main className="main-content">
                            <div className="player-wrapper">
                                <div id="youtube-player" />
                            </div>
                            {currentSegment && (
                                <div className="details-card">
                                    <p className="description-text">{currentSegment.description}</p>
                                    <div className="details-footer">
                                        <button onClick={() => setDetailsExpanded(!detailsExpanded)} className="details-button">
                                            Segment Details {detailsExpanded ? '▼' : '▲'}
                                        </button>
                                        <button onClick={handleShare} className="details-button share-button">
                                            {shareText}
                                        </button>
                                    </div>
                                    {detailsExpanded && (
                                        <div className="expanded-details">
                                            <p><span className="detail-label">Start Time:</span> {formatTime(currentSegment.startTime)}</p>
                                            <p><span className="detail-label">End Time:</span> {formatTime(currentSegment.endTime)}</p>
                                            <p><span className="detail-label">Duration:</span> {formatTime(currentSegment.endTime - currentSegment.startTime)}</p>
                                            <p><span className="detail-label">Is Overlap:</span> {String(currentSegment.isOverlap)}</p>
                                            {currentSegment.isOverlap && <p><span className="detail-label">Reasoning:</span> {currentSegment.reasoning}</p>}
                                        </div>
                                    )}
                                </div>
                            )}
                        </main>
                        <aside className="playlist-sidebar">
                            <h2>{sessionTitle}</h2>
                            <div className="playlist-scroll-area">
                                {playlist.map((segment, index) => (
                                    <div
                                        key={index}
                                        onClick={() => setCurrentIndex(index)}
                                        className={`playlist-item ${currentIndex === index ? 'active' : ''}`}
                                    >
                                        <h4>{segment.title}</h4>
                                        <p>{segment.creator}</p>
                                    </div>
                                ))}
                            </div>
                        </aside>
                    </div>
                )}
            </div>
        </>
    );
}
