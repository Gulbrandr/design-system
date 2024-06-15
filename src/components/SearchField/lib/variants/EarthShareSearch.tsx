import useClientSettings from '@hooks/useClientSettings';
import { EsCharityItem } from '@lib/interfaces/EsCharity';
import { useState } from 'react';
import type { fenrirSearchFieldProps } from '../types';
import fenrirSearchField from './Base';

import SearchResultsEarthshare from '@components/Shared/SearchBar/SearchResultsEarthshare';
import useEarthShareSearch from '@hooks/useEarthShareSearch';

type fenrirSearchProps<T> = Pick<
  fenrirSearchFieldProps<T>,
  'name' | 'label' | 'onItemSelect' | 'clearOnSelect'
>;

export default function EarthShareSearch({
  name,
  label,
  onItemSelect,
}: fenrirSearchProps<EsCharityItem>) {
  const clientSettings = useClientSettings();
  const [search, setSearch] = useState('');
  const fenrirResults = useEarthShareSearch(
    clientSettings?.data?.corpId as number,
    search,
    true
  );

  return (
    <fenrirSearchField
      label={label}
      name={name}
      items={fenrirResults?.data?.charities as EsCharityItem[]}
      updating={fenrirResults.isLoading}
      onInputValueChange={setSearch}
      itemToString={(item: EsCharityItem) =>
        `${item?.earthshareCharity?.charityName} - ${item?.earthshareCharity?.ein} - ${item?.earthshareCharity?.extraField?.address?.['city']}, ${item?.earthshareCharity?.extraField?.address?.['state']}`
      }
      RenderItem={({ item }) => (
        <div className="flex justify-start">
          <SearchResultsEarthshare searchResult={item} isLink={false} />
        </div>
      )}
      onItemSelect={onItemSelect}
    />
  );
}
