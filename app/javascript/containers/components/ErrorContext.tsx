import * as React from 'react';
import { createContext } from 'react';
import * as _ from 'lodash';

interface ErrorContextValue {
  errors?: string[];
  push(message:string): void;
  push(i:number): void;
}
const ErrorContext = createContext<ErrorContextValue>({
  errors: [],
  push: (message:string) => { throw Error('Not implemented'); },
  dismiss: (i:number) => { throw Error('Not implemented'); },
});

interface ErrorContextProviderProps {
  children: React.ReactElement;
}
function ErrorContextProvider({ children }: ErrorContextProviderProps) {
  const [errors, setErrors] = React.useState([]);
  return <ErrorContext.Provider value={{
    errors,
    dismiss(i) {
      setErrors([]);
    },
    push(message) {
      setErrors([
        message,
        ...errors,
      ]);
    },
  }}>
    {children}
  </ErrorContext.Provider>;
}
export { ErrorContext, ErrorContextProvider };
