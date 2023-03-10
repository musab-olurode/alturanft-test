import React, { useState } from 'react';
import NftItemCard from '../components/NftItemCard';
import { useCollection } from '../hooks/use-collection';
import '../styles/App.css';
import { Order } from '../types/global';
import NftDetailsModal from '../components/NftDetailsModal';

const OWNER = {
	address: '0xaa1b189a2af31a2ce6cc20be08b39b7319b338d9',
	avatar:
		'https://i.seadn.io/gcs/files/4001dbbb58110c5ff24a9cae67a75526.jpg?auto=format&w=256',
	name: 'THUNDERZ',
};

function App() {
	const { collection, isError, isLoading } = useCollection(OWNER.address);
	const [selectedNft, setSelectedNft] = useState<Order>();

	const handleOnNftClick = (order: Order) => {
		setSelectedNft(order);
	};

	const handleOnCloseModal = () => {
		setSelectedNft(undefined);
	};

	return (
		<>
			<section className='container py-5'>
				<div className='flex gap-x-8'>
					<div className='flex gap-x-2 items-center border border-primary py-2 px-4'>
						<img
							className='object-cover w-8 h-8'
							src={OWNER.avatar}
							alt={OWNER.name}
						/>
						<span className='font-bold'>{OWNER.name}</span>
						<button type='button' className='cursor-not-allowed'>
							<div className='sr-only'>Clear all</div>
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
					<button
						type='button'
						className='text-primary font-bold cursor-not-allowed'
					>
						Clear all
					</button>
				</div>

				<div className='grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 mt-5 gap-6'>
					{isLoading || isError || !collection?.orders
						? new Array(20)
								.fill(0)
								.map((_, index) => (
									<NftItemCard
										loading={true}
										onCardClick={() => {}}
										name={''}
										image={''}
										ownerName={''}
										closingDate={new Date()}
										price={0}
										key={index}
									/>
								))
						: collection?.orders?.map((order, index) => (
								<NftItemCard
									loading={false}
									onCardClick={() => handleOnNftClick(order)}
									name={
										order.maker_asset_bundle.assets[0].name ||
										`${order.maker_asset_bundle.assets[0].asset_contract.name} #${order.maker_asset_bundle.assets[0].token_id}`
									}
									image={order.maker_asset_bundle.assets[0].image_url}
									ownerName={OWNER.name}
									closingDate={new Date(order.closing_date)}
									price={order.current_price}
									key={index}
								/>
						  ))}
				</div>
			</section>

			<NftDetailsModal
				shouldShow={!!selectedNft}
				closingDate={new Date(selectedNft?.closing_date || new Date())}
				description={
					selectedNft?.maker_asset_bundle.assets[0].description ||
					selectedNft?.maker_asset_bundle.assets[0].asset_contract
						.description ||
					''
				}
				image={selectedNft?.maker_asset_bundle.assets[0].image_url || ''}
				name={
					selectedNft?.maker_asset_bundle.assets[0].name ||
					`${selectedNft?.maker_asset_bundle.assets[0].asset_contract.name} #${selectedNft?.maker_asset_bundle.assets[0].token_id}` ||
					''
				}
				onClose={handleOnCloseModal}
				openSeaLink={selectedNft?.maker_asset_bundle.assets[0].permalink || ''}
				ownerAddress={OWNER.address}
				ownerName={OWNER.name}
				price={selectedNft?.current_price || 0}
			/>
		</>
	);
}

export default App;
