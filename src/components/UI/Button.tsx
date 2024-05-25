import { type ReactNode } from 'react';

type ButtonProps = {
	children: ReactNode;
	textOnly?: boolean;
	cssClasses?: string;
};

export default function Button({
	children,
	textOnly,
	cssClasses,
	...props
}: ButtonProps) {
	const baseClasses = textOnly ? 'text-button' : 'button';
	const finalClasses = `${baseClasses} ${cssClasses}`;

	return (
		<button className={finalClasses} {...props}>
			{children}
		</button>
	);
}
