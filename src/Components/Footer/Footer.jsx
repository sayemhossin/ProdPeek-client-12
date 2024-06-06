import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
const Footer = () => {
    return (
        <footer className="px-4  divide-y dark:bg-gray-700 dark:text-blue-300">
        <div className="container flex flex-col justify-between py-10 mx-auto space-y-8 lg:flex-row lg:space-y-0">
            <div className="lg:w-1/3">
                <a rel="noopener noreferrer" href="#" className="flex justify-center space-x-3 lg:justify-start">
                    <div className="flex items-center justify-center w-14 h-12 rounded-full ">
                       {/* <img src={logo} alt="" /> */}
                    </div>
                    <span className="self-center text-5xl font-semibold">ProdPeek</span>
                </a>
            </div>
            <div className="grid grid-cols-2 text-sm gap-x-3 gap-y-8 lg:w-2/3 sm:grid-cols-4">
                <div className="space-y-3">
                    <h3 className="tracking-wide uppercase dark:text-blue-300">Product</h3>
                    <ul className="space-y-1">
                        <li>
                            <a rel="noopener noreferrer" href="#">Features</a>
                        </li>
                        <li>
                            <a rel="noopener noreferrer" href="#">Integrations</a>
                        </li>
                        <li>
                            <a rel="noopener noreferrer" href="#">Pricing</a>
                        </li>
                        <li>
                            <a rel="noopener noreferrer" href="#">FAQ</a>
                        </li>
                    </ul>
                </div>
                <div className="space-y-3">
                    <h3 className="tracking-wide uppercase dark:text-blue-300">Company</h3>
                    <ul className="space-y-1">
                        <li>
                            <a rel="noopener noreferrer" href="#">Privacy</a>
                        </li>
                        <li>
                            <a rel="noopener noreferrer" href="#">Terms of Service</a>
                        </li>
                    </ul>
                </div>
                <div className="space-y-3">
                    <h3 className="uppercase dark:text-blue-300">Developers</h3>
                    <ul className="space-y-1">
                        <li>
                            <a rel="noopener noreferrer" href="#">Public API</a>
                        </li>
                        <li>
                            <a rel="noopener noreferrer" href="#">Documentation</a>
                        </li>
                        <li>
                            <a rel="noopener noreferrer" href="#">Guides</a>
                        </li>
                    </ul>
                </div>
                <div className="space-y-3">
                    <div className="uppercase dark:text-blue-300">Social media</div>
                    <div className="flex justify-start space-x-3">
                        <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/sayem.hossin.982" title="Facebook" className="flex items-center p-1">
                            <FaFacebook className="text-xl"/>
                        </a>
                        <a target="_blank" rel="noopener noreferrer" href="#" title="Twitter" className="flex items-center p-1">
                           <FaLinkedin className="text-xl"></FaLinkedin>
                        </a>
                        <a target="_blank" rel="noopener noreferrer" href="https://x.com/Sayem112233?t=5Xsu6d_2JSP0uPIvYmIOdA&s=07" title="Instagram" className="flex items-center p-1">
                            <FaTwitter className="text-xl"/>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div className="py-6 text-sm text-center dark:text-blue-300">© 2024 ProdPeek Web. / All rights reserved.</div>
    </footer>
    );
};

export default Footer;