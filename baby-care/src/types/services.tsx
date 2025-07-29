import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBaby, faSyringe, faHeartbeat, faClipboardList } from '@fortawesome/free-solid-svg-icons';

export const services = [
  {
    title: 'מעקב התפתחותי',
    description: 'מידע ומעקב אחר שלבי ההתפתחות של תינוקות וילדים, כולל בדיקות תקופתיות.',
    icon: <FontAwesomeIcon icon={faBaby} size="3x" />,
  },
  {
    title: 'חיסונים',
    description: 'הסבר על חיסונים חיוניים, מועדי חיסון ותיאום תורים לחיסון.',
    icon: <FontAwesomeIcon icon={faSyringe} size="3x" />,
  },
  {
    title: 'צוות מקצועי',
    description: 'פגישה עם אחיות ורופאים מוסמכים, ליווי אישי לכל משפחה.',
    icon: <FontAwesomeIcon icon={faHeartbeat} size="3x" />,
  },
  {
    title: 'ניהול תורים',
    description: 'קביעת תורים, תזכורות וניהול פניות למרפאה.',
    icon: <FontAwesomeIcon icon={faClipboardList} size="3x" />,
  },
];
