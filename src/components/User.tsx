import { useSession } from "next-auth/react";
import { useState } from "react";
import { trpc } from "../utils/trpc";

interface userProps {
    id: string,
    name: string|null,
    image: string|null,
    permissions: number,
}

const User = (props: userProps) => {
    const {data: session, status } = useSession();

    const [permission, setPermission] = useState(props.permissions);
    const [new_perms, setNewPerm] = useState(props.permissions);
    const updatePerms = trpc.user.changePermissions.useMutation();

    const changeSelect = (updated_perms:number) =>{
        setPermission(new_perms);
        updatePerms.mutate({
            user_id:props.id,
            new_permissions:updated_perms,
        })
    }

    return (
        <div className="flex">
            <h1 className="pr-3">{props.name}</h1>
            <h2 className="px-3">Permission: {permission}</h2>
            
            <select className="px-3" value={new_perms} onChange={(e)=>{
                setNewPerm(e.target.selectedIndex)
            }}>
                <option value="0">0</option>
                <option value="1">1</option>
                {
                    session?.user?.permissions && session?.user?.permissions>2 ?
                    <option value="2">2</option>:null
                }
                
            </select>

            <div className="px-3">
                <button 
                    className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" 
                    onClick={()=>{
                        changeSelect(new_perms);
                    }}
                    disabled={permission === new_perms}
                >
                    Update Permission To: {new_perms}
                </button>
            </div>
            
        </div>
    )
}

export default User