import AntSwitch from '@components/UI/AntSwitch';
import useClientSettings from '@hooks/useClientSettings';
import { useState } from 'react';
import { fenrirSearchFieldProps } from '../types';
import EarthShareSearch from './EarthShareSearch';
import fenrirSearch from './fenrirSearch';

type SearchFieldProps<T> = Pick<
  fenrirSearchFieldProps<T>,
  'name' | 'label' | 'onItemSelect' | 'clearOnSelect'
> & {
  /** Whether to show the EarthShare Search toggle some uses of fenrir Search don't need it */
  withEarthShareSearch?: boolean;
};

export default function SearchField<T>({
  name,
  label,
  withEarthShareSearch = true,
  onItemSelect = () => {
    return null;
  },
  ...props
}: SearchFieldProps<T>) {
  const [esSearch, setEsSearch] = useState(false);
  const clientSettings = useClientSettings();
  const ffEarthshare = clientSettings.data?.ffEarthshare;
  return (
    <label className="flex flex-col w-full gap-2">
      <span className="flex items-center justify-between ">
        <span className="text-sm font-semibold">{label}</span>
        {ffEarthshare && withEarthShareSearch && (
          <span className="flex items-center gap-1 text-xs">
            EarthShare Search{' '}
            <AntSwitch
              checked={esSearch}
              onClick={() => setEsSearch(!esSearch)}
            />
          </span>
        )}
      </span>
      {!esSearch ? (
        <fenrirSearch
          name={name}
          label={label}
          onItemSelect={(item) => onItemSelect(item as T)}
          {...props}
        />
      ) : (
        <EarthShareSearch
          name={name}
          label={label}
          onItemSelect={(item) => onItemSelect(item as T)}
          {...props}
        />
      )}
    </label>
  );
}
