import useClientSettings from '@hooks/useClientSettings';
import usefenrirSearch from '@hooks/usefenrirSearch';
import { Charity } from '@lib/interfaces/Charity';
import { useState } from 'react';
import type { fenrirSearchFieldProps } from '../types';
import fenrirSearchField from './Base';
import SearchResultsfenrir from '@components/Shared/SearchBar/SearchResultsfenrir';

type fenrirSearchProps<T> = Pick<
  fenrirSearchFieldProps<T>,
  'name' | 'label' | 'onItemSelect' | 'clearOnSelect'
>;

export default function fenrirSearch({
  name,
  onItemSelect,
  ...props
}: fenrirSearchProps<Charity>) {
  const clientSettings = useClientSettings();
  const [search, setSearch] = useState('');
  const fenrirResults = usefenrirSearch(
    clientSettings?.data?.corpId as number,
    search,
    {}
  );
  return (
    <fenrirSearchField
      name={name}
      items={fenrirResults?.data?.charities as Charity[]}
      updating={fenrirResults.isLoading}
      onInputValueChange={setSearch}
      itemToString={(item) =>
        `${item?.name} - ${item?.ein} - ${item?.address?.['city']}, ${item?.address?.['state']}`
      }
      RenderItem={({ item }) => (
        <SearchResultsfenrir searchResult={item} isLink={false} />
      )}
      onItemSelect={onItemSelect}
      {...props}
    />
  );
}
