import React from 'react';
import styled from 'styled-components';

// Children
import MessageHeader from './MessageHeader';
import MessageDetail from './MessageDetail';
import MessageFooter from './MessageFooter';

const MessageLayout = () => {
    return (
        <>
            <MessageHeader />
            <MessageDetail />
            <MessageFooter />
        </>
    )
}

export default MessageLayout;
