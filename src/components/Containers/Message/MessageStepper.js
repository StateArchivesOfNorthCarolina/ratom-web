import React, { useContext } from 'react';
import styled from 'styled-components';

// Assets
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

// Context
import { CollectionContext } from '../Messages/MessagesMain';

const MessageStepper = props => {
  const { listPlaceholder, messagesTotalCount } = useContext(CollectionContext);

  // useEffect(() => {
  //   // TODO: here we need to handle the case of a user navigating directly to this page,
  //   // TODO: this will mean that listPlaceholder and messageCursor will be unset. So:
  //   // TODO: Get listPlaceholder and messageCursor.
  //   // every time I load, do this.
  // });

  // TODO: setting offset + 1 will give me the message I want.
  // TODO: will need to add that message to local State [messages].push(this new message)
  // const handleStep = direction => {
  //   // TODO: get cursor for this guy.
  //   // TODO: increment/decrement listPlaceholder
  //   // TODO: fetch new item.
  //   // fetching new item should:
  //   // update cursor, get index
  // };

  // onStep
  // get cursor
  // increment/decrement list placeholder
  // get new item
  // update cursor

  return (
    <MessageStepperStyled {...props}>
      {/* <StepperStyled icon={faArrowLeft} disabled={listPlaceholder === 0} onClick={() => handleStep('left')}/> */}
      <StepperDetails>
        <span>{listPlaceholder && listPlaceholder >= 0 ? listPlaceholder + 1 : '--'}</span> of{' '}
        {messagesTotalCount}
      </StepperDetails>
      {/* <StepperStyled icon={faArrowRight} disabled={listPlaceholder === messagesTotalCount} onClick={() => handleStep('right')}/> */}
    </MessageStepperStyled>
  );
};

const MessageStepperStyled = styled.div`
  display: flex;
  flex-direction: row;
  /* justify-content: space-between; */
`;

const StepperDetails = styled.p`
  margin: 0 2rem;
  font-size: 1.5rem;
  span {
    color: ${props => props.theme.colorPrimary};
  }
`;

// const StepperStyled = styled(FontAwesomeIcon)`
//   color: ${props => props.theme.colorPrimary};
//   font-size: 2rem;
// `;

export default MessageStepper;
