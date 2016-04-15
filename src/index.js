import React from 'react';
import { render } from 'react-dom';

class Index extends React.Component {
  render(){
    return(
      <div>
        Hello from index component!
      </div>
    )
  }
}

render(
  <Index />,
  document.getElementById('root')
)
