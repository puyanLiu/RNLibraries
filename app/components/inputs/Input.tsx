import React, { Component } from 'react';
import { Field } from 'redux-form';
import TextInputField, { ITextInputFieldOwnProps } from './TextInputField';

export interface IInputProps extends ITextInputFieldOwnProps {
  name: string;
}

interface IState {
}

const MyField = Field as any;

class Input extends Component<IInputProps, IState> {
  ins: any;

  render() {
    const { name, ...rest } = this.props;
    return (
      <MyField component={TextInputField} name={name} ref={(ref: any) => this.ins = ref} {...rest} forwardRef />
    );
  }
}

export default Input;
