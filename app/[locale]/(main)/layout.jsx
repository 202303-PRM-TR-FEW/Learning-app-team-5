import NavBar from "@/components/NavBar/NavBar";
import { AuthContextProvider } from "../../context/AuthContext";
import { RandomContextProvider } from "../../context/RandomNumbers";

export default function Layout({ children,params }) {
  return (
    <AuthContextProvider>
      <RandomContextProvider>
        <NavBar locale={params.locale} />
        {children}
      </RandomContextProvider>
    </AuthContextProvider>
  );
}
