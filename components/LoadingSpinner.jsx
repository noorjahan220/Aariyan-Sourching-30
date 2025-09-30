const LoadingSpinner = () => (
<div className="min-h-screen flex justify-center items-center h-64">
            <div className="relative h-16 w-16 flex justify-center items-center">
                {/* The background circle */}
                <div className="absolute h-full w-full rounded-full border-4 border-gray-200"></div>
                {/* The moving spinner part */}
                <div className="absolute h-full w-full animate-spin rounded-full border-4 border-t-yellow-500 border-r-transparent border-b-transparent border-l-transparent"></div>
            </div>
        </div>
);

export default LoadingSpinner;



