import React, {useState, useReducer} from 'react';
import axios from 'axios';

interface GreetingState {
  error?: number | null;
  greeting?: string | null;
}

interface GreetingAction extends GreetingState {
  type: string;
}

const initialState: GreetingState = {
  error: null,
  greeting: null,
};

interface FetchProps {
  url: string;
}

function greetingReducer(state: GreetingState, action: GreetingAction) {
  switch (action.type) {
    case 'SUCCESS': {
      return {
        error: null,
        greeting: action.greeting,
      };
    }
    case 'ERROR': {
      return {
        error: action.error,
        greeting: null,
      };
    }
    default: {
      return state;
    }
  }
}

export default function Fetch({url}: FetchProps) {
  const [{error, greeting}, dispatch] = useReducer(
    greetingReducer,
    initialState,
  );

  const [buttonClicked, setButtonClicked] = useState(false);

  const fetchGreeting = async (url: string) =>
    axios
      .get<GreetingState>(url)
      .then((response) => {
        const {data} = response;
        const {greeting} = data;
        dispatch({type: 'SUCCESS', greeting});
        setButtonClicked(true);
      })
      .catch((error) => {
        dispatch({type: 'ERROR', error});
      });

  const buttonText = buttonClicked ? 'OK' : 'Load Greeting';

  return (
    <div>
      <button onClick={() => fetchGreeting(url)} disabled={buttonClicked}>
        {buttonText}
      </button>
      {greeting && <h1>{greeting}</h1>}
      {error && <p role={'alert'}>Oops, failed to fetch!</p>}
    </div>
  );
}
