import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState(null);
    const [selected, setSelected] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const parsedInput = JSON.parse(input);
            const arrayKey = Object.keys(parsedInput).find(key => Array.isArray(parsedInput[key]));

            if (!arrayKey) {
                throw new Error('Invalid JSON format: No array found in the JSON object');
            }
            const dataArray = parsedInput[arrayKey];
            const res = await axios.post('http://localhost:3006/bfhl', { data: dataArray });
            setResponse(res.data);
        } catch (err) {
            console.error(err);
            alert('Invalid JSON input: Ensure your JSON object contains at least one array');
        }
    };

    const handleSelectChange = (e) => {
        const options = e.target.options;
        const selectedOptions = [];
        for (let i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                selectedOptions.push(options[i].value);
            }
        }
        setSelected(selectedOptions);
    };

    return (
        <div className="App">
            <h1>Bajaj Assignment Sankeerthana</h1>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder='Enter complete JSON here...'
                    rows="10"
                    cols="50"
                />
                <br />
                <button type="submit">Submit</button>
            </form>

            {response && (
                <div>
                    <select multiple={true} onChange={handleSelectChange}>
                        <option value="alphabets">Alphabets</option>
                        <option value="numbers">Numbers</option>
                        <option value="highest_alphabet">Highest Alphabet</option>
                    </select>
                    <div>
                        {selected.includes('alphabets') && (
                            <div>
                                <h2>Alphabets</h2>
                                <pre>{JSON.stringify(response.alphabets, null, 2)}</pre>
                            </div>
                        )}
                        {selected.includes('numbers') && (
                            <div>
                                <h2>Numbers</h2>
                                <pre>{JSON.stringify(response.numbers, null, 2)}</pre>
                            </div>
                        )}
                        {selected.includes('highest_alphabet') && (
                            <div>
                                <h2>Highest Alphabet</h2>
                                <pre>{JSON.stringify(response.highest_alphabet, null, 2)}</pre>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
