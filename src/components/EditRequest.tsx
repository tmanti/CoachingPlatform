import { useRouter } from "next/router";
import { useState } from "react";
import { trpc } from "../utils/trpc";

interface EditRequestProps {
    id: string,
}

const EditRequest = ()=>{
    const router = useRouter();

    const {data:request} = trpc.request.viewRequest.useQuery({
        id:router.query.id as string
    })

    const [error, setError] = useState("");

    return (
        <div>
            <h1>Request</h1>
            <h2>Transaction ID: {request?.transaction_id}</h2>
            <br />
            <h1>Account Details:</h1>
            <h2>{request?.account_name}</h2>
            <h2>{request?.account_pass}</h2>
            <br />
            <h2>From Rank {request?.start_rank} to {request?.desired_rank}</h2>
            <br />
            <h1>Status</h1>
            <h2>{request?.status}</h2>
            <br />
            <h1>Notes</h1>
            <h2>{request?.notes}</h2>
        </div>
    )
}

export default EditRequest;