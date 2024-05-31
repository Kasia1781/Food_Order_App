import { ComponentPropsWithoutRef } from 'react';

type InputProps = {
	label: string;
	id: string;
} & ComponentPropsWithoutRef<'input'>;

export default function Input({ label, id, ...props }: InputProps) {
	return (
		<p className='control'>
			<label htmlFor={id}>{label}</label>
			<input id={id} name={id} required {...props} />
		</p>
	);
}
