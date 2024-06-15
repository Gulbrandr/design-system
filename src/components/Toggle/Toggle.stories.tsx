/* eslint-disable */
import { useTheme } from '../../hooks/useTheme';
import Switch from '.';
import { useState } from 'react';

export default {
  title: 'Interaction/Switch',
};

export const Default = () => {
  useTheme();
  const [checked, setChecked] = useState(false);
  return (
    <>
      <Switch
        checked={checked}
        onChange={() => setChecked(!checked)}
        label="label"
      />
      {checked && <div>Checked</div>}
      {!checked && <div>Unchecked</div>}
    </>
  );
};

Default.story = {
  name: 'default',
};
