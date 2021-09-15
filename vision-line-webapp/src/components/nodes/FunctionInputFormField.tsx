import { FunctionInput } from '../../api';
import { TextField, Select, MenuItem } from '@material-ui/core';

export function FunctionInputFormField(props: {
  input: FunctionInput,
  value: string,
  autoFocus: boolean
  onChange: (value: any) => void,
}) {
  const input = props.input;

  if (input.type === 'enum') {
    return (
      <Select id={input.name + 'Param'} value={props.value} onChange={props.onChange}>
        {input.values?.map((v, i) => (
          <MenuItem key={i} value={v as unknown as string}>{v}</MenuItem>
        ))}
      </Select>
    );
  }

  let textFieldType = 'text';
  switch (input.type) {
    case 'int':
      textFieldType = 'number';
      break;
  }

  return (
    <TextField id={input.name + 'Param'} label={input.display} required autoFocus={props.autoFocus}
      value={props.value} onChange={props.onChange} type={textFieldType}
    />
  );
}