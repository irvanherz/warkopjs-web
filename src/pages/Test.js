import React from 'react';
import TooltipTrigger from 'react-popper-tooltip';
import 'react-popper-tooltip/dist/styles.css';

function Trigger({ getTriggerProps, triggerRef }) {
  return (
    <span
      {...getTriggerProps({
        ref: triggerRef,
        className: 'trigger'
      })}
    >
      Click Me!
    </span>
  );
}

function Tooltip({
  getTooltipProps,
  getArrowProps,
  tooltipRef,
  arrowRef,
  placement
}) {
  return (
    <div
      {...getTooltipProps({
        ref: tooltipRef,
        className: 'tooltip-container'
      })}
    >
      <div
        {...getArrowProps({
          ref: arrowRef,
          'data-placement': placement,
          className: 'tooltip-arrow'
        })}
      />
      <div className="tooltip-body">Hello, World!</div>
    </div>
  );
}

function Test() {
  return (
    <TooltipTrigger placement="right" trigger="click" tooltip={Tooltip}>
      {Trigger}
    </TooltipTrigger>
  );
}

export default Test