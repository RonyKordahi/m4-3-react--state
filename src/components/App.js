import React from 'react';

import data from "../data";
import Typeahead from "./Typeahead";

function App(props) {
    const { books } = data;

    
    return <> 
        <Typeahead suggestions={books} handleSelect={(suggestions) =>  {
        alert(suggestions)
        }}></Typeahead>
        </>;
}

export default App;
