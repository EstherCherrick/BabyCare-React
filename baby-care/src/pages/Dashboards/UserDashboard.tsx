import React from "react";

import { useNavigate } from "react-router-dom";
import { Box, Button, Card, CardContent, Typography, Avatar } from "@mui/material";

const UserDashboard: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #e3f2fd 0%, #ffffff 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      py: 5
    }}>
      <Card sx={{
        background: "#fff",
        borderRadius: 4,
        boxShadow: 3,
        px: 5,
        py: 4,
        maxWidth: 500,
        width: "100%",
        mb: 4,
        textAlign: "center"
      }}>
        <Avatar src="https://upload.wikimedia.org/wikipedia/he/2/2e/Meuhedet_logo.svg" sx={{ width: 80, height: 80, mx: "auto", mb: 3 }} />
        <Typography variant="h4" color="primary" gutterBottom>ברוך הבא לאזור האישי</Typography>
        <Typography variant="subtitle1" color="text.secondary">כאן תוכל לנהל את פרטי התינוק שלך</Typography>
      </Card>
      <Box sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 3,
        justifyContent: "center",
        width: "100%",
        maxWidth: 1100
      }}>
        <Card sx={{ background: "#f0f8ff", borderRadius: 3, boxShadow: 1, minWidth: 300, maxWidth: 350, flex: 1, m: 1 }}>
          <CardContent>
            <Typography variant="h6" color="primary" gutterBottom>קביעת תור לחיסון</Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{ borderRadius: 2, px: 5, py: 1.5, mt: 1 }}
              onClick={() => navigate("/appointments")}
            >
              קבע תור
            </Button>
          </CardContent>
        </Card>
        <Card sx={{ background: "#f0f8ff", borderRadius: 3, boxShadow: 1, minWidth: 300, maxWidth: 350, flex: 1, m: 1 }}>
          <CardContent>
            <Typography variant="h6" color="primary" gutterBottom>היסטוריית ביקורים</Typography>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, color: "#333" }}>
              <li>12/07/2025 - חיסון גיל שנה</li>
              <li>10/05/2025 - חיסון גיל חצי שנה</li>
            </ul>
          </CardContent>
        </Card>
        <Card sx={{ background: "#f0f8ff", borderRadius: 3, boxShadow: 1, minWidth: 300, maxWidth: 350, flex: 1, m: 1 }}>
          <CardContent>
            <Typography variant="h6" color="primary" gutterBottom>עקומת גדילה</Typography>
            <Box sx={{ height: 120, background: "#e3f2fd", borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center", color: "#888" }}>
              גרף עקומת גדילה (דמה)
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default UserDashboard;