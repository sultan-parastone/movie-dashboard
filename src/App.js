// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Login from './pages/Login/Login';
// import Dashboard from './pages/Dashboard/Dashboard';
// import PrivateRoute from './components/Auth/PrivateRoute';
// import NotFound from './pages/NotFound';
// import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
// import Layout from './components/Layout/Layout';

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         {/* Default Route */}
//         <Route path="/" element={<Navigate to="/login" replace />} />

//         {/* Login Page */}
//         <Route path="/login" element={<Login />} />

//         {/* Forgot Password Page */}
//         <Route path='forgot-password' element={<ForgotPassword />} />

//         {/* Protected Route */}
//         <Route
//           path="/dashboard"
//           element={
//             <PrivateRoute>
//               <Layout>
//                 <Dashboard />
//               </Layout>
//             </PrivateRoute>
//           }
//         />

//         {/* Fallback for Undefined Routes */}
//         <Route path="*" element={<NotFound />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;



import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import PrivateRoute from './components/Auth/PrivateRoute';
import NotFound from './pages/NotFound';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import Layout from './components/Layout/Layout';

const App = () => {
  return (
    <Routes>
      {/* Default Route */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Login Page */}
      <Route path="/login" element={<Login />} />

      {/* Forgot Password Page */}
      <Route path="forgot-password" element={<ForgotPassword />} />

      {/* Protected Route */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </PrivateRoute>
        }
      />

      {/* Fallback for Undefined Routes */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
