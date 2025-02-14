import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { TbFidgetSpinner } from "react-icons/tb";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { Helmet } from "react-helmet-async";

const Login = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const from = location?.state || '/'
  
    const { signInWithGoogle, signIn, loading, setLoading } = useAuth()
   
  
  
  
    const handleSubmit = async (e) => {
      e.preventDefault()
      const form = e.target
      const email = form.email.value
      const password = form.password.value
  
  
      try {
        setLoading(true)
        // sign in user
        await signIn(email, password)
  
        navigate(from)
        toast.success('SignUp Successful')
  
      } catch (err) {
        // console.log(err)
        toast.error(err.message)
        setLoading(false)
      }
    }
  

  

    //  handle google Sign in
    const handleGoogleSignIn = async () => {
      try {
        await signInWithGoogle()
  
        navigate(from)
        toast.success('SignUp Successful')
  
      } catch (err) {
        // console.log(err)
        toast.error(err.message)
  
      }
    }
  
  

    return (
        <div style={{
            backgroundImage: 'url(https://i.ibb.co/JmTqt5D/pngtree-blue-water-wave-ocean-background-hd-image-770489.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundSize:'cover',
            backgroundPosition: 'center'
        }} className='flex  justify-center items-center min-h-screen'>
          <Helmet>
                <title>Login</title>
            </Helmet>
        <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-blue-100 text-gray-900'>
          <div className='mb-8 text-center'>
            <h1 className='my-3 text-4xl font-bold'>Log In</h1>
            
          </div>
          <form
            onSubmit={handleSubmit}
            className='space-y-6 ng-untouched ng-pristine ng-valid'
          >
            <div className='space-y-4'>
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
              <div>
                <div className='flex justify-between'>
                  <label htmlFor='password' className='text-sm mb-2'>
                    Password
                  </label>
                </div>
                <input
                  type='password'
                  name='password'
                  autoComplete='current-password'
                  id='password'
                  required
                  placeholder='*******'
                  className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-100 text-gray-900'
                />
              </div>
            </div>
  
            <div>
              <button
                disabled={loading}
                type='submit'
                className='bg-[#40679E]  w-full rounded-md py-3 text-white'
              >
                {loading ? <TbFidgetSpinner className='animate-spin m-auto' /> : 'continue'}
              </button>
            </div>
          </form>
          <div className='flex items-center pt-4 space-x-1'>
            <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
            <p className='px-3 text-sm dark:text-gray-400'>
              Login with social accounts
            </p>
            <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
          </div>
          <button
            disabled={loading}
            onClick={handleGoogleSignIn} className='disabled:cursor-not-allowed flex justify-center items-center space-x-2 border rounded-full hover:bg-[#c1d1e9] m-3 p-2 border-gray-300 border-rounded cursor-pointer'>
            <FcGoogle size={32} />
  
            <p>Continue with Google</p>
          </button>
          <p className='px-6 text-sm text-center text-gray-400'>
            Don not have an account yet?{' '}
            <Link
              to='/register'
              className='hover:underline hover:text-rose-500 text-gray-600'
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    );
}
export default Login;