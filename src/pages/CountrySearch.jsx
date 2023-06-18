import {
  Container,
  SearchForm,
  Section,
  Loader,
  CountryList,
} from 'components';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchByRegion } from 'service/country-service';

export const CountrySearch = () => {
  const [countries, setCountries] = useState([]);
  const [isLoader, setIsLoader] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const region = searchParams.get('region');
    if (!region) return;
    setIsLoader(true);
    fetchByRegion(region)
      .then(data => setCountries(data))
      .finally(() => {
        setIsLoader(false);
      });
  }, [searchParams]);

  const handleSearchSubmit = region => {
    setSearchParams({ region });
  };

  return (
    <Section>
      <Container>
        <SearchForm onSubmit={handleSearchSubmit} />
        {isLoader && <Loader />}
        <CountryList countries={countries} />
      </Container>
    </Section>
  );
};
