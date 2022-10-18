import { NextPage } from 'next'
import { useRouter } from 'next/router'

import useSWR from 'swr';

import { fetchGetJSON } from '../utils/api-utils';

const ResultPage : NextPage = () =>{
    const router = useRouter();

    // Fetch CheckoutSession from static page via
    // https://nextjs.org/docs/basic-features/data-fetching#static-generation
    const { data, error } = useSWR(
        router.query.session_id
        ? `/api/stripe-session/${router.query.session_id}`
        : null,
        fetchGetJSON
    )

    if (error) return <div>failed to load</div>


    return (
    <div className="page-container">
        <h1>Checkout Payment Result</h1>
        <h2>Status: {data?.payment_intent?.status ?? 'loading...'}</h2>
        <h3></h3>
        { /*on successful completion get completion form. and trpc this shit*/  }        
      </div>
    )
}

export default ResultPage;