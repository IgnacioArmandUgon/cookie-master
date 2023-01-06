import React, {
  ChangeEvent,
  useState,
  useEffect,
  FC,
  useContext,
} from 'react';
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
  language: string;
}

const LanguageChangerPage: FC<Props> = ({ language }) => {
  const [currentLanguage, setCurrentLanguage] = useState(language);
  const data = useContext(LanguageContext);

  const onThemeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const theme = e.target.value;
    setCurrentLanguage(theme);
    localStorage.setItem('language', theme);
    Cookies.set('language', theme);
  };
  useEffect(() => {
    localStorage.setItem('language', currentLanguage);
    Cookies.set('language', currentLanguage);
  }, [currentLanguage]);

  return (
    <Layout>
      <Card color='blue'>
        <CardContent>
          <FormControl>
            <FormLabel>{data?.dictionary.LANGUAGE}</FormLabel>
            <RadioGroup
              value={currentLanguage}
              onChange={(e) => onThemeChange(e)}
            >
              <FormControlLabel
                value={'spanish'}
                control={<Radio />}
                label={data?.dictionary.SPANISH}
              />
              <FormControlLabel
                value={'english'}
                control={<Radio />}
                label={data?.dictionary.ENGLISH}
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
  const { language = 'english' } = ctx.req.cookies;

  const validLanguage = ['spanish', 'english'];
  return {
    props: {
      language: validLanguage.includes(language) ? language : 'english',
    },
  };
};

export default LanguageChangerPage;
