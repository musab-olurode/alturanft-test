import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { formatDate, formatPrice } from '../utils/global';

interface NftDetailsModalProps {
	shouldShow: boolean;
	onClose: () => void;
	name: string;
	description: string;
	ownerName: string;
	ownerAddress: string;
	openSeaLink: string;
	price: number;
	image: string;
	closingDate: Date;
}

const NftDetailsModal = (props: NftDetailsModalProps) => {
	const [formattedDate, setFormattedDate] = useState(
		formatDate(props.closingDate)
	);

	useEffect(() => {
		const interval = setInterval(() => {
			setFormattedDate(formatDate(props.closingDate));
		}, 1000);

		if (props.closingDate <= new Date()) {
			clearInterval(interval);
		}

		return () => {
			clearInterval(interval);
		};
	}, [props]);

	return (
		<div
			className={clsx(
				'h-screen w-screen fixed z-10 bg-secondary bg-opacity-70 flex justify-center items-center overscroll-contain',
				props.shouldShow ? 'top-0' : '-top-full'
			)}
		>
			<div className='bg-white border border-primary w-[95%] max-h-[90%] md:max-w-[34rem] p-5 flex flex-col overscroll-contain'>
				<div className='flex justify-between pb-5'>
					<span className='font-bold text-primary'>{props.name}</span>
					<div className='flex gap-x-5'>
						<span className='text-secondary'>@{props.ownerName}</span>
						<button type='button' className='' onClick={props.onClose}>
							<div className='sr-only'>Close</div>
							<svg
								focusable='false'
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth={1.5}
								stroke='currentColor'
								className='w-6 h-6'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M6 18L18 6M6 6l12 12'
								/>
							</svg>
						</button>
					</div>
				</div>
				<img
					className='mx-auto mb-4 h-[31.25rem] object-contain'
					src={props.image}
					alt={props.name}
				/>
				<div className='flex justify-between'>
					<div className='flex flex-col'>
						<span className='font-bold text-primary'>{formattedDate}</span>
						<span className='text-secondary'>Remaining Time</span>
					</div>
					<div className='flex flex-col'>
						<span className='font-black text-primary'>
							{formatPrice(props.price)}
						</span>
						<span className='text-secondary'>Price</span>
					</div>
				</div>
				<div className='flex-grow h-full overflow-auto my-2'>
					<p className='text-gray-500 font-bold mb-4'>
						<span className='text-primary'>Description:</span>{' '}
						{props.description}
					</p>
					<p className='text-gray-500 font-bold break-words'>
						<span className='text-primary'>Owner Address:</span>{' '}
						{props.ownerAddress}
					</p>
				</div>

				<a
					href={props.openSeaLink}
					target='_blank'
					rel='noreferrer'
					title='Purchase'
					className='block text-center bg-tertiary py-2 px-4 text-white'
				>
					Purchase
				</a>
			</div>
		</div>
	);
};

export default NftDetailsModal;
