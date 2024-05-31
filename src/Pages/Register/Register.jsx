import axios from "axios";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { TbFidgetSpinner } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {


    const { createUser, signInWithGoogle, updateUserProfile, loading, setLoading } = useAuth()
    const [password,setPassword] = useState('')
    const [show,setShow]= useState(false)
    const navigate = useNavigate()
  
  
  
    const handleSubmit = async (e) => {
      e.preventDefault()
      const form = e.target
      const name = form.name.value
      const email = form.email.value
      const password = form.password.value
      const image = form.image.files[0]
      const hasUpperCase = /[A-Z]/;
      const hasLowerCase = /[a-z]/;
      const hasDigit = /\d/;
      const hasValidLength = /.{6,}/;
    
      // Validate password
      if (!hasUpperCase.test(password)) {
        setPassword("Password must contain at least one uppercase letter.");
        return;
      }
    
      if (!hasLowerCase.test(password)) {
        setPassword("Password must contain at least one lowercase letter.");
        return;
      }
    
      if (!hasDigit.test(password)) {
        setPassword("Password must contain at least one digit.");
        return;
      }
    
      if (!hasValidLength.test(password)) {
        setPassword("Password must be at least 6 characters long.");
        return;
      }
  
      const formData = new FormData()
      formData.append('image', image)
  
      try {
        setLoading(true)
        // upload image and get image url
        const { data } = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`, formData)

        // user registration
        const result = await createUser(email, password)
        console.log(result)
  
  
        // save user name and photo in firebase
        await updateUserProfile(name, data.data.display_url)
  
  
        navigate('/')
        toast.success('SignUp Successful')
  
      } catch (err) {
        toast.error(err.message)
  
      }
    }
  
  
    //  handle google Sign in
    const handleGoogleSignIn = async () => {
      try {
        await signInWithGoogle()
  
        navigate('/')
        toast.success('SignUp Successful')
  
      } catch (err) {
        toast.error(err.message)
  
      }
    }
  
  







    return (
        
        <div style={{
            backgroundImage: 'url(https://i.ibb.co/9W0B7Xb/pngtree-blue-sea-and-water-wave-concept-vector-background-image-770486.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundSize:'cover',
            backgroundPosition: 'center'
        }} className='flex justify-center items-center min-h-screen'>
      <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10  text-gray-900 bg-blue-100'>
        <div className='mb-8 text-center'>
          <h1 className='my-3 text-4xl font-bold'>Register Now</h1>
        </div>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='space-y-4'>
            <div>
              <label htmlFor='email' className='block mb-2 text-sm'>
                Name
              </label>
              <input
                type='text'
                name='name'
                id='name'
                placeholder='Enter Your Name Here'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-100 text-gray-900'
                data-temp-mail-org='0'
              />
            </div>
            <div>
              <label htmlFor='image' className='block  mb-2 text-sm'>
                Select Image:
              </label>
              <input
                required
                type='file'
                id='image'
                name='image'
                accept='image/*'
                className="file-input bg-[#a0b7d6] w-full max-w-xs"

              />
            </div>
            <div>
              <label htmlFor='email' className='block mb-2 text-sm'>
                Email address
              </label>
              <input
                type='email'
                name='email'
                id='email'
                required
                placeholder='Enter Your Email Here'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-100 text-gray-900'
                data-temp-mail-org='0'
              />
            </div>
            <div className="relative">
              <div className='flex justify-between'>
                <label htmlFor='password' className='text-sm mb-2'>
                  Password
                </label>
              </div>
              <input
               type={show?'text':"password"}
                name='password'
                autoComplete='new-password'
                id='password'
                required
                placeholder='*******'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-100 text-gray-900'
              />
              <p className="text-red-500">{password}</p>
              <span className="absolute right-2 top-10 cursor-pointer" onClick={()=>setShow(!show)}>{show?<FaEye></FaEye>:<FaEyeSlash/>}</span>
            </div>
          </div>

          <div>
            <button
              disabled={loading}
              type='submit'
              className='bg-[#40679E] w-full rounded-md py-3 text-white'
            >
              {loading ? <TbFidgetSpinner className='animate-spin m-auto' /> : 'continue'}
            </button>
          </div>
        </form>
        <div className='flex items-center pt-4 space-x-1'>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
          <p className='px-3 text-sm dark:text-gray-400'>
            Register with social accounts
          </p>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
        </div>
        <button
          disabled={loading}
          onClick={handleGoogleSignIn} className='disabled:cursor-not-allowed flex justify-center items-center space-x-2 border m-3 p-2 rounded-full hover:bg-[#c1d1e9] border-gray-300 border-rounded cursor-pointer'>
          <FcGoogle size={32} />

          <p>Continue with Google</p>
        </button>
        <p className='px-6 text-sm text-center text-gray-400'>
          Already have an account?{' '}
          <Link
            to='/login'
            className='hover:underline hover:text-rose-500 text-gray-600'
          >
            Login
          </Link>
          .
        </p>
      </div>
    </div>
    );
};

export default Register;