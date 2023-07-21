import NavBar from "@/components/NavBar/NavBar";
import { AuthContextProvider } from "../context/AuthContext";
import { RandomContextProvider } from "../context/RandomNumbers";

export default function Layout({ children }) {
  return (
    <AuthContextProvider>
      <RandomContextProvider>
        <NavBar/>
        {children}
      </RandomContextProvider>
    </AuthContextProvider>
  );
}
