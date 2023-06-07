import { Link } from 'react-router-dom'

import Input from '../../components/Input'
import Button from '../../components/Button'

const Login: React.FC = () => {
  return(
    <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-r from-fuchsia-500 to-cyan-500">
      <div className="w-3/4 md:w-1/4 h-fit bg-neutral-50 border-none rounded-xl p-10">
        <h1 className="text-slate-950 text-5xl font-bold">Welcome</h1>
        <p className="text-gray-600 text-lg">Please enter your details</p>
        <div className='flex flex-col mt-5'>
          <div>
            <Input
              id='login-email'
              type='text'
              placeholder='Email'
              label='Enter your email'
              onChange={event => console.log(event.target.value)}
            />
          </div>
          <div className='mt-5'>
            <Input
              id='login-password'
              type='password'
              placeholder='Password'
              label='Enter your password'
              onChange={event => console.log(event.target.value)}
            />
          </div>
          <div className='mt-5'>
            <Button
              id='login-submit'
              title={<p className='text-lg'>Sign in</p>}
            />
          </div>
          <div className='flex justify-center mt-5'>
            <Link to='/signup'>Create Account</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login