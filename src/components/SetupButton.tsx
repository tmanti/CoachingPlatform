import { useRouter } from "next/router"
import { trpc } from "../utils/trpc"

const SetupButton = () =>{
    const router = useRouter()

    const setup = trpc.user.setup.useMutation({
        onSuccess: (data)=>{
            router.reload()
        }
    })

    return(
        <button onClick={()=>{
            setup.mutate()
        }}>
            Setup
        </button>
    )

}

export default SetupButton