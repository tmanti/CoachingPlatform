import { useSession, signIn, signOut } from "next-auth/react";
import { trpc } from "../utils/trpc";

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
    const {data: session, status } = useSession();

    const { data: requests } = trpc.request.getAll.useQuery(null);

    if(status === "loading"){
        return <p>Loading...</p>
    }

    if(session){
        console.log(session.user);
        //TODO: figure out how the fuck im going to do roles (either query or not)
        return (
            <>
                <div>
                    <p>- Signed in as {session.user?.name}</p>
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
                <p className="w-2/3 pt-1.5 text-sm text-slate-300">
                    Log in with Discord to view the dashboard.
                </p>
            </div>            
        </>
    )
}

export default Dashboard;