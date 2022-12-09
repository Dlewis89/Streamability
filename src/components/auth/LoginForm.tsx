import React, { useState } from 'react';
import ErrorMessage from '../ErrorMessage';
import { SUPABASE } from '../../helpers/supabaseClient';
import { useSessionContext } from '../../hooks';
import { Navigate } from 'react-router-dom';
import { Button, InputAdornment, FilledInput, InputLabel, FormControl, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

/**
 * @returns {JSX.Element}
 */
export default function LoginForm(): JSX.Element {
	const { session } = useSessionContext();
	const [email, setEmail] = useState('');
	const [emailError, setEmailError] = useState(false);
	const [password, setPassword] = useState('');
	const [passwordError, setPasswordError] = useState(false);
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	if (session) {
		return <Navigate to={'/dashboard'} />;
	}

	/**
	 * Function to authenticate and perform Supabase login
	 * Once the user has logged in, 
	 * their user info and session is stored in the context
	 * 
	 * @param evt | DOM submit event
	 * @returns {Promise<void>} | Does not redirect user
	 */
	async function signInWithEmail(evt: React.SyntheticEvent): Promise<void> {
		evt.preventDefault();

		// Ensure both fields have input
		if (!email || !password) {
			setErrorMessage('All fields must be filled out');
			if (!email) setEmailError(true);
			if (!password) setPasswordError(true);
			return;
		}

		// Perform Supabase login request
		const { error } = await SUPABASE.auth.signInWithPassword({
			email: email,
			password: password,
		});

		if (error) {
			// We could try to get the AuthApiError type and use 'cause' instead
			setErrorMessage(error.message);
			if (import.meta.env.DEV) console.error(error);
		} else {
			setErrorMessage('');
			// onAuthStateChange function will be triggered
		}

		return;
	}

	return (
		<div aria-live="polite">
			<h1>Login</h1>
			<form onSubmit={signInWithEmail} className='flex flex-col'>
				<FormControl sx={{m: .5}} variant='filled'>
					<InputLabel htmlFor='email-input'>Email</InputLabel>
					<FilledInput
						id='email-input'
						type='email'
						name='email'
						autoComplete='email'
						value={email}
						error={emailError}
						onChange={(e) => setEmail(e.target.value)}
						onFocus={() => setEmailError(false)}
					/>
				</FormControl>
				<FormControl sx={{m: .5}} variant='filled'>
					<InputLabel htmlFor='password-input'>Password</InputLabel>
					<FilledInput
						id='password-input'
						name="password"
						type={isPasswordVisible ? 'text' : 'password'}
						autoComplete='new-password'
						value={password}
						error={passwordError}
						onChange={(e) => setPassword(e.target.value)}
						onFocus={() => setPasswordError(false)}
						endAdornment={
							<InputAdornment position='end'>
								<IconButton
									aria-label='toggle password visibility'
									onClick={() => setIsPasswordVisible(prev => !prev)}
									edge='end'
								>
									{isPasswordVisible ? <VisibilityOff /> : <Visibility />}
								</IconButton>
							</InputAdornment>
						}
					/>
				</FormControl>
				<Button 
					variant='contained'
					size='large'
					type='submit'
					sx={{ margin: '10px'}}
				>
                    Submit
				</Button>
				{errorMessage.length > 0 && (
					<ErrorMessage message={errorMessage} />
				)}
			</form>
		</div>
	);
}