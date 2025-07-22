import React, { useState } from 'react';
import VoiceInput from './components/voiceinput';

const OperatorProductionForm = () => {
  const [operatorName, setOperatorName] = useState('');

  const handleTranscript = (text) => {
    setOperatorName(text); // Fill voice data into form
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", { operatorName });
    // Add your backend POST logic here
  };

  return (
    <>
    <form onSubmit={handleSubmit}>
      <label>Operator Name:</label>
      <input
        type="text"
        value={operatorName}
        onChange={(e) => setOperatorName(e.target.value)}
      />
      <VoiceInput onTranscript={handleTranscript} />
      <button type="submit">Submit</button>
    </form>
    <VoiceInput/>
    </>
  );
};

export default OperatorProductionForm;
