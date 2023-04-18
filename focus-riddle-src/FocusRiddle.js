import React, { useCallback, useState } from 'react';

function FocusRiddle() {
  const [currentRow, setCurrentRow] = useState({
    firstName: 'Barack',
    lastName: 'Obama'
  });

  const updateRow = useCallback((name, value) => {
    setCurrentRow((c) => ({ ...c, [name]: value }));
  }, []);

  // solution by https://stackoverflow.com/questions/61834777/react-jsx-vs-function-there-are-difference-in-focus-handling/61835121#61835121

  return (
    <div>
      <Att currentRow={currentRow} updateRow={updateRow} />
    </div>
  );
}

function MyInput({ name, row, action }) {
  return (
    <input
      value={row[name]}
      onChange={(event) => action(name, event.target.value)}
    />
  );
}

export default FocusRiddle;

function Att(props) {
  return (
    <div>
      <h1>Welcome to Focus Riddle</h1>
      <div>
        <MyInput
          key={'firstName'}
          name={'firstName'}
          row={props.currentRow}
          action={props.updateRow}
        />
      </div>
      <div>
        <MyInput
          key={'lastName'}
          name={'lastName'}
          row={props.currentRow}
          action={props.updateRow}
        />
      </div>
      <div>
        <button onClick={() => alert(JSON.stringify(props.currentRow))}>
          Show Row
        </button>
      </div>
    </div>
  );
}
