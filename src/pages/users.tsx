import { useSession, signIn, signOut } from "next-auth/react";
import SetupButton from "../components/SetupButton";
import User from "../components/User";
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

const UsersDashboard = () => {
    const {data: session, status } = useSession();

    const { data: users } = trpc.user.getAll.useQuery();
    const { data: setup } = trpc.user.isSetup.useQuery();

    if(status === "loading"){
        return <p>Loading...</p>
    }

    if(session){
        if(!session.user || session.user?.permissions < 2){
            return(
                <div>
                    <h1>Not Authorized!</h1>
                    <hr />
                    <p>Signed in as {session.user?.name}</p>
                    <p>have permission {session.user?.permissions}</p>
                    <br />
                    {
                        setup?
                        null:<SetupButton />
                    }
                </div>
            )
        } else {
            console.log(users)
            return (
                <div>
                    <p>Signed in as {session.user?.name}</p>
                    <p>have permission {session.user?.permissions}</p>
                    <hr />
                    {
                        users?
                        users.map((user, index)=>{
                            return <User id={user.id} name={user.name} image={user.image} permissions={user.permissions} />
                        })
                        :null
                    }
                </div>
            )
        }
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

export default UsersDashboard;