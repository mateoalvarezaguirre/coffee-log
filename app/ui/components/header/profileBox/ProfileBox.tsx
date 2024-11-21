import React from 'react';

const ProfileBox: React.FC = () => {
    return (
        <div className="flex items-center p-4 bg-white shadow rounded-lg">
            <img
                className="w-12 h-12 rounded-full"
                src="https://via.placeholder.com/150"
                alt="Profile"
            />
            <div className="ml-4">
                <h2 className="text-lg font-semibold">John Doe</h2>
                <p className="text-gray-600">johndoe@example.com</p>
            </div>
        </div>
    );
};

export default ProfileBox;