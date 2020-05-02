import * as React from 'react';
import * as _ from 'lodash';
import SearchBox from '../../components/SearchBox';

export default function AppbarSearchBox() {
  const [inputValue, setInputValue]  = React.useState('');

  const handleInputChange = event => {
    const { value } = event.target;
    setInputValue(value);
  };
  return <div>
    <SearchBox inputValue={inputValue} handleInputChange={handleInputChange}/>
  </div>;
}
