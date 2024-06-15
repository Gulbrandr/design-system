import React, { useEffect, useMemo, useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { HiOutlinePlusCircle } from 'react-icons/hi2';

import { Button } from '.';
import { setupColors } from '../utils/commonUtils';
import { ThemeProvider, useTheme } from '../../hooks/useTheme';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export

const meta: Meta<typeof Button> = {
  title: 'Interaction/Button',
  component: Button,
  render(args) {
    return (
      <ThemeProvider>
        <Button {...args} />
      </ThemeProvider>
    );
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};

export const Tertiary: Story = {
  args: {
    variant: 'tertiary-primary',
    children: 'Tertiary Button',
  },
};

export const TertiaryWithIcon: Story = {
  args: {
    variant: 'tertiary-gray',
    children: (
      <>
        <HiOutlinePlusCircle className="w-6 h-6" />
        <span>Tertiary-Primary</span>
        <span className="w-5 h-5 pl-px rounded-full -pr-px text-body-3">4</span>
      </>
    ),
  },
};
