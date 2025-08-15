import type { FC } from 'react';

import { Select } from 'antd';
import { css } from '@emotion/react';
import { DefaultOptionType } from 'antd/es/select';


type MySelectProps = {
  title: string;
  placeholder: string;
  options: DefaultOptionType[];
  value: string[];
  onChange: (val: string[]) => void;
}

const MySelect: FC<MySelectProps> = ({title, placeholder, options, value, onChange}) => {
  return (
    <fieldset css={style}>
      <legend>{title}</legend>
      <Select
        className='w-full'
        mode='multiple'
        placeholder={placeholder}
        options={options}
        value={value}
        onChange={onChange}
      />
    </fieldset>
  );
};

export default MySelect;

const style = css`
border-color: #ffffff80;
transition: all 0.2s ease-in-out;
border-radius: 5px 5px;
padding: 0px 0px;
&:hover{
  border-color: #fffffff2;
}
 legend {
  margin-left: 10px;
  padding: 0 6px;
  color: #fffffff2;
}
`;
