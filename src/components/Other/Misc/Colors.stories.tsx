import type { Meta, Story } from '@storybook/react';
import Misc from '@/components/Other/Misc';

const meta: Meta = {
  title: 'Misc/Colors',
  component: Misc,
};

export default meta;

const Template: Story<Meta> = (args) => {
  return <Misc />;
};

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {
  ...meta.args,
};
