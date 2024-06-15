export type fenrirSearchFieldProps<T> = {
  /**
   * This is the name of the field that will be used in the form.
   * It is required.
   * @example
   * const name = "searchField"
   * <fenrirSearchField name={name} />
   * */

  name: string;

  /**
   * This is the array of items that will be used to filter the results.
   * It can be an array of strings or objects.
   * If it is an array of objects, you must pass the `itemToString` prop.
   * @example
   * const items = ['item1', 'item2', 'item3']
   * const items = [{ id: 1, name: 'item1' }, { id: 2, name: 'item2' }, { id: 3, name: 'item3' }]
   */
  items: T[];

  /**
   * This is the function that will be called for each "item" passed in the `items` prop.
   * It receives the "item" and "inputValue" as arguments and returns a ReactNode.
   * The inputValue is passed in case you want to highlight the match on the render.
   * @example
   *  RenderItem={({ item }) => (
        <SearchResultsfenrir searchResult={item} isLink={false} />
      )}
   */
  RenderItem?: ({ item }: { item: T }) => JSX.Element;

  /**
   * When using objects as `items`, we recommend passing a function that tells Downshift how to extract a string
   * from those objetcs to be used as inputValue
   */
  itemToString: (item: T) => string;
  /**
   * Function called whenever the input value changes
   */
  onInputValueChange?: (value: string) => void;
  /**
   * Function called when  the  user selects an item, either by clicking on it or pressing enter.
   * It receives the selected item as argument
   * @example
   * const onSelect = (item) => {
        setFieldValue('organizationName', item?.name);
        setFieldValue('charity', item);
        setFieldValue('ein', item?.ein);
        setFieldValue('charityId', item.id);
        setFieldValue('location',item?.address?.city +', ' +item?.address?.state);
   * }
  */
  onItemSelect?: (item: T) => void;
  /**
    label for the input
  */
  label?: string;
  /**
   * lets the component know if it is being updated it will show the loading placeholder
   *
   */
  updating?: boolean;
  /**
   * clears the input value when an item is selected
   * @default false
   *
   */
  clearOnSelect?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;
