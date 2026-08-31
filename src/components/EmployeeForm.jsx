function EmployeeForm({ formdata, handleChange, handleSubmit, buttonText }) {
  return (
    <form className="employee-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Name</label>
        <input
          className="form-input"
          name="name"
          placeholder="Enter Name"
          value={formdata.name}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input
          className="form-input"
          name="email"
          placeholder="Enter Email"
          value={formdata.email}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Phone</label>
        <input
          className="form-input"
          name="phone"
          placeholder="Enter Phone"
          value={formdata.phone}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Department</label>
        <input
          className="form-input"
          name="department"
          placeholder="Enter Department"
          value={formdata.department}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Salary</label>
        <input
          className="form-input"
          name="salary"
          placeholder="Enter Salary"
          value={formdata.salary}
          onChange={handleChange}
        />
      </div>

      <button className="form-submit-btn" type="submit">
        {buttonText}
      </button>
    </form>
  );
}

export default EmployeeForm;
