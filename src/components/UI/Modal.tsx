import { type ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export type ModalHandle = {
	open: () => void;
	close: () => void;
};

type ModalProps = {
	children: ReactNode;
	className: string;
	onClose: () => void;
	open: boolean;
};

export default function Modal({
	children,
	open,
	onClose,
	className,
}: ModalProps) {
	const dialog = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		const modal = dialog.current;

		if (open) {
			modal?.showModal();
		}

		return () => modal?.close();
	}, [open]);

	return createPortal(
		<dialog
			ref={dialog}
			id='modal'
			onClose={onClose}
			className={`modal ${className}`}>
			{children}
		</dialog>,
		document.getElementById('modal')!
	);
}
