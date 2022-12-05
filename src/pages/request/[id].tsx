import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router"
import { useState } from "react";
import EditRequest from "../../components/EditRequest";
import { trpc } from "../../utils/trpc";

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

    if(session){
        if(!session.user || session.user?.permissions < 1){
            return(
                <div>
                    <h1>Not Authorized!</h1>
                    <hr />
                    <p>Signed in as {session.user?.name}</p>
                    <p>have permission {session.user?.permissions}</p>
                </div>
            )
        } else {
            return (
                <div>
                    <p>Signed in as {session.user?.name}</p>
                    <p>have permission {session.user?.permissions}</p>
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