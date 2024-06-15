/* eslint-disable */
import ChildrenModal from '.';

export default {
  title: 'Layout/ChildrenModal',
};

export const Default = () => (
  <ChildrenModal
    isOpen={false}
    setIsOpen={function (
      value: boolean | ((prevVar: boolean) => boolean)
    ): void {
      throw new Error('Function not implemented.');
    }}
  />
);

Default.story = {
  name: 'default',
};
