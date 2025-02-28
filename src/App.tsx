import "tailwindcss";
import AutoComplete from './components/AutoComplete/AutoComplete';
import { useFetch } from './hooks/useFetch';
import { Option, DogList } from './components/AutoComplete/AutoComplete.types';
import { useMemo } from "react";


function App() {
  // Please See: important!!!!
  // We can use React Query | SWR to fetch the data
  // it will be more efficient and easier to manage
  // as it will cache the data and only fetch the data when required
  // since i dont have proper API, i will use useFetch hook to fetch the data
  const { data: options, isLoading, isError } = useFetch<DogList>("https://api.thedogapi.com/v1/breeds");

  const handleClickOption = (option: Option) => {
    console.log('option', option);
  }

  const formattedOptions: Option[] = useMemo(() => options?.map((option) => ({
    label: option.name,
    value: option.id,
  })), [options]);

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Search for your favorite dog breed</h1>
      <AutoComplete options={formattedOptions} isLoading={isLoading} onClickOption={handleClickOption} />
    </div>
  )
}

export default App;
