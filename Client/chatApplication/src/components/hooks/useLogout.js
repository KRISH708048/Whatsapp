import React, { useState } from 'react';
import { toast } from "react-hot-toast";
import { useSetRecoilState } from 'recoil';
import { authUser } from '../recoil/AuthContext';

const useLogout = () => {
    const [loading, setLoading] = useState(false);
    const setAuth = useSetRecoilState(authUser);
    const logout = () => {
        setLoading(true);
        try {
            localStorage.removeItem('user-info');
            setAuth(null);
        } catch (err) {
            toast.error(err);
        } finally {
            setLoading(false);
        }
    }
    
    return { logout, loading };
}

export default useLogout;
