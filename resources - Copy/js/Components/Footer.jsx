export default function Footer({ props }) {
    return (
        <footer className="py-5 border bg-footer border-t-neutral-400">
            <span class="flex items-center px-3 py-2 font-bold leading-snug text-navbar">
                © 2023.
                <a
                    target="_blank"
                    href="https://www.arai-net.com/english/about/"
                    class="hover:text-red-500 duration-500"
                >
                    PT.Arai Rubber Seal Indonesia™
                </a>
                . All Rights Reserved.
            </span>
        </footer>
    );
}
