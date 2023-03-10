import useSWR from 'swr';
import { Collection } from '../types/global';

const COLLECTION_URL =
	'https://testnets-api.opensea.io/v2/orders/goerli/seaport/listings';

const fetcher = (url: string) =>
	fetch(url, { method: 'GET', headers: { accept: 'application/json' } }).then(
		(res) => res.json()
	);

export const useCollection = (ownerAddress: string) => {
	const { data, error, isLoading } = useSWR(
		`${COLLECTION_URL}?maker=${ownerAddress}`,
		fetcher
	);

	return {
		collection: data as Collection,
		isLoading,
		isError: error,
	};
};
