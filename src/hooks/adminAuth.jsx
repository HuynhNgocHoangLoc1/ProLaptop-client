import { useContext } from 'react';
import AccountContext from '../context/accountContext';

const useAuth = () => {
    return useContext(AccountContext);
}

export default useAuth;
