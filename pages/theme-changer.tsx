import React, { ChangeEvent, useState, FC, useContext } from 'react';
import { GetServerSideProps } from 'next';
import {
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
import { LanguageContext } from '../context/LanguageContext';

interface Props {
  theme: string;
}

const ThemeChangerPage: FC<Props> = ({ theme }) => {
  const [currentTheme, setCurrentTheme] = useState(theme);
  const data = useContext(LanguageContext);

  const onThemeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const theme = e.target.value;
    setCurrentTheme(theme);
    Cookies.set('theme', theme);
  };

  return (
    <Layout>
      <Card color='blue'>
        <CardContent>
          <FormControl>
            <FormLabel>{data?.dictionary.THEME}</FormLabel>
            <RadioGroup
              value={currentTheme || 'dark'}
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
        </CardContent>
      </Card>
    </Layout>
  );
};

//getServerSideProps convierte el componente de statica a Server side rendering
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { theme = 'dark' } = ctx.req.cookies;

  const validThemes = ['light', 'dark', 'custom'];
  return {
    props: {
      theme: validThemes.includes(theme) ? theme : 'dark',
    },
  };
};

export default ThemeChangerPage;
