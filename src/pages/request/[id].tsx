import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router"
import EditRequest from "../../components/EditRequest";

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

const ViewRequestPage = () => {
    const {data: session, status } = useSession();

    const router = useRouter();

    if(session){
        if(!session.user || session.user?.permissions < 1){
            return(
                <div className="flex">
                    <div>
                        <h1>Not Authorized!</h1>
                        <hr />
                        <p>Signed in as {session.user?.name}</p>
                        <p>have permission {session.user?.permissions}</p>
                    </div>
                    <button
                        className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                        onClick={()=>router.push("/dashboard")}
                    >
                        Back to Dashboard
                    </button>
                </div>
            )
        } else {
            return (
                <div>
                    <div className="flex">
                        <div>
                            <p>Signed in as {session.user?.name}</p>
                            <p>have permission {session.user?.permissions}</p>
                        </div>
                        <div className="pl-10">
                            <button
                                className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                                onClick={()=>router.push("/dashboard")}
                            >
                                Back to Dashboard
                            </button>
                        </div>
                    </div>
                    <hr />
                    <EditRequest />
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

export default ViewRequestPage;