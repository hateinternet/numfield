import React from 'react';
import 'normalize.css';
import './App.css';
import NumericField from '../NumericField';

const App = () => {
    return (
        <div className="app">
            <div className="app__field">
                <NumericField />
            </div>
        </div>
    );
};

export default App;
