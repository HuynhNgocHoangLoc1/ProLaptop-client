import AccountContext from "../context/accountContext"
import { useContext } from "react"

const useAuth = () => {
    return useContext(AccountContext)
}
export default useAuth