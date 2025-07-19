import React, { useState, useRef, useEffect } from 'react';

export default function WebRTCChat() {
    // State for ICE servers from Cloudflare TURN/STUN
    const [iceServers, setIceServers] = useState([]);

    // PeerConnection references
    const pcARef = useRef(null);
    const pcBRef = useRef(null);

    // Data channel state
    const [dcA, setDcA] = useState(null);
    const [dcB, setDcB] = useState(null);

    // SDP & ICE candidate textareas
    const [offerSDP, setOfferSDP] = useState('');
    const [answerSDP, setAnswerSDP] = useState('');
    const [remoteOffer, setRemoteOffer] = useState('');
    const [remoteAnswer, setRemoteAnswer] = useState('');
    const [candidateA, setCandidateA] = useState('');
    const [candidateB, setCandidateB] = useState('');

    // Chat messages
    const [messageA, setMessageA] = useState('');
    const [messageB, setMessageB] = useState('');
    const [logA, setLogA] = useState([]);
    const [logB, setLogB] = useState([]);

    // Fetch ICE server credentials from Cloudflare
    useEffect(() => {
        async function fetchIceServers() {
            try {
                const response = await fetch(
                    'https://rtc.live.cloudflare.com/v1/turn/keys/93ae84606f097531c11270bae77ac092/credentials/generate-ice-servers',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer 4745c4fe453b88fa19b73ea286c132743332fda479e7d1dbb8e421462dc01c85',
                        },
                        body: JSON.stringify({ ttl: 86400 }),
                    }
                );
                const data = await response.json();
                console.log('Fetched ICE servers:', data.iceServers);
                setIceServers(data.iceServers || []);
            } catch (err) {
                console.error('Error fetching ICE servers:', err);
            }
        }
        fetchIceServers();
    }, []);

    // Initialize PeerConnections once ICE servers are available
    useEffect(() => {
        if (iceServers.length > 0 && !pcARef.current) {
            const config = { iceServers };
            const pcA = new RTCPeerConnection(config);
            const pcB = new RTCPeerConnection(config);
            pcARef.current = pcA;
            pcBRef.current = pcB;

            // ICE candidate handlers
            pcA.onicecandidate = (e) => {
                if (e.candidate) setOfferSDP((prev) => prev + JSON.stringify(e.candidate) + '\n');
            };
            pcB.onicecandidate = (e) => {
                if (e.candidate) setAnswerSDP((prev) => prev + JSON.stringify(e.candidate) + '\n');
            };

            // Setup data channel listener on B
            pcB.ondatachannel = (e) => {
                const channel = e.channel;
                setDcB(channel);
                channel.onmessage = (ev) => setLogB((l) => [...l, 'Remote: ' + ev.data]);
            };
        }
    }, [iceServers]);

    // Create an offer from Peer A
    async function createOffer() {
        const pcA = pcARef.current;
        const channel = pcA.createDataChannel('chat');
        setDcA(channel);
        channel.onmessage = (e) => setLogA((l) => [...l, 'Remote: ' + e.data]);

        const offer = await pcA.createOffer();
        await pcA.setLocalDescription(offer);
        setOfferSDP(JSON.stringify(offer));
    }

    // Handle incoming offer on Peer B
    async function handleOffer() {
        const pcB = pcBRef.current;
        const offer = JSON.parse(remoteOffer);
        await pcB.setRemoteDescription(offer);
        const answer = await pcB.createAnswer();
        await pcB.setLocalDescription(answer);
        setAnswerSDP(JSON.stringify(answer));
    }

    // Handle incoming answer on Peer A
    async function handleAnswer() {
        const pcA = pcARef.current;
        const answer = JSON.parse(remoteAnswer);
        await pcA.setRemoteDescription(answer);
    }

    // Add ICE candidate from A into B
    async function addCandidateA() {
        const cand = JSON.parse(candidateA);
        await pcBRef.current.addIceCandidate(cand);
        setCandidateA('');
    }

    // Add ICE candidate from B into A
    async function addCandidateB() {
        const cand = JSON.parse(candidateB);
        await pcARef.current.addIceCandidate(cand);
        setCandidateB('');
    }

    // Send chat messages over data channels
    function sendA() {
        dcA.send(messageA);
        setLogA((l) => [...l, 'You: ' + messageA]);
        setMessageA('');
    }

    function sendB() {
        dcB.send(messageB);
        setLogB((l) => [...l, 'You: ' + messageB]);
        setMessageB('');
    }

    return (
        <div className="p-4 grid grid-cols-2 gap-4">
            {/* Peer A */}
            <div className="border p-2 rounded">
                <h2 className="text-xl font-bold">Peer A</h2>
                <button onClick={createOffer} className="mb-2 px-2 py-1 rounded shadow">
                    Create Offer
                </button>
                <textarea
                    rows={6}
                    value={offerSDP}
                    readOnly
                    placeholder="Local SDP & ICE candidates"
                    className="w-full mb-2 border rounded p-1"
                />
                <textarea
                    rows={6}
                    value={remoteAnswer}
                    onChange={(e) => setRemoteAnswer(e.target.value)}
                    placeholder="Paste remote Answer SDP & ICE"
                    className="w-full mb-2 border rounded p-1"
                />
                <button onClick={handleAnswer} className="mb-2 px-2 py-1 rounded shadow">
                    Accept Answer
                </button>
                <textarea
                    rows={3}
                    value={candidateB}
                    onChange={(e) => setCandidateB(e.target.value)}
                    placeholder="Candidate from B"
                    className="w-full mb-2 border rounded p-1"
                />
                <button onClick={addCandidateB} className="mb-2 px-2 py-1 rounded shadow">
                    Add Candidate B
                </button>
                <div>
                    <div className="flex">
                        <input
                            value={messageA}
                            onChange={(e) => setMessageA(e.target.value)}
                            placeholder="Message A"
                            className="flex-1 border rounded p-1"
                        />
                        <button onClick={sendA} className="ml-2 px-2 py-1 rounded shadow">
                            Send
                        </button>
                    </div>
                    <div className="mt-2 h-32 overflow-auto border rounded p-1">
                        {logA.map((l, i) => (
                            <div key={i}>{l}</div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Peer B */}
            <div className="border p-2 rounded">
                <h2 className="text-xl font-bold">Peer B</h2>
                <textarea
                    rows={6}
                    value={remoteOffer}
                    onChange={(e) => setRemoteOffer(e.target.value)}
                    placeholder="Paste remote Offer SDP & ICE"
                    className="w-full mb-2 border rounded p-1"
                />
                <button onClick={handleOffer} className="mb-2 px-2 py-1 rounded shadow">
                    Accept Offer & Create Answer
                </button>
                <textarea
                    rows={6}
                    value={answerSDP}
                    readOnly
                    placeholder="Local Answer SDP & ICE candidates"
                    className="w-full mb-2 border rounded p-1"
                />
                <textarea
                    rows={3}
                    value={candidateA}
                    onChange={(e) => setCandidateA(e.target.value)}
                    placeholder="Candidate from A"
                    className="w-full mb-2 border rounded p-1"
                />
                <button onClick={addCandidateA} className="mb-2 px-2 py-1 rounded shadow">
                    Add Candidate A
                </button>
                <div>
                    <div className="flex">
                        <input
                            value={messageB}
                            onChange={(e) => setMessageB(e.target.value)}
                            placeholder="Message B"
                            className="flex-1 border rounded p-1"
                        />
                        <button onClick={sendB} className="ml-2 px-2 py-1 rounded shadow">
                            Send
                        </button>
                    </div>
                    <div className="mt-2 h-32 overflow-auto border rounded p-1">
                        {logB.map((l, i) => (
                            <div key={i}>{l}</div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
