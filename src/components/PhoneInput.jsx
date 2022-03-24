import { useState } from 'react'
import { auth } from '../firebase.config'
import { signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth'
import { toast } from 'react-toastify'

function PhoneInput({ setConfirmRes }) {
  const [formData, setFormData] = useState({
    inputPhoneNumber: '',
  })

  const { inputPhoneNumber } = formData

  const onChange = (e) => {
    setFormData({
      ...formData,
      inputPhoneNumber: e.target.value,
    })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const phoneNumber = '+1' + inputPhoneNumber
    if (phoneNumber === '+1' || phoneNumber.length < 12) {
      toast.error('Invalid phone number')
      return
    }
    // Initialize reCAPTCHA verifier
    const appVerifier = new RecaptchaVerifier(
      'recaptcha-container',
      {
        'size': 'invisible',
        'callback': (res) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
        'expired-callback': () => {
          console.log('Failed')
        },
      },
      auth
    )
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((res) => {
        setConfirmRes(res)
        toast.success('Code Sent!')
      })
      .catch((err) => {
        toast.error('Something went wrong')
        console.log(err)
      })

    setFormData({
      inputPhoneNumber: '',
    })
  }
  return (
    <>
      <form onSubmit={onSubmit} className='h-1/3'>
        <div className='form-control mb-3'>
          <label htmlFor='phoneNumber' className='text-lg mx-auto my-2'>
            Please input your phone number
          </label>
          <input
            type='number'
            value={inputPhoneNumber}
            onChange={onChange}
            className='w-full input input-bordered input-primary text-lg mx-auto'
          />
        </div>
        <div className='w-full text-center'>
          <input
            type='submit'
            value='Send'
            id='submit-form-button'
            className='btn btn-primary text-base-100 w-full md:w-1/2'
          />
        </div>
        <div id='recaptcha-container'></div>
      </form>
    </>
  )
}

export default PhoneInput
