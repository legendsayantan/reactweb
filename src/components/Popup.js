import React from 'react';
import PropTypes from 'prop-types';
import "../pages/Pages.css"

const Popup = ({showInput = true, text = 'test', onClose, onContinue}) => {
    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 999,
            }}
        >
            <div
                style={{
                    backdropFilter: 'blur(5px)',
                    backgroundColor: 'rgba(0, 0,0, 0.1)',
                    padding: '20px',
                    borderRadius: '20px',
                    borderWidth: '5px',
                    borderColor: 'rgba(0,0,0,1)',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
                }}
            >
                <h4 style={{color: '#58beff'}}>{text}</h4>
                {showInput && <input type="text" className={'input-glass'} style={{border: '0px'}}/>}
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        marginTop: '20px',
                    }}
                >
                    <div className={'button-glass'} onClick={onClose} style={{marginRight: '10px'}}>Cancel</div>
                    <div className={'button-glass'} onClick={onContinue}>Continue</div>
                </div>
            </div>
        </div>
    );
};


export default Popup;
