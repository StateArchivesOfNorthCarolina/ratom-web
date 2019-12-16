import React from 'react';
import styled from 'styled-components';
import { borderSeparator, standardPadding } from '../../../../../../styles/styleVariables';

// Router
import { useHistory, useLocation } from 'react-router-dom';


const MessageListItem = ({ message }) => {
    const { pathname } = useLocation();
    const history = useHistory();

    const handleSelectMessage = () => {
        // TODO: stick it in context or whatever
        // TODO: maybe including the cursor?
        history.push(`${pathname}/messages/${message.id}`);
    }

    return (
        <MessageListItemStyled onClick={handleSelectMessage}>
            <h4>message list item</h4>
        </MessageListItemStyled>
    )
}

const MessageListItemStyled = styled.li`
    height: 15rem;
    width: 100%;
    border-bottom: ${borderSeparator};
    padding: 2rem 2rem 2rem ${standardPadding};
    
    display: flex;
    flex-direction: column;
`;

export default MessageListItem;
