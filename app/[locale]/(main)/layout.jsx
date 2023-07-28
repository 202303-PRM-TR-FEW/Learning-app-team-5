import NavBar from "@/components/NavBar/NavBar";
import { AuthContextProvider } from "../../context/AuthContext";
import { RandomContextProvider } from "../../context/RandomNumbers";
import { CoursesContextProvider } from "../../context/FetchAllCourses";

export default function Layout({ children }) {
  return (
    <AuthContextProvider>
      <RandomContextProvider>
        <CoursesContextProvider>
          <NavBar />
          {children}
        </CoursesContextProvider>
      </RandomContextProvider>
    </AuthContextProvider>
  );
}
