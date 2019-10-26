import React, { Fragment, useState } from 'react';
import { FaSave, FaTrashAlt } from 'react-icons/fa';

const EditableItem = props => {
  const [value, setValue] = useState(props.value);

  const onChangeValue = e => {
    const editedValue = e.target.value;
    setValue(editedValue);
  };

  const handleSave = () => {
    props.onSave({ [props.keyName]: value });
  };

  return (
    <div className="editable-item">
      <span className="title">{props.title}</span>
      <input className="form-control" value={value} onChange={onChangeValue} />
      {value.trim() !== props.value ? (
        <Fragment>
          <button
            className="btn btn-outline-danger"
            onClick={() => setValue(props.value)}
          >
            <FaTrashAlt />
          </button>
          <button className="btn btn-outline-primary" onClick={handleSave}>
            <FaSave />
          </button>
        </Fragment>
      ) : null}
    </div>
  );
};

export default EditableItem;
