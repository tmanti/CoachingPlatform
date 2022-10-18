import { trpc } from "../utils/trpc";

import { useState } from "react";

interface intakeFormProps {
    stripeResult: object
}

const IntakeForm = (props:intakeFormProps) => {
    const [loading, setLoading] = useState(false);

    const transaction = trpc.transaction.completeTransaction.useMutation({
        onMutate: ()=>{
            //move to next page after mutate
        }
    });
    

    const handleSubmit:React.FormEventHandler<HTMLFormElement> =  (e) =>{
        e.preventDefault();
        setLoading(true);
    
        //get input from forms
        /*transaction.mutate({

        })*/
    }

    return (
        <>
        </>
    )
    
}

export default IntakeForm;