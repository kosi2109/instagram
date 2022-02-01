import React from 'react';
import { Link } from 'react-router-dom';
import FormContainer from '../FormContainer';

function EmailSendMes({}) {
  return <FormContainer>
      <h5 className='font-medium my-3 font-medium'>Email Sent</h5>
      <div>
          <p className='text-center text-textSecondary text-sm'>We sent an email to email with a link to get back into your account.</p>
      </div>
      <Link to='/accounts/password/reset' className='text-btnPrimary mt-3'>
        OK
      </Link>
  </FormContainer>;
}

export default EmailSendMes;
