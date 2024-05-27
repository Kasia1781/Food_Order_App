import { forwardRef, type ReactNode, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';

export type ModalHandle = {
	open: () => void;
	close: () => void;
};

type ModalProps = {
	children: ReactNode;
	className: string;
	onClose: () => void;
};

const Modal = forwardRef<ModalHandle, ModalProps>(function Modal(
	{ children, onClose, className },
	ref
) {
	const dialog = useRef<HTMLDialogElement>(null);

	useImperativeHandle(ref, () => {
		return {
			open: () => {
				if (dialog.current) {
					dialog.current.showModal();
				}
			},
			close: () => {
				if (dialog.current) {
					dialog.current.close();
				}
			},
		};
	});

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
});

export default Modal;
