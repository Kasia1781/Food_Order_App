type ErrorProps = {
	title: string;
	message: string;
};

export default function Error({ title, message }: ErrorProps) {
	return (
		<div>
			<h2>{title}</h2>
			<p>{message}</p>
		</div>
	);
}
