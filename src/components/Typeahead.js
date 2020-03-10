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

const StyledSpan = styled.span `
    font-weight: bold;
`

function Typeahead ({ suggestions, handleSelect }) {
    const [userInput, setUserInput] = useState("");
    const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
    const [isSelected, setIsSelected] = useState(false);
    
    const filteredSuggestion = suggestions.filter(suggestion => {
        return suggestion.title.toLowerCase().includes(userInput.toLowerCase());
    })
    
    return <>
        <StyledInput
            type="text" 
            value={userInput} 
            onChange={(ev) => {
                setUserInput(ev.target.value);
            }}
            onKeyDown={ev => {

                switch(ev.key) {
                    case "Enter":
                        handleSelect(ev.target.value);
                        break;

                    case "ArrowUp":
                        let indexUp = (selectedSuggestionIndex <= 0) ? 0 : selectedSuggestionIndex - 1;
                        if (selectedSuggestionIndex > 0) {
                            setSelectedSuggestionIndex(selectedSuggestionIndex - 1);
                        }
                        break;

                    case "ArrowDown":
                        let indexDown = (selectedSuggestionIndex === filteredSuggestion.length -1) ? selectedSuggestionIndex : selectedSuggestionIndex + 1;
                        
                        if (selectedSuggestionIndex < filteredSuggestion.length -1) {
                            setSelectedSuggestionIndex(selectedSuggestionIndex + 1);
                        }
                        break;
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
                {filteredSuggestion.map((suggestion, index) => {
                    {if (suggestion.title.toLowerCase().includes(userInput.toLowerCase())) {
                        const isSelected = (index === selectedSuggestionIndex);
                    return <StyledList 
                            key={suggestion.id}
                            style={{background: isSelected ? 'hsla(50deg, 100%, 80%, 0.25)' : 'transparent'}}
                            onClick={(ev) => {
                                handleSelect(suggestion.title);
                            }}
                        >
                            <span>{suggestion.title.slice(0, suggestion.title.toLowerCase().indexOf(userInput.toLowerCase()) + userInput.length)}</span>
                            <StyledSpan>{suggestion.title.slice((suggestion.title.toLowerCase().indexOf(userInput.toLowerCase())) + userInput.length)}</StyledSpan>
                        </StyledList>;
                    }}
                }) }
            </StyledUL>
            ) : <></>}
    </>
}

export default Typeahead;