import { useState } from "react";
import { useRouter } from "next/router";
import { trpc } from "../utils/trpc";

interface requestProps {
    id: string,
    transaction_id: string,

    account_name: string,
    
    start_rank: number,
    end_rank:number,

    handler:string,

    status:string,
}

const Request = (props: requestProps) => {
    const router = useRouter()

    const [error, setError] = useState("");

    const handle = trpc.request.handleRequest.useMutation({
        onSuccess:(data)=>{
            if(data){
                router.push("/request/"+data.id)
            }
        }
    })

    const handleRequest = () =>{
        handle.mutate({
            req_id:props.id
        })
    }

    const viewRequest = () =>{
        router.push("/request/"+props.id)
    }

    return(
        <div>
            <div className="flex">
                <h1 className="pr-3">{props.account_name}</h1>
                <h1 className="px-3">{props.transaction_id}</h1>
                <h1 className="pl-6 pr-3">{props.start_rank}</h1>
                <h1 className="px-3">{props.end_rank}</h1>
                <h1 className="pl-6 pr-3">{props.handler}</h1>
                <h1 className="px-3">{props.status}</h1>
                <div className="px-6">
                    <button
                        className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                        onClick={(e)=>{
                            handleRequest();
                        }}
                    >
                        Handle
                    </button>
                    <button
                        className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                        onClick={(e)=>{
                            viewRequest();
                        }}
                    >
                        View
                    </button>
                </div>
            </div>
            <hr />
        </div>
        
    )
    //TODO: handle button
    //TODO: view button
}

export default Request