import { useState } from 'react'
import { toast } from 'react-toastify'

function OtpInput({ confirmRes }) {
  const [formData, setFormData] = useState({
    otpInput1: '',
    otpInput2: '',
    otpInput3: '',
    otpInput4: '',
    otpInput5: '',
    otpInput6: '',
  })
  const { otpInput1, otpInput2, otpInput3, otpInput4, otpInput5, otpInput6 } =
    formData

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
    // Check if target is empty
    if (e.target.value !== '') {
      // Check if last target has not been reached
      if (e.target.id !== 'otpInput6') {
        // Strip out characters and leave numbers, then add one
        const nextId = parseInt(e.target.id.replace(/\D/g, '')) + 1
        const nextSibling = document.querySelector(`#otpInput${nextId}`)

        if (nextSibling !== null) {
          nextSibling.focus()
        }
      }
    }
  }
  const onSubmit = (e) => {
    e.preventDefault()

    // Concat verifaction code
    let code = ''
    for (const prop in formData) {
      code = code + formData[prop]
    }
    if (code.length < 6 || code === '') {
      toast.error('Please input valid verification code')
      return
    }
    confirmRes
      .confirm(code)
      .then((res) => {
        toast.success('Verification Successful!')
      })
      .catch((err) => {
        toast.error('Something went wrong')
        console.log(err)
      })

    setFormData({
      otpInput1: '',
      otpInput2: '',
      otpInput3: '',
      otpInput4: '',
      otpInput5: '',
      otpInput6: '',
    })
  }

  return (
    <>
      <form onSubmit={onSubmit} className='h-2/5'>
        <div className='form-control justify-center content-center mb-3'>
          <label htmlFor='phoneNumber' className='text-lg mx-auto my-2'>
            Input Verification Code
          </label>
          <div className='flex max-w-md self-center'>
            <input
              type='number'
              id='otpInput1'
              value={otpInput1}
              onChange={onChange}
              className='w-1/6 p-0 input input-bordered input-primary rounded text-lg text-center mx-1'
            />
            <input
              type='number'
              id='otpInput2'
              value={otpInput2}
              onChange={onChange}
              className='w-1/6 p-0 input input-bordered input-primary rounded text-lg text-center mx-1'
            />
            <input
              type='number'
              id='otpInput3'
              value={otpInput3}
              onChange={onChange}
              className='w-1/6 p-0 input input-bordered input-primary rounded text-lg text-center mx-1'
            />
            <input
              type='number'
              id='otpInput4'
              value={otpInput4}
              onChange={onChange}
              className='w-1/6 p-0 input input-bordered input-primary rounded text-lg text-center mx-1'
            />
            <input
              type='number'
              id='otpInput5'
              value={otpInput5}
              onChange={onChange}
              className='w-1/6 p-0 input input-bordered input-primary rounded text-lg text-center mx-1'
            />
            <input
              type='number'
              id='otpInput6'
              value={otpInput6}
              onChange={onChange}
              className='w-1/6 p-0 input input-bordered input-primary rounded text-lg text-center mx-1'
            />
          </div>
        </div>
        <div className='w-full text-center'>
          <input
            type='submit'
            value='Submit'
            id='submit-form-button'
            className='btn btn-primary text-base-100 w-full md:w-1/2'
          />
        </div>
        <div id='recaptcha-container'></div>
      </form>
    </>
  )
}

export default OtpInput
