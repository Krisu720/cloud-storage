import useSWR from "swr";


const useFetch = <T>( endpoint:string, fetcher:()=>Promise<T>) => {
  const { data, isLoading, error,mutate } = useSWR(endpoint, fetcher);

  return {
    data,
    isLoading,
    error,
    mutate
  };
};

export default useFetch;
