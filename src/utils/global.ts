export const formatDate = (closingDate: Date) => {
	const diff = closingDate.getTime() - new Date().getTime();

	const days = Math.floor(diff / (1000 * 60 * 60 * 24));
	const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
	const seconds = Math.floor((diff % (1000 * 60)) / 1000);

	// add leading zeros if needed
	const daysStr = days < 10 ? `0${days}` : days;
	const hoursStr = hours < 10 ? `0${hours}` : hours;
	const minutesStr = minutes < 10 ? `0${minutes}` : minutes;
	const secondsStr = seconds < 10 ? `0${seconds}` : seconds;

	return `${daysStr}d : ${hoursStr}h : ${minutesStr}m : ${secondsStr}s`;
};

export const formatPrice = (price: number) => {
	const eth = price / 1000000000000000000;
	return `${eth.toFixed(2)}ETH`;
};
