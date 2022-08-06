import './NewOrganization.styles.scss'
import AddOrganizationForm from '../../components/AddOrganizationForm/AddOrganizationForm'
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const NewOrganization = () => {
  const user = useSelector((state: RootState) => state.account.user)
  const navigate = useNavigate()

  useEffect(() => {
    //if user has stored organization
    if(user && user.status !== 'to-activate') {
      navigate('/dashboard', { replace: true })
    }
  }, [user, navigate])

  return (
    <div className='new-org-container'>
      <h2>Hello { user?.name }</h2>
      <span>Please create a new organization</span>
      <div className="new-org-form">
        <AddOrganizationForm />
      </div>
    </div>
  )
}

export default NewOrganization