import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'; // Import icons
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { apis } from '../api';
import axiosWithHeader from '../Helper/AxiosWithHeader';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'User', // Default role
  });
  console.log(formData, 'formData');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleRoleToggle = (selectedRole) => {
    setFormData({ ...formData, role: selectedRole });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    try {
      // Validate form data
      if (!formData.email || !formData.password) {
        toast.error('Please fill in all fields');
        return;
      }
      let response;
      if (formData.role === "Rider") {
        response = await axiosWithHeader.post(`${apis.RIDER_LOGIN}`, formData);
      } else {
        response = await axiosWithHeader.post(`${apis.USER_LOGIN}`, formData);
      }
      console.log(response);
      if (response.status === 201) {
        toast.success("login-up successful!");
        navigate("/");
      }
    } catch (error) {
      if (error.status === 400) {
        toast.error(`${error?.response?.data?.message}`);
      }
      if (error.status === 500) {
        toast.error(`${error?.response?.data?.error?.message}`);
      }
      console.log("Error during form submission:", error);
    }

    // Add your login logic here
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          borderRadius: 2,
          width: '100%',
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          align="center"
          gutterBottom
          sx={{ fontWeight: 'bold', color: '#333' }}
        >
          Welcome Back
        </Typography>
        <Typography
          variant="body1"
          align="center"
          gutterBottom
          sx={{ color: '#666', marginBottom: 3 }}
        >
          Please login to your account
        </Typography>

        {/* Role Toggle Buttons */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 2,
            marginBottom: 3,
            position: 'relative',
            width: '100%',
            height: '50px',
            backgroundColor: '#f0f0f0',
            borderRadius: '25px',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: formData.role === 'User' ? '0%' : '50%',
              width: '50%',
              height: '100%',
              backgroundColor: '#000',
              borderRadius: '25px',
              transition: 'left 0.3s ease',
            }}
          />
          <Button
            onClick={() => handleRoleToggle('User')}
            sx={{
              zIndex: 1,
              flex: 1,
              textTransform: 'none',
              fontWeight: 'bold',
              color: formData.role === 'User' ? '#fff' : '#000',
            }}
          >
            User
          </Button>
          <Button
            onClick={() => handleRoleToggle('Rider')}
            sx={{
              zIndex: 1,
              flex: 1,
              textTransform: 'none',
              fontWeight: 'bold',
              color: formData.role === 'Rider' ? '#fff' : '#000',
            }}
          >
            Rider
          </Button>
        </Box>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          {/* Email Input */}
          <TextField
            label="Email Address"
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            variant="outlined"
            fullWidth
            required
          />
          {/* Password Input with Eye Icon */}
          <TextField
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            fullWidth
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                    {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {/* Login Button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            sx={{
              textTransform: 'none',
              fontWeight: 'bold',
              backgroundColor: '#000',
              '&:hover': {
                backgroundColor: '#333',
              },
            }}
          >
            Login
          </Button>
        </Box>
        {/* Footer */}
        <Typography
          variant="body2"
          align="center"
          sx={{ marginTop: 3, color: '#666' }}
        >
          Don't have an account?{' '}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => navigate('/UserSignUp')}
          >
            Sign up
          </span>
        </Typography>
      </Paper>
    </Container>
  );
};  

export default Login;