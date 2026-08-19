import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const [isExpired, setIsExpired] = useState(false)
    const token = localStorage.getItem("token");


    useEffect(() => {
        if (!token) return

        try {
            const decode = jwtDecode(token)

            const waktuExpired = decode.exp * 1000;
            const waktuTersisa = waktuExpired - Date.now()

            if (waktuTersisa <= 0) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                setIsExpired(true);
                return
            }

            const timer = setTimeout(() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");

                setIsExpired(true)

            }, waktuTersisa);
            return () => clearTimeout(timer)
        } catch (error) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");

            setIsExpired(true)
        }
    }, [token])

    if (!token || isExpired) {
        return <Navigate to="/admin/login" replace />
    }
    return children
}

export default ProtectedRoute