import * as React from 'react';
import { createContext } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  id: number;
}
interface UserContextValue {
  user?: User;
  reload(): void;
}
const UserContext = createContext<UserContextValue>({
  user: null,
  reload: () => { throw Error('Not implemented'); },
});

const CURRENT_USER_QUERY = gql`
  query CurrentUser {
    currentUser {
      firstName
      lastName
      email
    }
  }
`;

interface UserContextProviderProps {
  children: React.ReactElement;
  client: any;
}
function UserContextProvider({ children, client }: UserContextProviderProps) {
  return <Query query={CURRENT_USER_QUERY}>
    {({ data , loading }) => {
      return <UserContext.Provider value={{
        user: data ? data.currentUser : null,
        reload() {
          client.resetStore();
        },
      }}>
        {children}
      </UserContext.Provider>;
    }}
  </Query>;
}
export { UserContext, UserContextProvider };
