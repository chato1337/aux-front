import React from 'react'
import { useOrganization } from '../../hooks/useOrganization';

const AddOrganizationForm = () => {
  const { register, handleSubmit, onSubmit } = useOrganization()

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input id='name' type="text" { ...register("name", { required: true }) } />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input id='email' type="text" { ...register("email", { required: true }) } />
        </div>
        <div className="form-group">
          <label htmlFor="identifier">Identifier</label>
          <input id='identifier' type="text" { ...register("identifier", { required: true }) } />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input id='phone' type="text" { ...register("phone", { required: true }) } />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input id='address' type="text" { ...register("address", { required: true }) } />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default AddOrganizationForm