import React from 'react'
import { useState } from 'react';
import './App.css'

const TextField = ({ label }) => (
  <div className="form-field">
    <label>{label}:</label>
    <input type="text" />
  </div>
);

// Component for Text Area
const TextArea = ({ label }) => (
  <div className="form-field">
    <label>{label}:</label>
    <textarea rows="4" cols="50" />
  </div>
);

// Component for Checkbox
const Checkbox = ({ label }) => (
  <div className="form-field">
    <label>
      <input type="checkbox" />
      {label}
    </label>
  </div>
);
const App = () => {
  const [formFields, setFormFields] = useState([]);
  const [previewMode, setPreviewMode] = useState(false);
  const [fieldName, setFieldName] = useState('');
  const [fieldType, setFieldType] = useState('text');
  const [formHeading, setFormHeading] = useState('');

  const handleAddField = () => {
    switch (fieldType) {
      case 'text':
        setFormFields([...formFields, <TextField key={formFields.length} label={fieldName} />]);
        break;
      case 'textarea':
        setFormFields([...formFields, <TextArea key={formFields.length} label={fieldName} />]);
        break;
      case 'checkbox':
        setFormFields([...formFields, <Checkbox key={formFields.length} label={fieldName} />]);
        break;
      default:
        break;
    }
    setFieldName('');
  };

  const handleAddHeading = () => {
    if (formHeading.trim() !== '') {
      setFormFields([...formFields, <h3 key={formFields.length}>{formHeading}</h3>]);
      setFormHeading('');
    }
  };

  return (
    <div className="App">
      <div className="form-container">
        <div className="form-editor">
          <h2>Form Editor</h2>
          <div className="form-heading">
            <input
              type="text"
              placeholder="Enter Form Heading"
              value={formHeading}
              onChange={(e) => setFormHeading(e.target.value)}
            />
            <button onClick={handleAddHeading}>Add Heading</button>
          </div>
          <div className="form-controls">
            <input
              type="text"
              placeholder="Enter Field Name"
              value={fieldName}
              onChange={(e) => setFieldName(e.target.value)}
            />
            <select value={fieldType} onChange={(e) => setFieldType(e.target.value)}>
              <option value="text">Text Field</option>
              <option value="textarea">Text Area</option>
              <option value="checkbox">Checkbox</option>
            </select>
            <button onClick={handleAddField}>Add Field</button>
          </div>
          <div className="form-fields">{formFields}</div>
          <button className="preview-btn" onClick={() => setPreviewMode(!previewMode)}>
            {previewMode ? 'Back to Edit Mode' : 'Preview Form'}
          </button>
        </div>
        <div className="form-preview">
          <h2>Form Preview</h2>
          {previewMode ? (
            <form>
              {formFields.map((field, index) => (
                <div key={index}>{field}</div>
              ))}
              <button type="submit">Submit</button>
            </form>
          ) : (
            <p>Switch to Preview mode to see your form</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;


