import { useRouter } from "next/router";
import { useState } from "react";
import { trpc } from "../utils/trpc";

const EditRequest = ()=>{
    const router = useRouter();

    const {data:request} = trpc.request.viewRequest.useQuery({
        id:router.query.id as string
    },
    {
        onSuccess:(data)=>{
            if(data){
                setStatus(data.status);
                setNotes(data.notes);
            }
        }
    })

    const update = trpc.request.updateStatus.useMutation({
        onSuccess:(data)=>{
            if(data){
                router.push("/request/"+router.query.id as string)
            }
        }
    });

    const [error, setError] = useState("");

    const [editing, setEditing] = useState(false);

    const [status, setStatus] = useState("");
    const [notes, setNotes] = useState("");

    return (
        <div>
            <h1>Request</h1>
            <h2>Transaction ID: {request?.transaction_id}</h2>
            <h2>Handler: {request?.handler?.name}</h2>
            <br />
            <h1>Account Details:</h1>
            <h2>Username: {request?.account_name}</h2>
            <h2>Password: {request?.account_pass}</h2>
            <br />
            <h2>From Rank | {request?.start_rank} | to | {request?.desired_rank} |</h2>
            <br />
            {
                editing?
                <div>
                    <h1>Status:</h1>
                    <select onChange={(e)=>{
                        setStatus(e.target.options[e.target.selectedIndex]?.text.toLowerCase() || "")
                    }}>
                        <option>Created</option>
                        <option>Assigned</option>
                        <option>Completed</option>
                    </select>
                    <h2>Currently Selected: {status}</h2>
                    <br />
                    <h1>Notes:</h1>
                    <input 
                        value={notes}
                        onChange={(e)=>setNotes(e.target.value)}
                        placeholder="Enter Notes here..."
                    />
                    <br />
                    <div className="flex pt-3">
                        <button
                            className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                            onClick={()=>setEditing(true)}
                        >
                            Save Updates
                        </button>
                        <button
                            className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                            onClick={()=>setEditing(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>:
                <div>
                    <h1>Status:</h1>
                    <h2>{status}</h2>
                    <br />
                    <h1>Notes:</h1>
                    <h2>{notes}</h2>
                    <br />
                    <button
                        className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                        onClick={()=>setEditing(true)}
                    >
                        Edit
                    </button>
                </div>
            }
        </div>
    )
}

export default EditRequest;