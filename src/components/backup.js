import React, { useState } from "react";
import styled from "styled-components";

const StyledInput = styled.input `
    margin-left: 4.5%;
`

const StyledButton = styled.button `
    background-color: blue;
    margin-left: 10px;
    color: white;
    border: 0px;
    padding: 5px 7px;
    border-radius: 5px;
`
const StyledList = styled.li `
    list-style-type: none;
    padding: 5px 5px;
    &:hover {
        background-color: lightyellow;
    }
`
const StyledUL = styled.ul `
    box-shadow: 0px 0px 5px 0px grey;
    max-width: 600px;
    padding-left: 0px;
    margin-left: 4.5%;
`

function Typeahead ({ suggestions, handleSelect }) {
    const [userInput, setUserInput] = useState("");

    const filteredSuggestion = suggestions.filter(suggestion => {
        return suggestion.title.toLowerCase().includes(userInput.toLowerCase());
    })
    

    filteredSuggestion.forEach(ye => {
        let hoi = ye.title.slice(0, ye.title.toLowerCase().indexOf(userInput.toLowerCase()));
        let hi = ye.title.slice((ye.title.toLowerCase().indexOf(userInput.toLowerCase())) - 1 + userInput.length);
        console.log(hoi);
        console.log(hi);
    })

    return <>
        <StyledInput
            type="text" 
            value={userInput} 
            onChange={(ev) => {
                setUserInput(ev.target.value);
            }}
            onKeyDown={ev => {
                if (ev.key === "Enter") {
                    handleSelect(ev.target.value);
                }
            }}
            />
            <StyledButton
            onClick={(ev) => {
                setUserInput("");
            }}>
                Clear
            </StyledButton>
            
            {userInput.length > 1 ? (
            <StyledUL>
                {filteredSuggestion.map(suggestion => {
                    {if (suggestion.title.toLowerCase().includes(userInput.toLowerCase())) {
                    return <StyledList 
                            key={suggestion.id}
                            onClick={(ev) => {
                                handleSelect(suggestion.title);
                            }}
                        >
                            {suggestion.title}
                        </StyledList>;
                    }}
                }) }
            </StyledUL>
            ) : <></>}
    </>
}

export default Typeahead;