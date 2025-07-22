import React, { useState, useEffect } from 'react';
import AdminDropdownManager from './admindropdown';
import VoiceInputForm from './voiceinput';

const SupervisorCreatePage = () => {
  const [dropdownData, setDropdownData] = useState({
  projectNames: [],
  statuses: [],
  users: [],
});
  const [projectName, setProjectName] = useState('');
  const [status, setStatus] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [remarks, setRemarks] = useState('');
  const [message, setMessage] = useState('');

   useEffect(() => {
    fetch('/api/dropdowns')
      .then((res) => {
        if (!res.ok) throw new Error('Dropdown fetch failed');
        return res.json();
      })
      .then((data) => {
        setDropdownData({
          projectNames: data.projectNames || [],
          statuses: data.statuses || [],
          users: data.users || [],
        });
      })
      .catch((err) => {
        console.error('Failed to load dropdowns', err);
      });
  }, []);
 

    /*if (
    !dropdownData ||
    !dropdownData.projectNames ||
    !dropdownData.statuses ||
    !dropdownData.users
  ) {
    return <p>Loading dropdown options...</p>;
  }
*/
 
  return (
    <>
    <div>
      <h2>Create New Record</h2>

      <label>Project Name:</label>
      <select value={projectName} onChange={(e) => setProjectName(e.target.value)}>
        <option value="">--Select Project--</option>
        {dropdownData.projectNames.map((name, i) => (
          <option key={i} value={name}>{name}</option>
        ))}
      </select>

      <label>Status:</label>
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="">--Select Status--</option>
        {dropdownData.statuses.map((status, i) => (
          <option key={i} value={status}>{status}</option>
        ))}
      </select>

      <label>Assign To:</label>
      <select value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)}>
        <option value="">--Select User--</option>
        {dropdownData.users.map((user, i) => (
          <option key={i} value={user}>{user}</option>
        ))}
      </select>

      <label>Remarks:</label>
      <input
        type="text"
        value={remarks}
        onChange={(e) => setRemarks(e.target.value)}
        placeholder="Enter remarks"
      />

      
      <p>{message}</p>
    </div>
    <AdminDropdownManager/>
    <VoiceInputForm/>
    </>
  );
};


export default SupervisorCreatePage;

