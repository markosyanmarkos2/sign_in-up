import { useParams } from "react-router-dom"

const userPage = () => {
    const { id } = useParams()
    const users = JSON.parse(localStorage.getItem("users")) || null
    const check = users.find((el) => 
        Number(id) === el.id
    )
    console.log(check);
    
    
    
    return (
        <div className="flex text-[50px]">hello {check.name}</div>
    )
}
export default userPage