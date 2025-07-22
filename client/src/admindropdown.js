/*import React, { useState ,useEffect} from 'react';

const AdminDropdownManager = () => {
  const [field, setField] = useState('projectNames');
  const [value, setValue] = useState('');
  const [message, setMessage] = useState('');
  const [dropdownData, setDropdownData] = useState({});

  const fetchDropdowns = async () => {
  try {
    const res = await fetch('/api/dropdowns');
    const data = await res.json();
    setDropdownData(data);
  } catch (err) {
    console.error('Failed to fetch dropdowns', err);
  }
};
useEffect(() => {
    fetchDropdowns();
  }, []);

  const handleAdd = async () => {
    try {
      const res = await fetch('/api/dropdowns/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ field, value }),
      });

      const data = await res.json();
      setMessage(data.message);
      setValue('');
      await fetchDropdowns();
    } catch (err) {
      setMessage('Failed to add option');
    }
  };
 // DELETE option
const handleDelete = async (field, value) => {
  try {
    const res = await fetch('/api/dropdowns/delete', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ field, value }),
    });

    const data = await res.json();
    setMessage(data.message);
    await fetchDropdowns();
  } catch (err) {
    setMessage('Failed to delete option');
  }
};

// UPDATE option
const handleUpdate = async (field, oldValue, newValue) => {
  try {
    const res = await fetch('/api/dropdowns/update', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ field, oldValue, newValue }),
    });

    const data = await res.json();
    setMessage(data.message);
    await fetchDropdowns();
  } catch (err) {
    setMessage('Failed to update option');
  }
};



  return (
    <div>
      <h3>Add Dropdown Option</h3>
      <label>Field:</label>
      <select value={field} onChange={(e) => setField(e.target.value)}>
        <option value="projectNames">Project Name</option>
        <option value="statuses">Status</option>
        <option value="users">User</option>
      </select>

      <br />

      <label>Value:</label>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="New option"
      />

      <button onClick={handleAdd}>Add Option</button>
      <p>{message}</p>
    </div>
  );
};

export default AdminDropdownManager;
*/

/*import React, { useState, useEffect } from 'react';

const AdminDropdownManager = () => {
  const [field, setField] = useState('projectNames');
  const [value, setValue] = useState('');
  const [dropdownData, setDropdownData] = useState({});
  const [message, setMessage] = useState('');
  const [editValue, setEditValue] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  // Fetch dropdowns from server
  const fetchDropdowns = async () => {
    try {
      const res = await fetch('/api/dropdowns');
      const data = await res.json();
      setDropdownData(data);
    } catch (err) {
      console.error('Failed to fetch dropdowns', err);
    }
  };

  useEffect(() => {
    fetchDropdowns();
  }, []);

  // Add new option
  const handleAdd = async () => {
    if (!value.trim()) return;
    try {
      const res = await fetch('/api/dropdowns/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ field, value }),
      });

      const data = await res.json();
      setMessage(data.message);
      setValue('');
      await fetchDropdowns();
    } catch (err) {
      setMessage('Failed to add option');
    }
  };

  // Delete option
  const handleDelete = async (valueToDelete) => {
    try {
      const res = await fetch('/api/dropdowns/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ field, value: valueToDelete }),
      });

      const data = await res.json();
      setMessage(data.message);
      await fetchDropdowns();
    } catch (err) {
      setMessage('Failed to delete option');
    }
  };

  // Start editing
  const handleEditStart = (index, currentValue) => {
    setEditingIndex(index);
    setEditValue(currentValue);
  };

  // Update option
  const handleUpdate = async (oldValue) => {
    try {
      const res = await fetch('/api/dropdowns/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ field, oldValue, newValue: editValue }),
      });

      const data = await res.json();
      setMessage(data.message);
      setEditingIndex(null);
      setEditValue('');
      await fetchDropdowns();
    } catch (err) {
      setMessage('Failed to update option');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2>Dropdown Manager</h2>

      <label><strong>Select Field:</strong></label><br />
      <select value={field} onChange={(e) => setField(e.target.value)}>
        <option value="projectNames">Project Names</option>
        <option value="statuses">Statuses</option>
        <option value="users">Users</option>
      </select>

      <br /><br />

      <label><strong>Add New Option:</strong></label><br />
      <input
        type="text"
        value={value}
        placeholder="New option"
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={handleAdd}>Add</button>

      <p style={{ color: 'green' }}>{message}</p>

      <h3>Options for: {field}</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {dropdownData[field]?.map((option, index) => (
          <li key={index} style={{ marginBottom: '10px' }}>
            {editingIndex === index ? (
              <>
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />
                <button onClick={() => handleUpdate(option)}>Save</button>
                <button onClick={() => setEditingIndex(null)}>Cancel</button>
              </>
            ) : (
              <>
                <span>{option}</span>
                <button onClick={() => handleEditStart(index, option)} style={{ marginLeft: '10px' }}>Edit</button>
                <button onClick={() => handleDelete(option)} style={{ marginLeft: '5px', color: 'red' }}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDropdownManager;
*/

/*import React, { useState, useEffect } from 'react';

const AdminDropdownManager = () => {
  const [field, setField] = useState('projectNames');
  const [action, setAction] = useState('add');
  const [value, setValue] = useState('');
  const [oldValue, setOldValue] = useState('');
  const [newValue, setNewValue] = useState('');
  const [message, setMessage] = useState('');
  const [dropdownData, setDropdownData] = useState({});

  const fetchDropdowns = async () => {
    try {
      const res = await fetch('/api/dropdowns');
      const data = await res.json();
      setDropdownData(data);
    } catch (err) {
      console.error('Failed to fetch dropdowns', err);
    }
  };

  useEffect(() => {
    fetchDropdowns();
  }, []);

  const handleSubmit = async () => {
    try {
      let res;
      let data;

      if (action === 'add') {
        res = await fetch('/api/dropdowns/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ field, value }),
        });
      } else if (action === 'delete') {
        res = await fetch('/api/dropdowns/delete', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ field, value }),
        });
      } else if (action === 'update') {
        res = await fetch('/api/dropdowns/update', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ field, oldValue, newValue }),
        });
      }

      data = await res.json();
      setMessage(data.message);
      setValue('');
      setOldValue('');
      setNewValue('');
      fetchDropdowns();
    } catch (err) {
      setMessage('Action failed');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>Manage Dropdown Options</h2>

      <div>
        <label>Action:</label>
        <select value={action} onChange={(e) => setAction(e.target.value)}>
          <option value="add">Add</option>
          <option value="delete">Delete</option>
          <option value="update">Update</option>
        </select>
      </div>

      <div>
        <label>Field:</label>
        <select value={field} onChange={(e) => setField(e.target.value)}>
          <option value="projectNames">Project Name</option>
          <option value="statuses">Status</option>
          <option value="users">User</option>
        </select>
      </div>

      {action === 'add' && (
        <div>
          <label>New Value to Add:</label>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="New option"
          />
        </div>
      )}

      {action === 'delete' && (
        <div>
          <label>Value to Delete:</label>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Value to delete"
          />
        </div>
      )}

      {action === 'update' && (
        <div>
          <label>Old Value:</label>
          <input
            type="text"
            value={oldValue}
            onChange={(e) => setOldValue(e.target.value)}
            placeholder="Old value"
          />

          <label>New Value:</label>
          <input
            type="text"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            placeholder="New value"
          />
        </div>
      )}

      <button onClick={handleSubmit}>Submit</button>
      <p>{message}</p>
    </div>
  );
};

export default AdminDropdownManager;
*/

import React, { useState, useEffect } from 'react';
import LogoutButton from './logout';
import AdminAddUserPage from './adminadduser';
import ReportPage from './ReportPage1';

const AdminDropdownManager = () => {
  const [field, setField] = useState('projectNames');
  const [action, setAction] = useState('add');
  const [value, setValue] = useState('');
  const [oldValue, setOldValue] = useState('');
  const [newValue, setNewValue] = useState('');
  const [message, setMessage] = useState('');
  const [dropdownData, setDropdownData] = useState({});

  const fetchDropdowns = async () => {
    try {
      const res = await fetch('/api/dropdowns');
      const data = await res.json();
      setDropdownData(data);
    } catch (err) {
      console.error('Failed to fetch dropdowns', err);
    }
  };

  useEffect(() => {
    fetchDropdowns();
  }, []);

  const handleSubmit = async () => {
    try {
      let res;
      let data;

      if (action === 'add') {
        if (!value.trim()) return setMessage('Value is required');
        res = await fetch('/api/dropdowns/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ field, value }),
        });
      } else if (action === 'delete') {
        if (!value.trim()) return setMessage('Value is required');
        res = await fetch('/api/dropdowns/delete', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ field, value }),
        });
      } else if (action === 'update') {
        if (!oldValue.trim() || !newValue.trim())
          return setMessage('Both old and new values are required');
        res = await fetch('/api/dropdowns/update', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ field, oldValue, newValue }),
        });
      } else if (action === 'deleteAll') {
        const confirmDelete = window.confirm(`Are you sure you want to delete all options from ${field}?`);
        if (!confirmDelete) return;

        res = await fetch('/api/dropdowns/deleteAll', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ field }),
        });
      }

      data = await res.json();
      setMessage(data.message);
      setValue('');
      setOldValue('');
      setNewValue('');
      fetchDropdowns();
    } catch (err) {
      setMessage('Action failed');
    }
  };

  return (
    <>
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>Manage Dropdown Options</h2>

      <div>
        <label>Action:</label>
        <select value={action} onChange={(e) => setAction(e.target.value)}>
          <option value="add">Add</option>
          <option value="delete">Delete</option>
          <option value="update">Update</option>
          <option value="deleteAll">Delete All</option>
        </select>
      </div>

      <div>
        <label>Dropdown Field:</label>
        <select value={field} onChange={(e) => setField(e.target.value)}>
          <option value="projectNames">Project Name</option>
          <option value="statuses">Status</option>
          <option value="users">User</option>
        </select>
      </div>

      {/* Input Fields Based on Action */}
      {action === 'add' && (
        <div>
          <label>Value to Add:</label>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter value"
          />
        </div>
      )}

      {action === 'delete' && (
        <div>
          <label>Value to Delete:</label>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Value to delete"
          />
        </div>
      )}

      {action === 'update' && (
        <>
          <label>Old Value:</label>
          <input
            type="text"
            value={oldValue}
            onChange={(e) => setOldValue(e.target.value)}
            placeholder="Old value"
          />

          <label>New Value:</label>
          <input
            type="text"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            placeholder="New value"
          />
        </>
      )}

      {action === 'deleteAll' && (
        <p style={{ color: 'red' }}>
          ⚠️ This will delete all values under "{field}". This action is irreversible.
        </p>
      )}

      <br />
      <button onClick={handleSubmit}>Submit</button>
      <p style={{ color: 'green' }}>{message}</p>

      {/* Display Current Dropdown Values */}
      <div>
        <h3>Current Options:</h3>
        {dropdownData[field] ? (
          <ul>
            {dropdownData[field].map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        ) : (
          <p>No options available.</p>
        )}
      </div>
      <AdminAddUserPage/>
      <ReportPage/>
      <LogoutButton />
    </div>
    </>
  );
};

export default AdminDropdownManager;

