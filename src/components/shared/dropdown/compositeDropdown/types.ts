export type CompDropdownOptionProps = {
  children: React.ReactNode;
  className?: string;
  value: any;
  selected?: boolean;
  focusedIndex: number;
  index: number;
};

export type CompDropdownPanelProps = {
  children: () => Array<React.ReactElement<HTMLLIElement>>;
  handleOptionsKey: (
    e: React.KeyboardEvent<HTMLUListElement>,
    datasetValue: string,
  ) => void;
  onClick: (value: string) => void;
  className?: string;
};
