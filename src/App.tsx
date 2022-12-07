import React from "react";
import Navbar from "./components/Navbar/Navbar";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Home from "./components/Home/Home";
import Movies from "./components/Movies/Movies";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import TvDetails from "./components/TvDetails/TvDetails";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import PersonDetails from "./components/PersonDetails/PersonDetails";
import People from "./components/People/People";
import Tvshows from "./components/TvShows/Tvshows";
import Search from "./components/Search/Search";
import { MediaContextProvider } from "./MediaContext";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";

function App() {
  const [user, setUserData] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      getUserData();
    }
  }, []);

  function getUserData() {
    const decodedToken: string | null = jwtDecode(localStorage.getItem("userToken")!);
    setUserData(decodedToken);
  }
  useEffect(() => {}, [user]);

  function logout() {
    localStorage.removeItem("userToken");
    setUserData(null);
    navigate("/login");
  }
  function ProtectedRoute({ children }: { children: React.ReactNode | React.ReactNode[] }) {
    if (!localStorage.getItem("userToken")) {
      return <Navigate to="/login" />;
    } else {
      return <>{children}</>;
    }
  }
  return (
    <>
      <Navbar user={user} logout={logout} />
      <div className="container">
        <MediaContextProvider>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="moviesdb"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="movies"
              element={
                <ProtectedRoute>
                  <Movies />
                </ProtectedRoute>
              }
            />
            <Route
              path="tvshows"
              element={
                <ProtectedRoute>
                  <Tvshows />
                </ProtectedRoute>
              }
            />
            <Route
              path="people"
              element={
                <ProtectedRoute>
                  <People />
                </ProtectedRoute>
              }
            />
            <Route
              path="moviedetails"
              element={
                <ProtectedRoute>
                  <MovieDetails />
                </ProtectedRoute>
              }
            >
              <Route
                path=":id"
                element={
                  <ProtectedRoute>
                    <MovieDetails />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route
              path="tvdetails"
              element={
                <ProtectedRoute>
                  <TvDetails />
                </ProtectedRoute>
              }
            >
              <Route
                path=":id"
                element={
                  <ProtectedRoute>
                    <TvDetails />
                  </ProtectedRoute>
                }
              />
            </Route>

            <Route
              path="persondetails"
              element={
                <ProtectedRoute>
                  <PersonDetails />
                </ProtectedRoute>
              }
            >
              <Route
                path=":id"
                element={
                  <ProtectedRoute>
                    <PersonDetails />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route
              path="search"
              element={
                <ProtectedRoute>
                  <Search />
                </ProtectedRoute>
              }
            />

            <Route path="login" element={<Login getUserData={getUserData} />} />
            <Route path="register" element={<Register />} />
            <Route path="*" element={<h1 className="text-center">Not Found </h1>} />
          </Routes>
        </MediaContextProvider>
      </div>
    </>
  );
}

export default App;
