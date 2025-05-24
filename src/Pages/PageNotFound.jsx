import React from "react";

const PageNotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <img
                src="/path-to-your-image.jpg"
                alt="Page Not Found"
                className="w-1/2 max-w-md mb-8"
            />
            <h1 className="text-2xl font-bold text-gray-800">Page Not Found</h1>
            <p className="text-gray-600 mt-4">
                Sorry, the page you are looking for does not exist.
            </p>
        </div>
    );
};

export default PageNotFound;