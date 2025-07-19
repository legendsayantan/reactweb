// File: src/pages/ScreenViewer.jsx
import React, { useState, useRef, useEffect } from 'react';

/**
 * ScreenViewer Component
 * ----------------------
 * - Accepts an Android-generated SDP Offer (base64-encoded raw SDP).
 * - Sets remote description and creates/sets local SDP Answer.
 * - Exposes `answerSDP` (base64-encoded raw SDP) for manual return to Android app.
 * - Shows incoming video in a <video> element.
 * - Provides a text input to send UTF-8 strings to the Android app via DataChannel.
 */
export default function ScreenViewer() {
    const [offer, setOffer] = useState('');
    const [answer, setAnswer] = useState('');
    const [messages, setMessages] = useState([]);
    const pcRef = useRef(null);
    const dcRef = useRef(null);

    /**
     * Send a POST with JSON headers (no body) and parse the JSON response.
     * @param {string} url   The endpoint to POST to.
     * @param {string} token Your Bearer token.
     * @returns {Promise<any>} The parsed JSON response.
     */
    async function postWithAuth(url, token) {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
            // no body
        });

        if (!res.ok) {
            throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }

        return await res.json();
    }


    // Replace your onSetOffer() in App.js with:
    const onSetOffer = async () => {
        await postWithAuth("https://turnix.io/api/v1/credentials/ice", "0701f2b5182a9867d2040679abd9ec2b")
            .then(async data => {
                const pc = new RTCPeerConnection(data);
                pcRef.current = pc;

                pc.ondatachannel = e => {
                    const dc = e.channel;
                    dc.onmessage = ev => setMessages(msgs => [...msgs, ev.data]);
                    dc.onopen = () => console.log('💬 DataChannel open (React)');
                    dcRef.current = dc;
                };

                await pc.setRemoteDescription({type: 'offer', sdp: offer});
                const ans = await pc.createAnswer();
                await pc.setLocalDescription(ans);

                // wait for ICE‑gathering to finish before exposing the SDP
                pc.onicegatheringstatechange = () => {
                    if (pc.iceGatheringState === 'complete') {
                        setAnswer(pc.localDescription.sdp);
                        console.log('🧊 React answer+Candidates ready');
                    }
                };
            })
            .catch(err  => console.error('Error:', err));
    };


    const onCreateOffer = async () => {
        const pc = new RTCPeerConnection({
            iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
        });
        pcRef.current = pc;
        const dc = pc.createDataChannel('chat');
        dc.onopen = () => console.log('open');
        dc.onmessage = (e) => setMessages((msgs) => [...msgs, e.data]);
        dcRef.current = dc;
        const off = await pc.createOffer();
        await pc.setLocalDescription(off);
        pc.onicecandidate = (e) => {
            if (!e.candidate && pc.localDescription) {
                setOffer(pc.localDescription.sdp);
            }
        };
    };

    const sendMessage = () => {
        const text = prompt('Enter message');
        dcRef.current.send(text);
        setMessages((msgs) => [...msgs, `Me: ${text}`]);
    };

    return (
        <div style={{ padding: 20 }}>
            <button onClick={onCreateOffer}>Create Offer</button>
            <textarea
                rows={4}
                cols={50}
                value={offer}
                onChange={(e) => setOffer(e.target.value)}
                placeholder="Offer SDP"
            />
            <button onClick={onSetOffer}>Set Offer & Generate Answer</button>
            <textarea
                rows={4}
                cols={50}
                value={answer}
                readOnly
                placeholder="Answer SDP"
            />
            <button onClick={sendMessage}>Send Message</button>
            <div>
                <h3>Messages:</h3>
                {messages.map((m, i) => <div key={i}>{m}</div>)}
            </div>
        </div>
    );
}
