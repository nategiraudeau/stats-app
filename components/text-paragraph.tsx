import React from 'react';

const TextParagraph: React.FC<{ text: string }> = ({ text }) => {
    return (
        <div>
            {
                text.split('\n').map(str => <p key={Math.random()} style={{
                    margin: '0',
                    display: 'block',
                }}>{str || (<br />)}</p>)
            }
        </div>
    );
}

export default TextParagraph;