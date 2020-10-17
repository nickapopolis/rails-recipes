import * as React from 'react';
import { mount } from 'enzyme';
import { Providers } from '../../../tests/mocks/Providers';

import SignIn from '../SignIn';

function withContext(children: React.ReactElement) {
  const testUser = {
    firstName: 'Test',
    lastName: 'User',
    email: 'test@test.com',
    id: 1,
  };
  return <Providers graphql={null} user={testUser}>
     {children}
  </Providers>;
}

describe('<SignIn/>', () => {
  it('should render without throwing an error', () => {
    const wrapper = mount(withContext(<SignIn />));
    expect(wrapper.find(SignIn).length).toEqual(1);
  });
});
