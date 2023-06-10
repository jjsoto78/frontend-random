// my new react component, is a function that returns jsx, jsx is sintaxis sugar over js
import React from 'react'; //if returning jsx is needed
import { useSelector } from 'react-redux';
import { Button, Container, Menu, MenuItem } from 'semantic-ui-react';
import { ActivitiesState } from '../../redux/reducers/TSactivityReducer';
import logo from './logo.svg';


export default function NavBar() {

    const ActivitiesStateRedux = useSelector<ActivitiesState, ActivitiesState>((state) => state).activityStore;
  
    return(
        <Menu inverted fixed= 'top'>
            <Container>
                <MenuItem header>
                    <img src={logo} className="App-logo" alt="logo" style ={{marginRight: '1em'}} />
                    <img src="/assets/logo.png" alt="logo" style ={{marginRight: '1em'}} />
                    Reactivities 
                </MenuItem>
                <MenuItem name='Activities'/>
                <MenuItem>
                    <Button onClick={() => ActivitiesStateRedux.openForm()} positive content='Create Activity' />
                </MenuItem>
            </Container>
        </Menu>
    )
}
