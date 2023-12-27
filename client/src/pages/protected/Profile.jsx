/* eslint-disable @typescript-eslint/no-explicit */
// UserProfile.jsx
import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import Loading from '../../component/loading';

const UserProfile = () => {
  // State to control the edit mode
  const [isEditing, setIsEditing] = useState(false);
  const { user, updateUser } = useAuth();
  const [currentEditUser, setCurrentEditUser] = useState(
    user || {
      email: '',
      firstName: '',
      lastName: '',
      image: '',
    }
  );
  const [currentError, setCurrentError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!user) {
    return <Loading />;
  }

  // Function to handle changes in user details
  const handleChange = (e) => {
    const { name, value } = e.target;

    setCurrentEditUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // Function to handle the edit mode toggle
  const handleEditToggle = () => {
    setIsEditing((prevIsEditing) => !prevIsEditing);
  };

  // Function to handle the form submission in edit mode
  const handleSave = async (e) => {
    e.preventDefault();
    if (!currentEditUser.firstName) {
      setCurrentError('First name cannot be empty');
      return;
    }
    if (!currentEditUser.lastName) {
      setCurrentError('First name cannot be empty');
      return;
    }
    setCurrentError('');
    setLoading(true);
    const result = await updateUser({
      firstName: currentEditUser.firstName,
      lastName: currentEditUser.lastName,
      image: currentEditUser.image,
    });
    if (result) {
      setIsEditing(false);
    }
    setLoading(false);
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-8 text-orange-500">User Profile</h1>

      <div className="bg-white flex flex-col md:flex-row items-center">
        <div className="md:w-1/3 mb-4 md:mb-0">
          <img
            src={user.image}
            alt="Profile"
            className="rounded-full w-32 h-32 object-cover mx-auto mb-4 md:mb-0"
          />
        </div>

        <div className="md:w-2/3 md:ml-8">
          {!isEditing ? (
            <div>
              <p className="text-gray-700">
                <strong>First Name:</strong> {user.firstName}
              </p>
              <p className="text-gray-700">
                <strong>Last Name:</strong> {user.lastName}
              </p>
              <p className="text-gray-700">
                <strong>Email:</strong> {user.email}
              </p>
              {/* Add more user details as needed */}
              <button
                className="bg-orange-500 text-white px-4 py-2 rounded-md mt-4"
                onClick={handleEditToggle}
              >
                Edit Profile
              </button>
            </div>
          ) : (
            <form onSubmit={handleSave}>
              <h2 className="text-xl font-bold mb-4 text-gray-800">
                Edit Profile
              </h2>
              <label className="block mb-2" htmlFor="firstName">
                First Name:
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={currentEditUser.firstName}
                  onChange={handleChange}
                  className="border rounded-md p-2 w-full"
                />
              </label>
              <label className="block mb-2" htmlFor="lastName">
                Last Name:
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={currentEditUser.lastName}
                  onChange={handleChange}
                  className="border rounded-md p-2 w-full"
                />
              </label>

              {/* Add more input fields for user details as needed */}
              {loading && <div>Saving...</div>}
              {currentError && (
                <div className="text-red-500">{currentError}</div>
              )}
              <div className="flex">
                <button
                  type="submit"
                  className="bg-orange-500 text-white px-4 py-2 rounded-md mt-4 mr-4"
                >
                  Save
                </button>
                <button
                  type="button"
                  className="bg-gray-400 text-white px-4 py-2 rounded-md mt-4"
                  onClick={handleEditToggle}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
