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
        <button className="bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={()=>{
            setup.mutate()
        }}>
            Setup
        </button>
    )

}

export default SetupButton