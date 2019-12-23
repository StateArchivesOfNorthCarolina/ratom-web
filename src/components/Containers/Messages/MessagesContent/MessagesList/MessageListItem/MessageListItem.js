import React from 'react';
import styled from 'styled-components';
import { borderSeparator, standardPadding } from '../../../../../../styles/styleVariables';

// Router
import { useHistory, useLocation } from 'react-router-dom';
import Button from '../../../../../Components/Buttons/Button';

const MessageListItem = ({ message }) => {
  const { pathname } = useLocation();
  const history = useHistory();

  const handleSelectMessage = () => {
    // TODO: stick it in context or whatever
    // TODO: maybe including the cursor?
    history.push(`${pathname}/messages/${message.pk}`);
  };

  // TODO: This eventually...prolly
  // const getHighlights = () => {
  //   if (message && message.hasOwnProperty('highlight')) {
  //     return Object.keys(message.highlight).map(key => ({
  //       type: key,
  //       hightlights: message.highlight[key]
  //     }));
  //   }
  //   return [];
  // };

  // TODO: remove vv once we've decided about how to show highlights
  const getHighlights = () => {
    if (message && message.hasOwnProperty('highlight') && message.highlight) {
      if (message.highlight.msg_body) {
        return [{ type: 'body', highlights: [message.highlight.msg_body[0]] }];
      }
    }
    return [];
  };

  return (
    <MessageListItemStyled data-cy="messages_list_item">
      <ContentLeft>
        <h4>from: {message.msgFrom}</h4>
        <p>subject: {message.msgSubject}</p>
        {getHighlights().map((h, i) => (
          <div key={i}>
            <p>{h.type}: </p>
            {h.highlights.map((m, j) => (
              <p key={j}>
                ...<span dangerouslySetInnerHTML={{ __html: m }}></span>...
              </p>
            ))}
          </div>
        ))}
      </ContentLeft>
      <ContentRight>
        <Button
          small
          neutral
          onClick={handleSelectMessage}
          data-cy="messages_list_item_view_button"
        >
          View
        </Button>
      </ContentRight>
    </MessageListItemStyled>
  );
};

const MessageListItemStyled = styled.div`
  height: 15rem;
  border-bottom: ${borderSeparator};
  padding: 2rem 2rem 2rem ${standardPadding};
  margin: 0 2rem;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ContentLeft = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContentRight = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

export default MessageListItem;
