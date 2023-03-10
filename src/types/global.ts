export interface Collection {
	orders: Order[];
}

export interface Order {
	closing_date: string;
	current_price: number;
	maker_asset_bundle: {
		assets: MakerAssetBundleAsset[];
	};
}

export interface MakerAssetBundleAsset {
	name: string;
	description: string;
	token_id: string;
	image_url: string;
	permalink: string;
	asset_contract: {
		name: string;
		description: string;
	};
}
