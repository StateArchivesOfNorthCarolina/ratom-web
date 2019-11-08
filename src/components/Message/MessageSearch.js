import React, { useState } from 'react';
import styled from 'styled-components';

const MessageSearchStyled = styled.div`
    color: white;
`;

const Searchables = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    p {
        margin: 0;
        padding: 0;
        font-size: 18px;
    }

    div {
        width: 80%;
        display: flex;
        justify-content: space-evenly;
    }

    margin-bottom: 2rem;
`;

const StyledRadioLabel = styled.label`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`

const StyledRadioInput = styled.input`
    margin-left: 0.5rem;
`

const SearchBoxStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2rem;
    label {
        font-size: 28px;
        margin-bottom: 1rem;
    }
    input {
        width: 85%;
        margin-bottom: 1rem;
        padding: .5rem 1rem;
    }
`;

const ButtonStyled = styled.div`
    border: 2px solid white;
    border-radius: 5px;
    width: auto;
    padding: 1rem;
    font-size: 18px;
    &:active {
        background-color: steelblue;
    }
`


const SEARCHABLE = [
    {
        key: 'msgFrom',
        label: 'From'
    },
    {
        key: 'msgTo',
        label: 'To'
    },
    {
        key: 'msgCc',
        label: 'CC'
    },
    {
        key: 'msgSubject',
        label: 'Subject'
    },
    {
        key: 'msgBody',
        label: 'Message body'
    },
]

function MessageSearch({ searchMessages }) {
    const [searchBy, setSearchBy] = useState({});
    const [searchString, setSearchString] = useState();

    const handleSearchMessages = () => {
        searchMessages({ searchBy: searchBy.key, searchString });
    }

    return (
        <MessageSearchStyled>
            <Searchables>
                <p>Search in:</p>
                <div>
                    {SEARCHABLE.map(item => (
                        <StyledRadioLabel
                            key={item.key}>{item.label}
                            <StyledRadioInput
                                style={{ color: 'white' }}
                                control='input'
                                type='radio'
                                name='searchables'
                                value={item.key}
                                checked={searchBy.key === item.key}
                                onChange={() => setSearchBy(item)}
                            />
                        </StyledRadioLabel>
                    ))}
                </div>
            </Searchables>
            {searchBy.label && 
                <SearchBoxStyled>
                    <label>'{searchBy.label}' contains: </label>
                    <input placeholder='Search' value={searchString} onChange={e => setSearchString(e.target.value)}/>
                    <ButtonStyled onClick={handleSearchMessages}>Search</ButtonStyled>
                </SearchBoxStyled>
            }
        </MessageSearchStyled>
    )
}

export default MessageSearch;
