import { trpc } from "../utils/trpc";

import { useState } from "react";

import { randomFillSync } from "crypto";

import { useRouter } from 'next/router'

interface intakeFormProps {
    result: any
}

type Form = {
    transaction_id: string,
    start_rank: number,
    desired_rank: number,

    account_name:string,
    account_pass:string,
}

const generatePassword = (
    length = 20,
    wishlist = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@-#$'
  ):string =>{
    const buf = Buffer.alloc(length);
      return Array.from(randomFillSync(buf))
        .map((x) => wishlist[x % wishlist.length])
        .join('')
  }

const IntakeForm = (props:intakeFormProps) => {

    //console.log(props);
    const router = useRouter()

    const [loading, setLoading] = useState(false);

    const [ form, setForm ] = useState<Form>({
        transaction_id:props.result?.session?.id,
        start_rank: props.result?.start_rank,
        desired_rank: props.result?.desired_rank,

        account_name:"",
        account_pass:generatePassword(),
    })

    const handleSubmit:React.FormEventHandler<HTMLFormElement> =  (e) =>{
        e.preventDefault();
        setLoading(true);
    
        //get input from forms
        transaction.mutate({
            ...form
        })
    }

    const transaction = trpc.transaction.completeTransaction.useMutation({
        onSuccess: (data)=>{
            //move to next page after mutate
            if(data){
                router.push("/view/"+data);
            }
        }
    });

    return (
        <div>
            <h2>from rank: { props.result?.start_rank } to rank: { props.result?.desired_rank }</h2>
            
            <form
                onSubmit={handleSubmit}
            >
                <div>
                    <span>Username:</span>
                    <input 
                        type="text" 
                        name="username"
                        value={form.account_name}
                        placeholder="your riot account login..."
                        onChange={(e)=>setForm({...form, account_name:e.target.value})}
                    />
                </div>
                <br/>
                <div>
                    <span>Password</span>
                    <input 
                        type="text" 
                        name="password"
                        value={form.account_pass}
                        placeholder="your riot account password..."
                        onChange={(e)=>setForm({...form, account_pass: e.target.value})}
                    />
                    <input
                        type="button"
                        value="Random"
                        //className="px-4 py-2 ml-2 transition-colors duration-300 border-2 rounded-md cursor-pointer border-t-pink border-opacity-80 hover:bg-t-pink hover:bg-opacity-30 hover:text-white"
                        onClick={() => {
                            const pass = generatePassword();

                            setForm({
                                ...form,
                                account_pass:pass,
                            });
                        }}
                    />
                </div>
                
                <input
                    type="submit"
                    value={transaction.status === "loading" ? "Creating" : "Create"}
                    disabled={loading}
                />
            </form>
        </div>
    )
    
}

export default IntakeForm;