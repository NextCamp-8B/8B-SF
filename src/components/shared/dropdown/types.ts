export type SelectedOption = {
  value: string;
  text: string;
  selected?: boolean;
};
export type DefaultDropdownProps = {
  label: string;
  initialOptions: Array<SelectedOption>;
  selectOption: (selected: SelectedOption) => void;
};

export type SetIsOpenType = React.Dispatch<
  React.SetStateAction<boolean>
>;
