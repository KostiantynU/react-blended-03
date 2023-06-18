import { Container, CountryList, Loader, Section } from 'components';
import { useEffect, useState } from 'react';
import { getCountries } from 'service/country-service';

export const Home = () => {
  const [countries, setCountries] = useState([]);
  const [isLoader, setIsLoader] = useState(false);
  useEffect(() => {
    setIsLoader(true);
    getCountries()
      .then(resultArr => setCountries(resultArr))
      .finally(setIsLoader(false));
  }, []);
  return (
    <Section>
      <Container>
        {isLoader && <Loader />}
        <CountryList countries={countries} />
      </Container>
    </Section>
  );
};
