import React from 'react';
import styled from 'styled-components';
import { borderSeparator, standardPadding } from '../../../../../../styles/styleVariables';


const MessageListItem = () => {
    return (
        <MessageListItemStyled>
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
