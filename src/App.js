import React from "react";
import Portal from "./pages/Portal";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import { Courses } from "./pages/Courses/Courses";
import AddCourses from "./pages/Courses/AddCourses"
import UpdateCourses from "./pages/Courses/UpdateCourses";
import Login from "./pages/login/Login"
import { AuthProvider } from "./authentication/auth";
import { ProtectedRoute } from "./authentication/ProtectedRoute";
import FAQ from "./pages/FAQ/FAQ";
import UpdateFAQ from "./pages/FAQ/UpdateFAQ";
import AddFAQ from "./pages/FAQ/AddFAQ";
import Location from "./pages/Location/Location";
import AddLocation from "./pages/Location/AddLocation";
import UpdateLocation from "./pages/Location/UpdateLocation";
import Package from "./pages/Package/Package";
import AddPackage from "./pages/Package/AddPackage";
import UpdatePackage from "./pages/Package/UpdatePackage";



function App() {
  return (
    <AuthProvider>
    <div className="App">
        <Router>
          <Routes>
            <Route exact path="/" element={
              <ProtectedRoute>
                <Portal />
              </ProtectedRoute>
            }>
              <Route index element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/courses" element={
                <ProtectedRoute>
                  <Courses />
                </ProtectedRoute>
              }>
              </Route>
              <Route path="add-courses" element={
                <ProtectedRoute>
                  <AddCourses />
                </ProtectedRoute>
              } />
              <Route path="edit-courses/:id" element={
                <ProtectedRoute>
                  <UpdateCourses />
                </ProtectedRoute>
              } />
              {/* Location */}
              <Route path="/location" element={
                <ProtectedRoute>
                  <Location />
                </ProtectedRoute>
              }>
              </Route>
              <Route path="add-location" element={
                <ProtectedRoute>
                  <AddLocation />
                </ProtectedRoute>
              } />
              <Route path="edit-location/:id" element={
                <ProtectedRoute>
                  <UpdateLocation />
                </ProtectedRoute>
              } />
              {/* Package */}
              <Route path="/package" element={
                <ProtectedRoute>
                  <Package />
                </ProtectedRoute>
              }>
              </Route>
              <Route path="add-package" element={
                <ProtectedRoute>
                  <AddPackage />
                </ProtectedRoute>
              } />
              <Route path="edit-package/:id" element={
                <ProtectedRoute>
                  <UpdatePackage />
                </ProtectedRoute>
              } />
              <Route path="/faqs" element={
                <ProtectedRoute>
                  <FAQ />
                </ProtectedRoute>
              } />
              <Route path="/edit-faq/:id" element={
                <ProtectedRoute>
                  <UpdateFAQ />
                </ProtectedRoute>
              } />
              <Route path="/add-faq" element={
                <ProtectedRoute>
                  <AddFAQ />
                </ProtectedRoute>
              } />
            </Route>
            <Route path="/admin/login" element={<Login />} />
          </Routes>
        </Router>
    </div>
    </AuthProvider>
  );
}

export default App;
