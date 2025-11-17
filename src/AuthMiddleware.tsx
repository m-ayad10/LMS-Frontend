import { useEffect, useRef, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { server_url } from "./Hooks/customHook";
import toast from "react-hot-toast";



export const ProtectedRoute = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const hasFetched=useRef(false)
    
    useEffect(() => {
        if(hasFetched.current) return
        hasFetched.current=true
        const validate = async () => {
            try {
                const response = await fetch(`${server_url}/verify-token`, { 
                    credentials: "include" 
                });
                
                const data = await response.json();
                const { success } = data;                
                if (success) {
                    setIsAuthenticated(true);
                } else {
                    toast.error("Un Authorised");
                    setIsAuthenticated(false);
                }
            } catch (error: unknown) {
                console.error("Authentication error:", error);
                const errorMessage = error instanceof Error ? error.message : "Network error. Please try again.";
                toast.error(errorMessage);
                setIsAuthenticated(false);
            }
        };
        validate();
    }, []);

    if (isAuthenticated === null) {
        return <p className='text-center mt-5'>Loading...</p>;
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export const InstructorProtectedRoute = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const hasFetched=useRef(false)
    
    useEffect(() => {
        if(hasFetched.current) return
        hasFetched.current=true
        const validate = async () => {
            try {
                const response = await fetch(`${server_url}/instructor/verify-token`, { 
                    credentials: "include" 
                });
                
                const data = await response.json();
                const { success, data: userData } = data;
                
                if (success && userData?.role === 'instructor') {
                    setIsAuthenticated(true);
                } else {
                    const errorMessage = userData?.role !== 'instructor' 
                        ? "Instructor access required" 
                        : "Authentication failed";
                    toast.error(errorMessage);
                    setIsAuthenticated(false);
                }
            } catch (error: any) {
                console.error("Instructor authentication error:", error);
                toast.error(error.message || "Network error. Please try again.");
                setIsAuthenticated(false);
            }
        };
        validate();
    }, []);

    if (isAuthenticated === null) {
        return <p className='text-center mt-5'>Loading...</p>;
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export const AdminProtectedRoute = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const hasFetched=useRef(false)
    
    useEffect(() => {
        if(hasFetched.current) return
        hasFetched.current=true
        const validate = async () => {
            try {
                const response = await fetch(`${server_url}/verify-token`, { 
                    credentials: "include" 
                });
                
                const data = await response.json();
                const { success, data: userData } = data;
                
                if (success && userData?.role === 'admin') {
                    setIsAuthenticated(true);
                } else {
                    const errorMessage = userData?.role !== 'admin' 
                        ? "Admin access required" 
                        : "Authentication failed";
                    toast.error(errorMessage);
                    setIsAuthenticated(false);
                }
            } catch (error: any) {
                console.error("Admin authentication error:", error);
                toast.error(error.message || "Network error. Please try again.");
                setIsAuthenticated(false);
            }
        };
        validate();
    }, []);

    if (isAuthenticated === null) {
        return <p className='text-center mt-5'>Loading...</p>;
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};