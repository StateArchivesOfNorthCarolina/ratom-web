import React from 'react';
import styled from 'styled-components';

const MessageLayout = () => {
    return (
        <MessageLayoutStyled>
            <h2>Message Layout</h2>
            <p>All the message content tho</p>
        </MessageLayoutStyled>
    )
}

const MessageLayoutStyled = styled.div`
    width: 100%;
`;

export default MessageLayout;
