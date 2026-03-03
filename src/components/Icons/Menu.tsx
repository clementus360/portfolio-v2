export default function Menu({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            className={`${className}`}
        >
            <path d="M4 24V21.3333H28V24H4ZM4 17.3333V14.6667H28V17.3333H4ZM4 10.6667V8H28V10.6667H4Z" fill="currentColor" />
        </svg>

    );
}
