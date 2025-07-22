
/*import React, { useState } from 'react';
import LogoutButton from './logout';

const OperatorProductionForm = () => {
  const [formData, setFormData] = useState({
    shift: '',
    operatorName: '',
    machineId: '',
    startTime: '',
    endTime: '',
    totalMoulds: '',
    acceptedMoulds: '',
    rejectedMoulds: '',
    remarks: '',
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/production/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      alert(data.message);
    } catch (err) {
      alert('Failed to submit production data');
    }
  };

  return (
    <>
    <form onSubmit={handleSubmit} className="form">
      <h2>DISA Production Entry</h2>

      <input type="text" name="shift" placeholder="Shift" onChange={handleChange} required />
      <input type="text" name="operatorName" placeholder="Operator Name" onChange={handleChange} required />
      <input type="text" name="machineId" placeholder="Machine ID" onChange={handleChange} required />
      <input type="time" name="startTime" placeholder="Start Time" onChange={handleChange} required />
      <input type="time" name="endTime" placeholder="End Time" onChange={handleChange} required />
      <input type="number" name="totalMoulds" placeholder="Total Moulds" onChange={handleChange} required />
      <input type="number" name="acceptedMoulds" placeholder="Accepted Moulds" onChange={handleChange} required />
      <input type="number" name="rejectedMoulds" placeholder="Rejected Moulds" onChange={handleChange} required />
      <textarea name="remarks" placeholder="Remarks" onChange={handleChange}></textarea>

      <button type="submit">Submit</button>
    </form>
    <LogoutButton/>
    </>
  );
};

export default OperatorProductionForm;
*/

/*import React, { useState, useEffect } from 'react';
import LogoutButton from './logout';

const OperatorProductionForm = () => {
  const [formData, setFormData] = useState({
    shift: '',
    operatorName: '',
    machineId: '',
    startTime: '',
    endTime: '',
    totalMoulds: '',
    acceptedMoulds: '',
    rejectedMoulds: '',
    remarks: '',
  });

  const [dropdowns, setDropdowns] = useState({
    statuses: [],
    users: [],
    projectNames: [],
  });

  // Fetch dropdown options from backend
  const fetchDropdownOptions = async () => {
    try {
      const res = await fetch('/api/dropdowns');
      const data = await res.json();
      setDropdowns(data);
    } catch (err) {
      console.error('Failed to fetch dropdown options', err);
    }
  };

  useEffect(() => {
    fetchDropdownOptions();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/production/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      alert(data.message);
    } catch (err) {
      alert('Failed to submit production data');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        <h2>DISA Production Entry</h2>

       
        <select name="shift" value={formData.shift} onChange={handleChange} required>
          <option value="">Select Shift</option>
          {dropdowns.statuses.map((shift, index) => (
            <option key={index} value={shift}>
              {shift}
            </option>
          ))}
        </select>

        
        <select name="operatorName" value={formData.operatorName} onChange={handleChange} required>
          <option value="">Select Operator</option>
          {dropdowns.users.map((user, index) => (
            <option key={index} value={user}>
              {user}
            </option>
          ))}
        </select>

        
        <select name="machineId" value={formData.machineId} onChange={handleChange} required>
          <option value="">Select Machine ID</option>
          {dropdowns.projectNames.map((machine, index) => (
            <option key={index} value={machine}>
              {machine}
            </option>
          ))}
        </select>

        <input type="time" name="startTime" placeholder="Start Time" onChange={handleChange} required />
        <input type="time" name="endTime" placeholder="End Time" onChange={handleChange} required />
        <input type="number" name="totalMoulds" placeholder="Total Moulds" onChange={handleChange} required />
        <input type="number" name="acceptedMoulds" placeholder="Accepted Moulds" onChange={handleChange} required />
        <input type="number" name="rejectedMoulds" placeholder="Rejected Moulds" onChange={handleChange} required />
        <textarea name="remarks" placeholder="Remarks" onChange={handleChange}></textarea>

        <button type="submit">Submit</button>
      </form>
      <LogoutButton />
    </>
  );
};

export default OperatorProductionForm;
*/

import React, { useState, useEffect } from 'react';
import LogoutButton from './logout';

const OperatorProductionForm = () => {
  const [formData, setFormData] = useState({
    shift: '',
    operatorName: '',
    machineId: '',
    startTime: '',
    endTime: '',
    totalMoulds: '',
    acceptedMoulds: '',
    rejectedMoulds: '',
    remarks: '',
  });

  const [dropdowns, setDropdowns] = useState({
    statuses: [],
    users: [],
    projectNames: [],
  });

  // Fetch dropdowns
  const fetchDropdownOptions = async () => {
    try {
      const res = await fetch('/api/dropdowns');
      const data = await res.json();
      setDropdowns(data);
    } catch (err) {
      console.error('Failed to fetch dropdown options', err);
    }
  };

  useEffect(() => {
    fetchDropdownOptions();
    // Try to sync offline data when online
    if (navigator.onLine) {
      syncOfflineData();
    }
    window.addEventListener('online', syncOfflineData);
    return () => window.removeEventListener('online', syncOfflineData);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!navigator.onLine) {
      // Save offline
      let offlineData = JSON.parse(localStorage.getItem('offline_production_data')) || [];
      offlineData.push(formData);
      localStorage.setItem('offline_production_data', JSON.stringify(offlineData));
      alert('No internet connection. Data saved locally and will be synced later.');
      setFormData({
        shift: '',
        operatorName: '',
        machineId: '',
        startTime: '',
        endTime: '',
        totalMoulds: '',
        acceptedMoulds: '',
        rejectedMoulds: '',
        remarks: '',
      });
      return;
    }

    // Online - directly send to backend
    try {
      const res = await fetch('/api/production/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      alert(data.message);
      setFormData({
        shift: '',
        operatorName: '',
        machineId: '',
        startTime: '',
        endTime: '',
        totalMoulds: '',
        acceptedMoulds: '',
        rejectedMoulds: '',
        remarks: '',
      });
    } catch (err) {
      alert('Failed to submit production data');
    }
  };

  // Sync function to be called when internet is back
  const syncOfflineData = async () => {
    const offlineData = JSON.parse(localStorage.getItem('offline_production_data')) || [];
    if (offlineData.length === 0) return;

    for (let entry of offlineData) {
      try {
        await fetch('/api/production/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(entry),
        });
      } catch (err) {
        console.error('Sync failed for one entry:', err);
        return; // Stop syncing further to avoid re-attempt flood
      }
    }
    // Clear local offline storage if all succeeded
    localStorage.removeItem('offline_production_data');
    alert('Offline data synced successfully!');
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        <h2>DISA Production Entry</h2>

        {/* Shift Dropdown */}
        <select name="shift" value={formData.shift} onChange={handleChange} required>
          <option value="">Select Shift</option>
          {dropdowns.statuses.map((shift, index) => (
            <option key={index} value={shift}>
              {shift}
            </option>
          ))}
        </select>

        {/* Operator Name */}
        <select name="operatorName" value={formData.operatorName} onChange={handleChange} required>
          <option value="">Select Operator</option>
          {dropdowns.users.map((user, index) => (
            <option key={index} value={user}>
              {user}
            </option>
          ))}
        </select>

        {/* Machine ID */}
        <select name="machineId" value={formData.machineId} onChange={handleChange} required>
          <option value="">Select Machine ID</option>
          {dropdowns.projectNames.map((machine, index) => (
            <option key={index} value={machine}>
              {machine}
            </option>
          ))}
        </select>

        <input type="time" name="startTime" value={formData.startTime} onChange={handleChange} required />
        <input type="time" name="endTime" value={formData.endTime} onChange={handleChange} required />
        <input type="number" name="totalMoulds" value={formData.totalMoulds} placeholder="Total Moulds" onChange={handleChange} required />
        <input type="number" name="acceptedMoulds" value={formData.acceptedMoulds} placeholder="Accepted Moulds" onChange={handleChange} required />
        <input type="number" name="rejectedMoulds" value={formData.rejectedMoulds} placeholder="Rejected Moulds" onChange={handleChange} required />
        <textarea name="remarks" value={formData.remarks} placeholder="Remarks" onChange={handleChange}></textarea>

        <button type="submit">Submit</button>
      </form>
      <LogoutButton />
    </>
  );
};

export default OperatorProductionForm;
