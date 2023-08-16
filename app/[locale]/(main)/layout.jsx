import NavBar from "@/components/NavBar/NavBar";
import { AuthContextProvider } from "../../context/AuthContext";
import { RandomContextProvider } from "../../context/RandomNumbers";
import { CoursesContextProvider } from "../../context/FetchAllCourses";
import { UsersContextProvider } from "../../context/FetchAllUsers";

export default function Layout({ children, params }) {
  return (
    <AuthContextProvider>
      <RandomContextProvider>
        <CoursesContextProvider>
          <UsersContextProvider>
            <NavBar params={params} />
            {children}
          </UsersContextProvider>
        </CoursesContextProvider>
      </RandomContextProvider>
    </AuthContextProvider>
  );
}
