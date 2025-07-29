import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout as logoutAction } from "../app/authSlice";
import { useLogoutMutation } from "../api/authApi";
import { services } from "../types/services";
import { Box, Typography, Button } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();
  const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);

  const handleAuth = async () => {
    if (isAuthenticated) {
      try {
        await logout({}).unwrap();
        dispatch(logoutAction());
      } catch (error) {
        console.error('Failed to logout:', error);
      }
    } else {
      navigate('/login');
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        background: "linear-gradient(135deg, #fafdff 0%, #e3f2fd 100%)",
        px: 0,
        py: 0,
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 0,
        overflow: "auto",
      }}
    >
      <Box sx={{ position: "absolute", left: 32, top: 32, zIndex: 10, background: "none" }}>
        <Button
          variant="outlined"
          size="medium"
          startIcon={<LoginIcon />}
          sx={{
            borderRadius: "12px",
            fontSize: "1.05rem",
            px: 2.5,
            py: 0.7,
            minWidth: "auto",
            color: isAuthenticated ? "#1976d2" : "#1976d2",
            borderColor: "#b3e5fc",
            background: "rgba(255,255,255,0.97)",
            boxShadow: "0 1px 6px rgba(33,150,243,0.10)",
            fontWeight: 600,
            letterSpacing: 0.5,
            transition: "all 0.2s",
            '&:hover': {
              background: "#1976d2",
              color: "#fff",
              borderColor: "#1976d2",
            },
          }}
          onClick={handleAuth}
        >
          {isAuthenticated ? "יציאה" : "כניסה"}
        </Button>
      </Box>
      <Box sx={{ textAlign: "center", mb: 4, pt: 6 }}>
        <Typography variant="h2" sx={{ color: "#1976d2", fontWeight: 700, mb: 1, fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif', letterSpacing: 1 }}>
          ברוכים הבאים לטיפת חלב
        </Typography>
        <Typography variant="h5" sx={{ color: "#1976d2", fontWeight: 500, fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif' }}>
          מרפאה להתפתחות התינוק שלך
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          justifyContent: "center",
          alignItems: "stretch",
          px: { xs: 1, md: 6 },
          background: "none",
        }}
      >
        {services.map((service, idx) => (
          <Box
            key={idx}
            sx={{
              background: "linear-gradient(135deg, #ffffff 90%, #e3f2fd 100%)",
              border: "none",
              borderRadius: "18px",
              boxShadow: "none",
              p: 2.5,
              minWidth: { xs: "90vw", sm: "220px" },
              maxWidth: "260px",
              flex: "1 1 220px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: 3,
              transition: "box-shadow 0.2s, transform 0.2s",
              cursor: "pointer",
              '&:hover': {
                boxShadow: "none",
                transform: "translateY(-4px) scale(1.03)",
              },
            }}
          >
            <Box
              sx={{
                fontSize: "2.7rem",
                mb: 2,
                color: "#1976d2",
                background: "linear-gradient(90deg, #90caf9 0%, #e3f2fd 100%)",
                borderRadius: "50%",
                p: 1,
                boxShadow: "0 1px 8px rgba(33,150,243,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {service.icon}
            </Box>
            <Typography variant="h6" sx={{ color: "#1976d2", fontWeight: 700, mb: 1, textAlign: "center", fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif', letterSpacing: 0.5 }}>
              {service.title}
            </Typography>
            <Typography variant="body2" sx={{ color: "#374151", textAlign: "center", fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif', fontSize: "1.08rem" }}>
              {service.description}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default HomePage;