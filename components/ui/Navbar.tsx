import React from 'react';
import NextLink from 'next/link';
import { AppBar, IconButton, Toolbar, Link } from '@mui/material';
import { MenuOutlined } from '@mui/icons-material';
import Typography from '@mui/material/Typography';

const Navbar = () => {
  return (
    <AppBar position='sticky' elevation={0}>
      <Toolbar>
        <IconButton size='large' edge={'start'}>
          <MenuOutlined />
        </IconButton>
        <NextLink href={'/'} passHref>
          <Link>
            <Typography variant='h6' color={'white'}>
              CookieMaster
            </Typography>
          </Link>
        </NextLink>
        <div style={{ width: '20px' }}></div>
        <NextLink href={'/theme-changer'} passHref>
          <Link>
            <Typography variant='h6' color={'white'}>
              Cambiar tema
            </Typography>
          </Link>
        </NextLink>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
