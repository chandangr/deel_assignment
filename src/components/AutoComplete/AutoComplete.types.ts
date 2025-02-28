export type Option = {
    label: string;
    value: string;
  }
  
export type AutoCompleteProps = {
    options: Option[];
    isLoading: boolean;
    onClickOption?: (option: Option) => void
}
  

export type DogList = {
    id: string;
    name: string;
    temperament: string;
    origin: string;
}
