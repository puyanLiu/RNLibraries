import React from 'react';
import ImageButton, { IImageButtonProps } from './ImageButton';

interface IProps extends IImageButtonProps {
  width?: number;
}

const CircleButton = ({ source, width = 80, ...rest }: IProps) => {
  return (
    <ImageButton source={source} {...rest} imageStyle={{ width: width, height: width, borderRadius: width * 0.5 }} />
  );
};

export default CircleButton;
