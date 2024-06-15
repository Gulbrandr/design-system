import React, { FC } from 'react';

export type LabelProps = {
  /**
   * The label text
   */
  text: string;
};
export const Label: FC<LabelProps> = ({ text }) => {
  return <label>{text}</label>;
};

export const HelperText = () => {};
