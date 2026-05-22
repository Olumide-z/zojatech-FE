
const FullPageLoader = () => {
    return (
        <div className="flex flex-col items-center justify-center md:min-h-screen min-h-svh bg-white">
            <div className="flex flex-col items-center gap-6">
                {/* NXLO Logo */}
                <div className="relative">
                    <img
                        src="/assets/logo.svg"
                        alt="Logo"
                        className="object-contain w-24 h-24"
                        loading="lazy"
                    />
                </div>

                {/* Progress Bar Loader */}
                <div className="w-48 h-1 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-primary animate-progress rounded-full" />
                </div>
            </div>

        </div>
    );
};

export default FullPageLoader;
