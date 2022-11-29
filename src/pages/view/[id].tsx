import { useRouter } from "next/router"
import { useState } from "react";
import { trpc } from "../../utils/trpc";


const ViewPage = () => {
    const router = useRouter();

    const [error, setError] = useState("");

    const { data:transaction } = trpc.transaction.viewTransaction.useQuery({
        transaction_id:router.query.id as string,
    })

    return (
        <>
            <div>
                <div>
                    <span className="text-red-600 font-bold">{error}</span>
                </div>
                <div>
                    <label>Name:</label><span>{transaction?.account_name}</span>
                </div>
                <div>
                    <label>Start Rank: </label><span>{transaction?.start_rank}</span>
                </div>
                <div>
                    <label>Desired Rank: </label><span>{transaction?.desired_rank}</span>
                </div>
                <div>
                    <label>Status: </label><span>{transaction?.status}</span>
                </div>
                <div>
                    <label>Notes: </label><span>{transaction?.notes}</span>
                </div>              
            </div>
        </>
    )
}

export default ViewPage;