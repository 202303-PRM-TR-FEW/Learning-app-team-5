import NavBar from "@/components/NavBar/NavBar";
import { AuthContextProvider } from "../../context/AuthContext";
import { RandomContextProvider } from "../../context/RandomNumbers";
import { CoursesContextProvider } from "../../context/FetchAllCourses";
import { UsersContextProvider } from "../../context/FetchAllUsers";

export default function Layout({ children }) {
  return (
    <AuthContextProvider>
      <RandomContextProvider>
        <CoursesContextProvider>
          <UsersContextProvider>
            <NavBar />
            {children}
          </UsersContextProvider>
        </CoursesContextProvider>
      </RandomContextProvider>
    </AuthContextProvider>
  );
}
