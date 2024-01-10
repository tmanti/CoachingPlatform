import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react';

import useSWR from 'swr';
import IntakeForm from '../components/IntakeForm';

import { fetchGetJSON } from '../utils/api-utils';

const ResultPage: NextPage = () => {
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    // Fetch CheckoutSession from static page via
    // https://nextjs.org/docs/basic-features/data-fetching#static-generation
    const { data, error } = useSWR(
        router.query.session_id
            ? `/api/stripe-session/${router.query.session_id}`
            : null,
        fetchGetJSON
    )

    if (error) return <div>failed to load</div>;

    return (
        <div className="page-container">
            <h1>Checkout Payment Result</h1>
            <h2>Status: {data?.session?.payment_intent?.status ?? 'loading...'}</h2>
            <h3></h3>
            {
                data?.session?.payment_intent?.status === "succeeded" ?
                    <IntakeForm result={data}/>
                    : <h2>loading...</h2>
                /*on successful completion get completion form.*/
            }
        </div>
    )
}

export default ResultPage;
