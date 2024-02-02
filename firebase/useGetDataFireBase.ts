import React, { useEffect } from "react";
import { firebaseGetData } from "./firebaseGetData";

type Props<T> = {
  path: string;
  enable? : boolean
};

export default function useGetDataFireBase<T>({ path , enable = true }: Props<T>) {
  const [state, setState] = React.useState<{data? : T , error : any , loading : boolean}>({
    data: undefined,
    error: undefined,
    loading: false,
  });

  useEffect(() => {
    if(enable){
      setState((prevState) => ({ ...prevState, loading: true }));
      firebaseGetData(path, (data:any) => {
        setState({ data: data, error: null, loading: false });
      });
    }
  }, [path , enable]);

  return state;
}