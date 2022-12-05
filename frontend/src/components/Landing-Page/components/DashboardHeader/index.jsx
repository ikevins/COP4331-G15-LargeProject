import React from 'react';

import './styles.css';
import NotificationIcon from '../../assets/icons/heart.svg';
import SettingsIcon from '../../assets/icons/settings2.svg';
import LogoutIcon from '../../assets/icons/logout3.svg';
import LoggedInName from '../../../LoggedInName';

const doLogout = event => 
{
    event.preventDefault();

    localStorage.removeItem("user_data")
    window.location.href = '/';

}; 

const goEdit = event =>
{
    event.preventDefault();

    window.location.href = "/update_password";
}

function DashboardHeader ({ btnText, onClick }) {
    return(
        <div className='dashbord-header-container'>

            <div className='dashbord-header-right'>
                <LoggedInName />
                <img 
                    src={LogoutIcon}
                    alt='icon-logout'
                    className='dashbord-header-icon' 
                    onClick={doLogout} />
                <img 
                    src={NotificationIcon}
                    alt='notification-icon'
                    className='dashbord-header-icon' />
                <img 
                    src={SettingsIcon}
                    alt='settings-icon'
                    className='dashbord-header-icon' 
                    onClick={goEdit} />
                <img
                    className='dashbord-header-avatar'
                    src='https://reqres.in/img/faces/9-image.jpg' />
            </div>
        </div>
    )
}

export default DashboardHeader;