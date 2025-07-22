
// server.js or routes/records.js

app.post('/api/records', (req, res) => {
  const { projectName, status, assignedTo, remarks } = req.body;

  // You can insert into MongoDB here or just log for now
  console.log('Received record:', { projectName, status, assignedTo, remarks });

  res.json({ message: 'Record created successfully' });
});
