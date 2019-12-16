import React, { Component } from 'react';
import { ART, ARTRenderableMixin } from 'react-native';

const CIRCLE = Math.PI * 2;

function makeArcPath(x: number, y: number, startAngleArg: number,
                     endAngleArg: number, radius: number, direction: 'clockwise' | 'counter-clockwise') {
  let startAngle = startAngleArg;
  let endAngle = endAngleArg;
  endAngle = endAngle % CIRCLE;
  if (endAngle - startAngle >= CIRCLE) {
    endAngle = CIRCLE + (endAngle % CIRCLE);
  }
  startAngle = startAngle % CIRCLE;
  const angle =
    startAngle > endAngle
      ? CIRCLE - startAngle + endAngle
      : endAngle - startAngle;

  if (angle >= CIRCLE) {
    return ART.Path()
      .moveTo(x + radius, y)
      .arc(0, radius * 2, radius, radius)
      .arc(0, radius * -2, radius, radius)
      .close();
  }

  const directionFactor = direction === 'counter-clockwise' ? -1 : 1;
  endAngle *= directionFactor;
  startAngle *= directionFactor;
  const startSine = Math.sin(startAngle);
  const startCosine = Math.cos(startAngle);
  const endSine = Math.sin(endAngle);
  const endCosine = Math.cos(endAngle);

  const arcFlag = angle > Math.PI ? 1 : 0;
  const reverseFlag = direction === 'counter-clockwise' ? 0 : 1;

  return `M${x + radius * (1 + startSine)} ${y + radius - radius * startCosine}
          A${radius} ${radius} 0 ${arcFlag} ${reverseFlag} ${x +
    radius * (1 + endSine)} ${y + radius - radius * endCosine}`;
}

interface IOffset {
  top: number;
  left: number;
}

interface IProps extends ARTRenderableMixin {
  startAngle?: number; // in radians
  endAngle: number; // in radians
  radius: number;
  offset?: IOffset;
  strokeCap?: 'butt' | 'square' | 'round';
  strokeWidth?: number;
  direction?: 'clockwise' | 'counter-clockwise';
}

interface IState {
}

export default class Arc extends Component<IProps, IState> {
  static defaultProps = {
    startAngle: 0,
    offset: { top: 0, left: 0 },
    strokeCap: 'round',
    strokeWidth: 10,
    direction: 'clockwise',
  };

  render() {
    const {
      startAngle,
      endAngle,
      radius,
      offset,
      direction,
      strokeCap,
      strokeWidth,
      // tslint:disable-next-line: trailing-comma
      ...restProps
    } = this.props;

    const path = makeArcPath(
      (offset.left || 0) + strokeWidth / 2,
      (offset.top || 0) + strokeWidth / 2,
      startAngle,
      endAngle,
      radius - strokeWidth / 2,
      direction,
    );

    return (
      <ART.Shape
        d={path}
        strokeCap={strokeCap}
        strokeWidth={strokeWidth}
        {...restProps}
      />
    );
  }
}
