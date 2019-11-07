import React from 'react';
import sendOperation from '../../graphql/sendOperation';
import { emailQuery } from '../../graphql/queries';

const About = props => {
    const handleGetEmail = () => {
        sendOperation(emailQuery)
            .then(response => {
             console.log('response: ', response)
            })
            .catch(err => {

            })
    }


    return (
        <div>
            <h1>About!</h1>
            <button onClick={handleGetEmail}>Get Email!</button>
        </div>
    )
}

export default About;
