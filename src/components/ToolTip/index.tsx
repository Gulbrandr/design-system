import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { useId } from 'react';

type ToolTipProps = {
  content: string;
  children: React.ReactNode;
  strategy?: 'fixed' | 'absolute';
  postion?: 'top' | 'bottom' | 'left' | 'right';
};
const ToolTip = ({
  children,
  content,
  strategy,
  postion = 'bottom',
}: ToolTipProps) => {
  const id = useId();
  return (
    <>
      <a
        data-tooltip-strategy={strategy}
        data-tooltip-postion={postion}
        data-tooltip-id={`my-tooltip-${id}`}
      >
        {children}
      </a>
      <Tooltip className="z-[31]" id={`my-tooltip-${id}`}>
        <div>{content}</div>
      </Tooltip>
    </>
  );
};

export default ToolTip;
