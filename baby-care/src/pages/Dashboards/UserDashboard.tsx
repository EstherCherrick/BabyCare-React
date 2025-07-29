import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, Avatar, List, ListItem, ListItemText, Divider } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useGetAppointmentsHistoryQuery } from "../../api/appointmentsApi";

const UserDashboard: React.FC = () => {
  const navigate = useNavigate();
  const babyId = useSelector((state: RootState) => state.auth.babyId);

  const { data: history = [], isLoading } = useGetAppointmentsHistoryQuery(babyId || '');

  if (!babyId) {
    return (
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <Typography variant="h5" color="error">נא להתחבר כדי לגשת לאזור האישי</Typography>
      </Box>
    );
  }

  const formatDate = (date: string) => new Date(date).toLocaleDateString('he-IL'); // פורמט תאריך

  return (
    <Box sx={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #fafdff 0%, #e3f2fd 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      py: 5,
      px: 2,
      margin: 0,
      padding: 0
    }}>
      <Avatar src="https://upload.wikimedia.org/wikipedia/he/2/2e/Meuhedet_logo.svg" sx={{ width: 80, height: 80, mx: "auto", mb: 3 }} />
      <Typography variant="h4" color="primary" gutterBottom>ברוך הבא לאזור האישי</Typography>
      <Typography variant="subtitle1" color="text.secondary">כאן תוכל לנהל את פרטי התינוק שלך</Typography>
      <Box sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 3,
        justifyContent: "center",
        width: "100%",
        maxWidth: "100%",
        mt: 4,
        padding: 0
      }}>
        <Box sx={{ background: "#f0f8ff", borderRadius: 0, boxShadow: 0, minWidth: 300, maxWidth: 350, flex: 1, m: 1, p: 2 }}>
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
        </Box>
        <Box sx={{ background: "#f0f8ff", borderRadius: 0, boxShadow: 0, minWidth: 300, maxWidth: 350, flex: 1, m: 1, p: 2 }}>
          <Typography variant="h6" color="primary" gutterBottom>היסטוריית ביקורים</Typography>
          {isLoading ? (
            <Typography color="text.secondary">טוען...</Typography>
          ) : history.length > 0 ? (
            <List dense>
              {history.map((item, idx) => (
                <React.Fragment key={item.id}>
                  <ListItem>
                    <ListItemText
                      primary={<span style={{ fontWeight: 600 }}>{`${item.babyName} - ${item.workerType} אצל ${item.workerName}`}</span>}
                      secondary={
                        item.date && item.hour ? (
                          <span style={{ color: '#666' }}>
                            {`תאריך: ${formatDate(item.date)}  בשעה: ${item.hour} `}
                          </span>
                        ) : (
                          <span style={{ color: '#666' }}>תאריך לא זמין</span>
                        )
                      }
                    />
                  </ListItem>
                  {idx < history.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          ) : (
            <Typography color="#b0bec5" align="center" sx={{ fontSize: 15, mt: 2 }}>
              אין היסטוריית תורים להצגה
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default UserDashboard;
