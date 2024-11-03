import React, { useState } from 'react';
import './App.css';

export default function App() {
  const [infoList, setInfoList] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null); // Store the index of the entry being edited
  const [formData, setFormData] = useState({}); // Temporary state for the form data

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const newFormData = new FormData(form);
    const formJson = Object.fromEntries(newFormData.entries());

    if (editingIndex !== null) {
      // Update existing entry
      const updatedInfoList = [...infoList];
      updatedInfoList[editingIndex] = formJson;
      setInfoList(updatedInfoList);
      setEditingIndex(null); // Reset editing index after save
    } else {
      // Add new entry
      setInfoList([...infoList, formJson]);
      setLoaded(true);
    }

    setFormData({});
    form.reset();
  }

  function handleEdit(index) {
    setEditingIndex(index);
    setFormData(infoList[index]); // Load selected entry data into form
  }

  function handleDelete(index) {
    setInfoList(infoList.filter((_, i) => i !== index)); // Remove entry at the given index
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Personal CV</h1>
        <h2>{editingIndex === null ? "Enter your personal information" : "Edit your information"}</h2>
        
        <form method="post" onSubmit={handleSubmit}>
          <div>
            <h3>Personal Information</h3>
            <label>Name: <input name="name" value={formData.name || ""} onChange={handleInputChange} /></label><br />
            <label>Email: <input name="email" value={formData.email || ""} onChange={handleInputChange} /></label><br />
            <label>Phone Number: <input name="pnum" value={formData.pnum || ""} onChange={handleInputChange} /></label><br />
          </div>
          <div>
            <h3>Educational Experience</h3>
            <label>School: <input name="school" value={formData.school || ""} onChange={handleInputChange} /></label><br />
            <label>Major: <input name="major" value={formData.major || ""} onChange={handleInputChange} /></label><br />
            <label>School start: <input type="date" name="start" value={formData.start || ""} onChange={handleInputChange} /></label><br />
            <label>School end: <input type="date" name="end" value={formData.end || ""} onChange={handleInputChange} /></label><br />
          </div>
          <div>
            <h3>Practical Experience</h3>
            <label>Company name: <input name="comp" value={formData.comp || ""} onChange={handleInputChange} /></label><br />
            <label>Position title: <input name="pos" value={formData.pos || ""} onChange={handleInputChange} /></label><br />
            <label>Job description: <input name="job" value={formData.job || ""} onChange={handleInputChange} /></label><br />
            <label>Start date: <input type="date" name="jobstart" value={formData.jobstart || ""} onChange={handleInputChange} /></label><br />
            <label>End date: <input type="date" name="jobend" value={formData.jobend || ""} onChange={handleInputChange} /></label><br />
          </div>
          <button type="submit">{editingIndex === null ? "Submit form" : "Save Changes"}</button>
        </form>
        
        {loaded && (
          <div className="submitted-info-list">
            <h2>Submitted Users</h2>
            {infoList.map((info, index) => (
              <div key={index} className="submitted-info">
                <h3>User {index + 1}</h3>
                <h4>Personal Information</h4>
                <p>Name: {info.name}</p>
                <p>Email: {info.email}</p>
                <p>Phone Number: {info.pnum}</p>

                <h4>Educational Experience</h4>
                <p>School: {info.school}</p>
                <p>Major: {info.major}</p>
                <p>School start: {info.start}</p>
                <p>School end: {info.end}</p>

                <h4>Practical Experience</h4>
                <p>Company name: {info.comp}</p>
                <p>Position title: {info.pos}</p>
                <p>Job description: {info.job}</p>
                <p>Start date: {info.jobstart}</p>
                <p>End date: {info.jobend}</p>

                <button onClick={() => handleEdit(index)}>Edit</button>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </div>
            ))}
          </div>
        )}
      </header>
    </div>
  );
}
