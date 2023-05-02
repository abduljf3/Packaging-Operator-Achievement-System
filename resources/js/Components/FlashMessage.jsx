export default function FlashMessage({ message = "", className }) {
    return (
        <div
            className={`flex w-full py-2 bg-green-500 text-white ${className}`}
        >
            {message}
        </div>
    );
}
