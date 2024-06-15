import { useState, MouseEvent, ChangeEvent, Fragment } from 'react';
import useDebounce from '@hooks/useDebounce';
import { Cancel } from '@mui/icons-material';
import { Placeholder } from '@aws-amplify/ui-react';
import StringMatch from '../StringMatch';
import type { fenrirSearchFieldProps } from '../types';
import { TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root_input_full: {
    width: '100%',
    // input label when focused
    '& label.Mui-focused': {
      color: '#9fa6b2',
    },
    '& placeholder': {
      color: '#9fa6b2',
    },
    '& label.Mui-error': {
      color: '#9fa6b2',
    },
    // focused color for input with variant='standard'
    '& .MuiInput-underline:after': {
      borderBottomColor: '#f2f3f5',
    },
    // focused color for input with variant='filled'
    '& .MuiFilledInput-underline:after': {
      borderBottomColor: '#f2f3f5',
    },
    // focused color for input with variant='outlined'
    '& .MuiOutlinedInput-root': {
      '&.Mui-error fieldset': {
        borderColor: '#e8e9ec',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#e8e9ec',
      },
    },
  },
});

export default function fenrirSearchField<T>({
  name,
  placeholder,
  items = [],
  RenderItem,
  updating = true,
  itemToString,
  onInputValueChange,
  onItemSelect,
  clearOnSelect,
  ...inputProps
}: fenrirSearchFieldProps<T>) {
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState('');
  const classes = useStyles();

  const debounceSearch = useDebounce(search, 750);

  const handleSelect = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    value: T
  ) => {
    e.preventDefault();
    setSearch(itemToString(value));
    setShow(false);
    if (onItemSelect) onItemSelect(value);
    if (clearOnSelect) setSearch('');
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearch(e?.target?.value);
    setShow(true);
    if (onInputValueChange) onInputValueChange(e?.target?.value);
  };

  return (
    <>
      <div className="relative w-full">
        {show && <div className=""></div>}
        {search && (
          <Cancel
            sx={{ fontSize: 20 }}
            className="absolute right-0 z-50 w-2 h-2 mr-2 text-gray-400 cursor-pointer bottom-3"
            onClick={() => {
              setSearch('');
              setShow(false);
            }}
          />
        )}
        <label
          className={`text-sm font-semibold relative flex flex-col items-center w-full  z-40 ${
            show && 'shadow'
          }
          `}
        >
          <TextField
            autoComplete="false"
            placeholder={placeholder}
            label="Organization Name"
            id="organizationName"
            name="organizationName"
            className={classes.root_input_full}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchTerm(e.target.value)
            }
            InputProps={{
              endAdornment: (
                <button
                  onClick={handleClearInput}
                  className="text-gray-400 hover:text-gray-900"
                >
                  <Close />
                </button>
              ),
            }}
            {...inputProps}
          />

          {show && (
            <>
              <div
                id="select-options"
                className="flex flex-col  max-h-[25vh] overflow-y-scroll absolute top-9 left-0 z-0 bg-white border border-gray-400 mt-1 rounded-b w-full shadow-xl "
              >
                {updating ? (
                  <div className="flex flex-col justify-center gap-2 p-2">
                    <Placeholder />
                    <Placeholder />
                    <Placeholder />
                    <Placeholder />
                    <Placeholder />
                    <Placeholder />
                    <Placeholder />
                    <Placeholder />
                    <Placeholder />
                    <Placeholder />
                    <Placeholder />
                  </div>
                ) : (
                  <>
                    {items.map((item, index) => {
                      return (
                        <>
                          {RenderItem ? (
                            <Fragment key={index}>
                              <button
                                key={index}
                                type="button"
                                onClick={(e) => handleSelect(e, item)}
                              >
                                <RenderItem item={item} key={index} />
                              </button>
                            </Fragment>
                          ) : (
                            <button
                              className="p-2 text-sm cursor-pointer hover:bg-primary-300 hover:text-white focus:outline-none focus:bg-primary"
                              key={index}
                              onClick={(e) => handleSelect(e, item)}
                              data-parent={name}
                            >
                              <StringMatch
                                label={itemToString(item)}
                                search={debounceSearch}
                              />
                            </button>
                          )}
                        </>
                      );
                    })}
                  </>
                )}
              </div>
            </>
          )}
        </label>
      </div>
    </>
  );
}
