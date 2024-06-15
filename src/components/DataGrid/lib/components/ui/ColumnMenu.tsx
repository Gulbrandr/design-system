import { Menu, Transition } from '@headlessui/react';
import { FC, Fragment } from 'react';

import { MdMoreHoriz } from 'react-icons/md';

interface MenuHelperProps {
  menuItems: MenuItem[];
}

type MenuItem = {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Icon: any & {
    muiName: string;
  };
  handler: () => void;
};

const MenuHelper: FC<MenuHelperProps> = ({ menuItems = [] }) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center rounded-full   p-1  text-sm font-medium text-primary-500 focus:outline-none focus-visible:ring-0 focus-visible:ring-white focus-visible:ring-opacity-75 ">
          <MdMoreHoriz />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className="absolute right-1  w-40  origin-top-right  rounded-br rounded-bl bg-white  z-40 border-x border-b shadow-lg"
          as="ul"
        >
          <div className="w-full overflow-hidden flex absolute z-40 -mt-4 top-0 right-0  justify-end divide-y ">
            <div className="h-4 flex w-full  border-b"></div>
            <div className=" h-4 w-4 bg-white border rotate-45 transform origin-bottom-left z-50   mr-2"></div>
          </div>
          <div className="h-[2px]"></div>
          {menuItems.map(({ name, Icon, handler }, index) => {
            return (
              <Menu.Item key={index} as="li">
                {({ active }) => (
                  <button
                    className={`${
                      active
                        ? ' border-l-4 border-secondary-400 '
                        : 'border-l-4 border-transparent'
                    } text-gray-900 group flex w-full items-center justify-between  p-2 text-sm `}
                    onClick={handler}
                  >
                    {active ? (
                      <Icon
                        sx={{
                          fontSize: 18,
                          stroke: 'var(--secondary-300)',
                          fill: 'var(--secondary-600)',
                        }}
                      />
                    ) : (
                      <Icon
                        sx={{
                          fontSize: 18,
                          stroke: 'var(--secondary-300)',
                          fill: 'var(--secondary-600)',
                        }}
                      />
                    )}
                    {name}
                  </button>
                )}
              </Menu.Item>
            );
          })}
          <div className="h-[2px]"></div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default MenuHelper;
