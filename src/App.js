import React from "react";
import Portal from "./pages/Portal";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";

import Login from "./pages/login/Login"
import { AuthProvider } from "./authentication/auth";
import { ProtectedRoute } from "./authentication/ProtectedRoute";
import Category from "./pages/Category/Category";
import UpdateCategory from "./pages/Category/UpdateCategory";
import AddCategory from "./pages/Category/AddCategory";
import Location from "./pages/Location/Location";
import AddLocation from "./pages/Location/AddLocation";
import UpdateLocation from "./pages/Location/UpdateLocation";
import Package from "./pages/Package/Package";
import AddPackage from "./pages/Package/AddPackage";
import UpdatePackage from "./pages/Package/UpdatePackage";
import ChangePassword from "./pages/ChangePassword/ChangePassword";



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
              <Route path="/Categorys" element={
                <ProtectedRoute>
                  <Category />
                </ProtectedRoute>
              } />
              <Route path="/edit-Category/:id" element={
                <ProtectedRoute>
                  <UpdateCategory />
                </ProtectedRoute>
              } />
              <Route path="/add-Category" element={
                <ProtectedRoute>
                  <AddCategory />
                </ProtectedRoute>
              } />
              <Route path="/change-password" element={
                <ProtectedRoute>
                  < ChangePassword />
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
