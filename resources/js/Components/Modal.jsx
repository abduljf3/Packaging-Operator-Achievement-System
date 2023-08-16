import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

export default function Modal({
    children,
    title,
    show = false,
    maxWidth = '2xl',
    closeable = true,
    onClose = () => {},
    onSubmit = () => {},
    submitLabel = 'Submit',
    submitDisabled = false,
    onCancel = () => {},
    cancelLabel = 'Cancel',
    cancelDisabled = false,
}) {
    const close = () => {
        if (closeable) {
            onClose();
        }
    };

    const maxWidthClass = {
        sm: 'sm:max-w-sm',
        md: 'sm:max-w-md',
        lg: 'sm:max-w-lg',
        xl: 'sm:max-w-xl',
        '2xl': 'sm:max-w-2xl',
        '4xl': 'sm:max-w-4xl',
        '6xl': 'sm:max-w-6xl',
    }[maxWidth];

    return (
        <Transition show={show} as={Fragment} leave="duration-200">
            <Dialog
                as="div"
                id="modal"
                className="fixed inset-0 flex overflow-y-auto px-4 py-6 sm:px-0 items-center z-50 transform transition-all"
                onClose={close}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="absolute inset-0 bg-gray-800/75" />
                </Transition.Child>

                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                    <Dialog.Panel
                        className={`mb-6 bg-white rounded-lg shadow-xl transform transition-all w-full sm:mx-auto ${maxWidthClass}`}
                    >
                        <div className="flex justify-between px-4 py-2 bg-gray-300 rounded-t-lg">
                            <Dialog.Title className="text-lg font-medium text-gray-900">{title}</Dialog.Title>
                            {closeable && (
                                <button className="focus:outline-none" onClick={onClose}>
                                    <svg
                                        className="w-6 h-6 text-gray-600 hover:text-gray-800"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            )}
                        </div>
                        <div className="">{children}</div>
                        
                    </Dialog.Panel>
                </Transition.Child>
            </Dialog>
        </Transition>
    );
}