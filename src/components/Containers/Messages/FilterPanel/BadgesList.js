import React from 'react';
import styled from 'styled-components';

// Children
import Badge from '../Badge';

const BadgesList = ({ badges, badgeType = '', onRemoveBadge, ...props }) => {
  return (
    <BadgesListStyled data-cy="badge_list">
      {badges.map((badge, i) => {
        let name = badge;
        if (badge.name) name = badge.name;
        return (
          <Badge
            name={name}
            key={`${i}_${name}`}
            type={badge.type || 'normal'}
            remove={() => onRemoveBadge(name)}
          />
        );
      })}
    </BadgesListStyled>
  );
};

const BadgesListStyled = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 1rem 0;
`;

export default BadgesList;
