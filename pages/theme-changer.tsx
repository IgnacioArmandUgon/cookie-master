import React, { ChangeEvent, useState, useEffect, FC } from 'react';
import { GetServerSideProps } from 'next';
import {
  Button,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import Layout from '../components/layouts/Layout';
import Cookies from 'js-cookie';
import axios from 'axios';

interface Props {
  theme: string;
}

const ThemeChangerPage: FC<Props> = ({ theme }) => {
  const [currentTheme, setCurrentTheme] = useState('light');

  const onThemeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const theme = e.target.value;
    setCurrentTheme(theme);
    localStorage.setItem('theme', theme);
    Cookies.set('theme', theme);
  };
  useEffect(() => {
    localStorage.setItem('theme', currentTheme);
    Cookies.set('theme', currentTheme);

    console.log('Cookies', Cookies.get('theme'));
  }, [currentTheme]);

  const onClick = async () => {
    const { data } = await axios.get('/api/hello');
    console.log(data);
  };
  return (
    <Layout>
      <Card color='blue'>
        <CardContent>
          <FormControl>
            <FormLabel>Tema</FormLabel>
            <RadioGroup
              value={currentTheme}
              onChange={(e) => onThemeChange(e)}
            >
              <FormControlLabel
                value={'light'}
                control={<Radio />}
                label='Light'
              />
              <FormControlLabel
                value={'dark'}
                control={<Radio />}
                label='Dark'
              />
              <FormControlLabel
                value={'custom'}
                control={<Radio />}
                label='Custom'
              />
            </RadioGroup>
          </FormControl>
          <Button onClick={() => onClick()}>Solicitud</Button>
        </CardContent>
      </Card>
    </Layout>
  );
};

//getServerSideProps convierte el componente de statica a Server side rendering
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { theme = 'light' } = ctx.req.cookies;

  const validThemes = ['light', 'dark', 'custom'];
  return {
    props: {
      theme: validThemes.includes(theme) ? theme : 'dark',
    },
  };
};

export default ThemeChangerPage;
