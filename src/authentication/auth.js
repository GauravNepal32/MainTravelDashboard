import { createContext,useContext,useState,useEffect } from "react";

const AuthContext=createContext(null);


export const AuthProvider=({children})=>{
    const [isLogin,setIsLogin]=useState(false)
    const userData =sessionStorage.getItem("access_token");
    const [user, setUser] = useState(null);
    // const baseURL="https://newmotifapi.elscript.co"
    const baseURL="http://localhost:8000"


    const login=(user)=>{
        setUser(user);
        sessionStorage.setItem("access_token", user.token)
        setIsLogin(true)
        console.log(isLogin)
    }

    const logout=()=>{
        setUser(null)
        setIsLogin(false)
    }

      useEffect(()=>{
        if (userData===null){
        setIsLogin(false)
        }else{
        setIsLogin(true)
        }
  },[userData])
    return(
        <AuthContext.Provider value={{ user, isLogin, login, logout,baseURL }}>
        {children}
        </AuthContext.Provider>
    )
}
export const useAuth=()=>{
    return(useContext(AuthContext))
}