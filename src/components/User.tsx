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

    const permission = useState(props.permissions);
    const updatePerms = trpc.user.changePermissions.useMutation();

    const changeSelect = (updated_perms:number) =>{
        updatePerms.mutate({
            user_id:props.id,
            new_permissions:updated_perms,
        })
    }

    return (
        <div className="flex">
            <h1>{props.name}</h1>
            <h2>Permission: {props.permissions}</h2>
            
            <select onChange={(e)=>{
                changeSelect(e.target.selectedIndex)
            }}>
                <option>0</option>
                <option>1</option>
                {
                    session?.user?.permissions && session?.user?.permissions>2 ?
                    <option>2</option>:null
                }
                
            </select>
        </div>
    )
}

export default User