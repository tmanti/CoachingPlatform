import { useSession, signIn, signOut } from "next-auth/react";
import { trpc } from "../utils/trpc";
import { useRouter } from "next/router";
import Request from "../components/Request";

const LogOutButton = () => {
    return (
      <button
        onClick={() => {
          signOut();
        }}
      >
        Log Out
      </button>
    );
  };

const Dashboard = () => {
    const router = useRouter()

    const {data: session, status } = useSession();

    const { data: requests } = trpc.request.getAll.useQuery(null);

    if(status === "loading"){
        return <p>Loading...</p>
    }

    if(session){
        if(!session.user || session.user?.permissions < 1) router.push("/")

        return (
            <>
                <div>
                    <p>Signed in as {session.user?.name}</p>
                    <p>have permission {session.user?.permissions}</p>
                    <hr />
                    <div className="px-2">
                        {
                            requests?
                            requests.map((req, index)=>{
                                return <Request id={req.id} transaction_id={req.transaction_id} account_name={req.account_name} start_rank={req.start_rank} end_rank={req.desired_rank} handler={req.handler?.name ? req.handler.name :"No Handler"} status={req.status} key={req.id} />
                            })
                            :null
                        }
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <div>
                <button onClick={()=> signIn("discord")}>
                    Log In
                </button>
                <p className="w-2/3 pt-1.5 text-sm text-black">
                    Log in with Discord to view the dashboard.
                </p>
            </div>            
        </>
    )
}

export default Dashboard;