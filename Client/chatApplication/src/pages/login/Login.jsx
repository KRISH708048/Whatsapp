import { useState } from "react";
import { NavLink } from "react-router-dom";

// import useLogin from "../../hooks/useLogin";

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	// const { loading, login } = useLogin();

	const handleSubmit = async (e) => {
		e.preventDefault();
		// await login(username, password);
	};

	return (
		<div className=' items-center justify-center min-w-96 mx-auto '>
			<div className='w-full flex flex-col gap-4 p-8 rounded-lg shadow-md  bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10'>
				<h1 className='text-4xl text-center font-bold bg-gradient-to-r via-gray-400 from-blue-800 to-blue-600 inline-block text-transparent bg-clip-text'>
					Login
					{/* <span className='text-blue-500'> ChatApp</span> */}
				</h1>

				<form className="flex flex-col gap-4" onSubmit={handleSubmit}>
					<div className="">
						<label className='label p-2'>
							<span className='text-lg  text-gray-300 label-text'>Username</span>
						</label>
						<input
							type='text'
							placeholder='Enter username'
							className='w-full mt-1 p-4 input input-bordered rounded-2xl h-10'
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
					</div>

					<div>
						<label className='label'>
							<span className='text-lg text-gray-300 label-text'>Password</span>
						</label>
						<input
							type='password'
							placeholder='Enter Password'
							className='w-full mt-1 p-4 input input-bordered rounded-2xl h-10'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<NavLink to='/signup' className='text-sm  text-gray-400 text-center hover:underline hover:text-blue-600 mt-2 inline-block'>
						{"Don't"} have an account?
					</NavLink>

					<div className="mx-auto">
						<button className='mx-auto btn btn-sm  w-48' 
                        // disabled={loading}
                        >
							{/* {loading ? <span className='loading loading-spinner '></span> : "Login"} */}
							Login
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
export default Login;
