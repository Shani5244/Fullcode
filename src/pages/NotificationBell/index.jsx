// import React, { useState, useEffect } from 'react';
// import './Style.css'; // Your custom styling

// const NotificationBell = () => {
//   const [notifications, setNotifications] = useState([]);
//   const [showList, setShowList] = useState(false);

//   useEffect(() => {
//     const mockData = [
//       { id: 1, message: 'Booking confirmed for 28th June.', read: false },
//       { id: 2, message: 'AC Repair offer: 15% off!', read: true }
//     ];
//     setNotifications(mockData);
//   }, []);

//   const toggleList = () => setShowList(!showList);

//   return (
//     <div className="notification-wrapper">
//       <button className="notification-toggle" onClick={toggleList}>
//         Notifications
//         {notifications.some(n => !n.read) && <span className="dot" />}
//       </button>

//       {showList && (
//         <div className="notification-list">
//           {notifications.length === 0 ? (
//             <p>No notifications</p>
//           ) : (
//             notifications.map(n => (
//               <div key={n.id} className={`notification-item ${n.read ? '' : 'unread'}`}>
//                 {n.message}
//               </div>
//             ))
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default NotificationBell;
