/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
  List,
  ListItemButton,
  ListItemText,
  Divider,
  ListItemIcon,
} from '@mui/material';
import {
  People,
  Category,
  AdminPanelSettings,
} from '@mui/icons-material';
import '../../styles/sidebar.css';
import UserManagement from './manage/Users';
import HomeManagement from './manage/Home';
import ItemManagement from './manage/Items';

function Manage() {
  const [pageToShow, setPageToShow] = useState('Manage');

  const handleClick = (e) => {
    setPageToShow(e.target.innerText);
  };

  return (
    <>
      <div className="sidebar">
        <h3>Manage Ross&apos;s Meats</h3>
        <List component="nav" aria-label="folders">
          <ListItemButton selected={pageToShow === 'Manage'} onClick={handleClick}>
            <ListItemIcon>
              <AdminPanelSettings />
            </ListItemIcon>
            <ListItemText primary="Manage" />
          </ListItemButton>
          <Divider />
          <ListItemButton selected={pageToShow === 'Items'} onClick={handleClick} divider>
            <ListItemIcon>
              <Category />
            </ListItemIcon>
            <ListItemText primary="Items" />
          </ListItemButton>
          <ListItemButton selected={pageToShow === 'Users'} onClick={handleClick}>
            <ListItemIcon>
              <People />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItemButton>
        </List>

      </div>
      <div className="content">
        {pageToShow === 'Manage'
        && <HomeManagement />}
        {pageToShow === 'Items'
        && <ItemManagement />}
        {pageToShow === 'Users'
        && <UserManagement />}
      </div>
    </>
  );
}

export default Manage;
