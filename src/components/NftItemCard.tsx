import React, { useEffect, useState } from 'react';
import { formatDate, formatPrice } from '../utils/global';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import clsx from 'clsx';

interface NftItemCardProps {
	loading: boolean;
	onCardClick: () => void;
	name: string;
	ownerName: string;
	price: number;
	image: string;
	closingDate: Date;
}

const NftItemCard = (props: NftItemCardProps) => {
	const [formattedDate, setFormattedDate] = useState(
		props.loading ? '00d : 00h : 00m : 00s' : formatDate(props.closingDate)
	);

	useEffect(() => {
		const interval = setInterval(() => {
			setFormattedDate(formatDate(props.closingDate));
		}, 1000);

		if (props.closingDate <= new Date() || props.loading) {
			clearInterval(interval);
		}

		return () => {
			clearInterval(interval);
		};
	}, [props.closingDate, props.loading]);

	return (
		<div
			className={clsx(
				'border bg-white border-secondary px-4 py-4 transition-transform relative',
				props.loading
					? ''
					: 'hover:-translate-y-5 hover:-translate-x-5 hover:border-primary hover:border-2 cursor-pointer after:h-full after:w-full after:border-2 after:transition-all after:border-primary after:block after:absolute after:opacity-0 hover:after:opacity-100 after:top-0 after:right-0 hover:after:top-5 hover:after:-right-5 nft-card'
			)}
			onClick={props.onCardClick}
			title={props.loading ? '' : props.name}
		>
			<div className='flex justify-between'>
				<span className='font-bold text-primary'>
					{props.loading ? <Skeleton className='!w-20' /> : props.name}
				</span>
				<span className='text-secondary'>
					{props.loading ? (
						<Skeleton className='!w-20' />
					) : (
						`@${props.ownerName}`
					)}
				</span>
			</div>
			{props.loading ? (
				<Skeleton className='h-96 my-4' />
			) : (
				<img
					className='h-96 w-full object-cover my-4'
					src={props.image}
					alt={props.name}
				/>
			)}
			<div className='flex justify-between'>
				<div className='flex flex-col'>
					<time
						dateTime={
							props.loading
								? '0000-00-00T00:00:00.000Z'
								: props.closingDate.toISOString()
						}
						className='font-bold text-primary'
					>
						{props.loading ? <Skeleton /> : formattedDate}
					</time>
					<span className='text-secondary'>Remaining Time</span>
				</div>
				<div className='flex flex-col'>
					<span className='font-black text-primary'>
						{props.loading ? (
							<Skeleton className='!w-14' />
						) : (
							formatPrice(props.price)
						)}
					</span>
					<span className='text-secondary'>Price</span>
				</div>
			</div>
		</div>
	);
};

export default NftItemCard;
