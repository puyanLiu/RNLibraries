import { NavigationScreenConfigProps } from 'react-navigation';
import { connect } from 'react-redux';
import { InjectedFormProps, reduxForm, formValueSelector } from 'redux-form';
import { toast, IToastConfig } from './toast';
import { withMappedNavigationParams } from 'react-navigation-props-mapper';

export interface INormalProps {
  dispatch?: any;
}

/**
 * 继承react-navigation传递到页面中props
 */
export interface INormalComponentProps extends Partial<NavigationScreenConfigProps<any, any>> {
  userToken?: {
    token: string;
    userId: number;
  };
  dispatch?: any;
}

interface INormalConnectProps {
  reducers?: string[];
}

const filterReducersToProps = (state: any, reducers: string[]) => {
  const filterState: { [key: string]: any } = {
    filterState: state.userToken,
  };
  if (reducers && reducers.length > 0) {
    reducers.forEach(key => {
      if (state[key] === undefined) {
        console.warn(`请检查传入的reducer的key是否正确:${key};\n当前reducer keys:${Object.keys(state)}`);
      } else {
        filterState[key] = state[key];
      }
    });
  }
  return filterState;
};

/**
const mapStateToProps = (state: any) => {
    console.log('home返回', state);
    return {
      ...state.userToken,
    };
  };
export default connect(mapStateToProps)(HomeIndex);
 */
const normalConnect = (props?: INormalConnectProps) => (component: any) => {
  const { reducers = []} = props || {};
  const mapStateToProps = (state: any) => {
    return filterReducersToProps(state, reducers);
  };

  return connect(mapStateToProps, null, null, { })(component) as any;
};

// 表单Props
export interface IFormComponentProps<FormData = {}> extends INormalComponentProps, InjectedFormProps<FormData> {
  fieldsValue: any;
}

interface IConfig {
  form: string;
  // 配置需要传递到页面form表单的fieldsValue
  fields?: string[];
  // 配置表单需要校验的规则
  validate?: any;
}

interface IFormConnectProps extends INormalConnectProps {
  config: IConfig;
}

/**
 const mapStateToProps = (state: any) => {
  console.log('login返回', state);
  return {
    ...state.userToken,
  };
};
export default connect(mapStateToProps)(reduxForm({
  form: 'login',
  onSubmitFail: (errors) => {
    console.log('errors~~~~~~', errors);
  },
  validate: (fields: any) => {
    console.log('values~~~~~~~~', fields);
    let errors: any = {};
    if (!fields.phone || fields.phone.length !== 11) {
      errors.phone = '请输入11位手机号';
    }
    return errors;
  },
})(Login));
 */
const formConnect = (props: IFormConnectProps) => (component: any) => {
  const { reducers = [] } = props || {};
  const { fields, ...rest } = props.config;
  const config = {
    // 错误提示
    onSubmitFail(errors: any) {
      const err = Object.values(errors)[0];
      toast({ text: err } as IToastConfig);
    },
    ...rest,
  };
  const mapStateToProps = (state: any) => {
    const filterState = filterReducersToProps(state, reducers);

    // 刷选当前form的值传到props中
    if (Array.isArray(fields) && fields.length > 0) {
      const selector = formValueSelector(config.form);
      const fieldsValue = {} as any;
      fields.forEach(name => {
        fieldsValue[name] = selector(state, name);
      });
      filterState.fieldsValue = fieldsValue;
    }
    return filterState;
  };

  return connect(mapStateToProps, null, null, { })(reduxForm(config)(component)) as any;
};

const mappedNavigationParams = () => (component: any) => {
  return withMappedNavigationParams()(component) as any;
};

export { normalConnect, formConnect, mappedNavigationParams };
