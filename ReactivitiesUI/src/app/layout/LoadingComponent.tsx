// my new react component, is a function that returns jsx, jsx is sintaxis sugar over js
import React from 'react'; //if returning jsx is needed
import { Dimmer, Loader } from 'semantic-ui-react';

interface Props {
    inverted?: boolean;
    content?: string;
}

export default function LoadingComponent({inverted =true, content ='Loading...'}: Props) {
    return(
       <Dimmer active={true} inverted={inverted}>
           <Loader content={content}
           
           />
       </Dimmer>
    )
}