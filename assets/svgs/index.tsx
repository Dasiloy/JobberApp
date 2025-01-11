import React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export const UserIcon = ({
  width = 20,
  height = 20,
  color = "currentColor",
  ...props
}: SvgProps) => (
  <Svg width={width} height={height} viewBox='0 0 20 20' fill='none' {...props}>
    <Path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M9.87041 18.0516C6.7939 18.0516 4.16663 17.5728 4.16663 15.6555C4.16663 13.7382 6.77723 11.9683 9.87041 11.9683C12.9469 11.9683 15.5742 13.7211 15.5742 15.6384C15.5742 17.5549 12.9636 18.0516 9.87041 18.0516Z'
      stroke={color}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <Path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M9.86435 9.31136C11.8833 9.31136 13.5197 7.675 13.5197 5.65606C13.5197 3.63712 11.8833 2 9.86435 2C7.84542 2 6.20827 3.63712 6.20827 5.65606C6.20148 7.66818 7.82648 9.30455 9.8386 9.31136C9.84769 9.31136 9.85602 9.31136 9.86435 9.31136Z'
      stroke={color}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </Svg>
);

export const LockIcon = ({
  width = 20,
  height = 20,
  color = "currentColor",
  ...props
}: SvgProps) => (
  <Svg width={width} height={height} viewBox='0 0 20 20' fill='none' {...props}>
    <Path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M13.6117 2.29175H6.38758C3.87008 2.29175 2.29175 4.07425 2.29175 6.59675V13.4034C2.29175 15.9259 3.86258 17.7084 6.38758 17.7084H13.6109C16.1367 17.7084 17.7084 15.9259 17.7084 13.4034V6.59675C17.7084 4.07425 16.1367 2.29175 13.6117 2.29175Z'
      stroke={color}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <Path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M8.90759 10.0001C8.90759 10.8526 8.21676 11.5435 7.36426 11.5435C6.51176 11.5435 5.82092 10.8526 5.82092 10.0001C5.82092 9.14762 6.51176 8.45679 7.36426 8.45679H7.36676C8.21759 8.45762 8.90759 9.14845 8.90759 10.0001Z'
      stroke={color}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <Path
      d='M8.91003 10H14.175V11.5433'
      stroke={color}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <Path
      d='M11.8181 11.5436V10.0002'
      stroke={color}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </Svg>
);
