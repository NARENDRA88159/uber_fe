import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Box,
  InputAdornment,
  IconButton,
  Paper,
  Container,
  MenuItem,
} from "@mui/material";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // Import icons
import { useNavigate } from "react-router-dom";
import axiosWithHeader from "../Helper/AxiosWithHeader";
import { apis } from "../api";
import toast from "react-hot-toast";

const UserSignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "User", // Default role
    vehicle: null, // Vehicle field is null for "User"
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (formData.role === "Rider" && formData.vehicle && ["color", "plate", "capacity", "vehicleType"].includes(name)) {
      // Update vehicle-specific fields
      setFormData({
        ...formData,
        vehicle: { ...formData.vehicle, [name]: value },
      });
    } else {
      // Update general fields
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleRoleToggle = (selectedRole) => {
    if (selectedRole === "Rider") {
      // Add vehicle-specific fields for Rider
      setFormData({
        ...formData,
        role: "Rider",
        vehicle: {
          color: "",
          plate: "",
          capacity: "",
          vehicleType: "",
        },
      });
    } else {
      // Remove vehicle-specific fields for User
      const { vehicle, ...rest } = formData;
      setFormData({ ...rest, role: "User" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate general fields
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
        toast.error("Please fill in all fields");
        return;
      }

      // Validate Rider-specific fields
      if (formData.role === "Rider") {
        const { vehicle } = formData;
        if (!vehicle || !vehicle.color || !vehicle.plate || !vehicle.capacity || !vehicle.vehicleType) {
          toast.error("Please fill in all Rider fields");
          return;
        }
      }

      let response;
      if (formData.role === "Rider") {
        response = await axiosWithHeader.post(`${apis.RIDER_REGISTRATION}`, formData);
      } else {
        response = await axiosWithHeader.post(`${apis.USER_REGISTRATION}`, formData);
      }

      console.log(response);
      if (response.status === 201) {
        toast.success("Sign-up successful!");
        navigate("/login");
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
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          borderRadius: 2,
          width: "100%",
          position: "relative",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          align="center"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#333" }}
        >
          Create an Account
        </Typography>
        <Typography
          variant="body1"
          align="center"
          gutterBottom
          sx={{ color: "#666", marginBottom: 3 }}
        >
          Please fill in the details to sign up
        </Typography>

        {/* Role Toggle Buttons */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 2,
            marginBottom: 3,
            position: "relative",
            width: "100%",
            height: "50px",
            backgroundColor: "#f0f0f0",
            borderRadius: "25px",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: formData.role === "User" ? "0%" : "50%",
              width: "50%",
              height: "100%",
              backgroundColor: "#000",
              borderRadius: "25px",
              transition: "left 0.3s ease",
            }}
          />
          <Button
            onClick={() => handleRoleToggle("User")}
            sx={{
              zIndex: 1,
              flex: 1,
              textTransform: "none",
              fontWeight: "bold",
              color: formData.role === "User" ? "#fff" : "#000",
            }}
          >
            User
          </Button>
          <Button
            onClick={() => handleRoleToggle("Rider")}
            sx={{
              zIndex: 1,
              flex: 1,
              textTransform: "none",
              fontWeight: "bold",
              color: formData.role === "Rider" ? "#fff" : "#000",
            }}
          >
            Rider
          </Button>
        </Box>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {/* First Name Input */}
          <TextField
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            variant="outlined"
            required
            fullWidth
          />
          {/* Last Name Input */}
          <TextField
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            variant="outlined"
            required
            fullWidth
          />
          {/* Email Input */}
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            variant="outlined"
            required
            fullWidth
          />
          {/* Password Input with Eye Icon */}
          <TextField
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            variant="outlined"
            required
            fullWidth
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

          {/* Rider-Specific Fields */}
          {formData.role === "Rider" && formData.vehicle && (
            <>
              <TextField
                label="Vehicle Color"
                name="color"
                value={formData.vehicle.color}
                onChange={handleChange}
                variant="outlined"
                required
                fullWidth
              />
              <TextField
                label="License Plate"
                name="plate"
                value={formData.vehicle.plate}
                onChange={handleChange}
                variant="outlined"
                required
                fullWidth
              />
              <TextField
                label="Capacity"
                name="capacity"
                type="number"
                value={formData.vehicle.capacity}
                onChange={handleChange}
                variant="outlined"
                required
                fullWidth
              />
              <TextField
                label="Vehicle Type"
                name="vehicleType"
                value={formData.vehicle.vehicleType}
                onChange={handleChange}
                variant="outlined"
                required
                fullWidth
                select
              >
                <MenuItem value="car">Car</MenuItem>
                <MenuItem value="bike">Bike</MenuItem>
                <MenuItem value="auto">Auto</MenuItem>
              </TextField>
            </>
          )}

          {/* Sign-Up Button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            sx={{
              textTransform: "none",
              fontWeight: "bold",
              backgroundColor: "#000",
              "&:hover": {
                backgroundColor: "#333",
              },
            }}
          >
            Sign Up
          </Button>
        </Box>
        {/* Footer */}
        <Typography
          variant="body2"
          align="center"
          sx={{ marginTop: 3, color: "#666" }}
        >
          Already have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </Typography>
      </Paper>
    </Container>
  );
};

export default UserSignUp;