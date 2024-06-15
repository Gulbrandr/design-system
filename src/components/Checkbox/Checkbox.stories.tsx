/* eslint-disable */
import { useState } from 'react';
import Checkbox from '.';
import { useTheme } from '../../hooks/useTheme';

export default {
  title: 'Interaction/Checkbox',
};

export const Default = () => {
  useTheme();
  const [checked, setChecked] = useState(false);
  const handleChange = () => {
    setChecked(!checked);
  };
  return (
    <>
      <Checkbox checked={checked} onChange={handleChange} />{' '}
      {checked ? 'Checked' : 'Unchecked'}{' '}
    </>
  );
};

Default.story = {
  name: 'default',
};
