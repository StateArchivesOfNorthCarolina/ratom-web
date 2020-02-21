import React, { useState } from 'react';
import styled from 'styled-components';

// Components
import { FilterPanelItem } from '../FilterPanelItem';
import Keyword from '../KeywordFilter/Keyword';
import Input from '../../../../Components/Inputs/Input';

const EmailFilter = ({ buildQuery, filterQuery, sendQuery, ...props }) => {
  const [address, setAddress] = useState('');

  const { addresses } = filterQuery;

  const handleDeleteKeyPressed = e => {
    e.stopPropagation();
    if (e.key === 'Backspace' && e.shiftKey) removeAddress();
    if (e.key === 'Enter' && e.shiftKey) {
      sendQuery();
    } else if (e.key === 'Enter') {
      addAddress();
    }
  };

  const addAddress = () => {
    if (address.trim()) {
      setAddress('');
      buildQuery({
        ...filterQuery,
        addresses: [...filterQuery.addresses, address]
      });
    }
  };

  const removeAddress = address => {
    const addresses = filterQuery.addresses.slice();
    if (address) {
      const addressLoc = filterQuery.addresses.indexOf(address);
      addresses.splice(addressLoc, 1);
      buildQuery({
        ...filterQuery,
        addresses
      });
    } else {
      addresses.pop();
      buildQuery({
        ...filterQuery,
        addresses
      });
    }
  };
  return (
    <EmailFilterStyled>
      <h3>Email addresses</h3>
      <Input
        data-cy="address_search_input"
        type="text"
        icon="add"
        onIconClick={addAddress}
        onKeyDown={handleDeleteKeyPressed}
        onChange={e => setAddress(e.target.value)}
        value={address}
      />
      <BadgesListStyled data-cy="address_list">
        {addresses.map((address, i) => {
          let name = address;
          if (address.name) name = address.name;
          return <Keyword name={name} key={`${i}_${name}`} remove={() => removeAddress(name)} />;
        })}
      </BadgesListStyled>
    </EmailFilterStyled>
  );
};

const EmailFilterStyled = styled(FilterPanelItem)``;

const BadgesListStyled = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 1rem 0;
`;

export default EmailFilter;
