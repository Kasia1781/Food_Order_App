import { type ReactNode } from 'react';

type ButtonProps = {
	children: ReactNode;
	textOnly?: boolean;
	cssClasses?: string;
	onClick: () => void;
};

export default function Button({
	children,
	textOnly,
	cssClasses,
	onClick,
	...props
}: ButtonProps) {
	const baseClasses = textOnly ? 'text-button' : 'button';
	const finalClasses = `${baseClasses} ${cssClasses}`;

	return (
		<button onClick={onClick} className={finalClasses} {...props}>
			{children}
		</button>
	);
}
