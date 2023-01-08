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
  language: string;
}

const LanguageChangerPage: FC<Props> = ({ language }) => {
  const [currentLanguage, setCurrentLanguage] = useState(language);
  const data = useContext(LanguageContext);

  const onLanguageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const language = e.target.value;
    setCurrentLanguage(language);
    Cookies.set('language', language);
  };

  return (
    <Layout>
      <Card color='blue'>
        <CardContent>
          <FormControl>
            <FormLabel>{data?.dictionary.LANGUAGE}</FormLabel>
            <RadioGroup
              value={currentLanguage}
              onChange={(e) => onLanguageChange(e)}
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

//getServerSideProps convierte el componente de statico a Server side rendered
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
