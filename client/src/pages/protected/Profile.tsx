import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { usePasswordResetMutation } from "../../redux/api/userApi";

interface EditField {
  name: boolean;
  email: boolean;
}

function Profile() {
  const [resetPassword,{isLoading:isResetPasswordLoading}] =  usePasswordResetMutation();
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const [editField, setEditField] = useState<EditField>({
    name: false,
    email: false,
  });
  const [editedValues, setEditedValues] = useState({
    name: userInfo?.name || "",
    email: userInfo?.email || "",
  });
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [avatarInitial, setAvatarInitial] = useState(
    userInfo?.name?.charAt(0).toUpperCase() || "U",
  );

  const handleEdit = (field: keyof EditField) => {
    setEditField((prev) => ({ ...prev, [field]: true }));
    setEditedValues((prev) => ({ ...prev, [field]: userInfo?.[field] || "" }));
  };

  const handleCancel = (field: keyof EditField) => {
    setEditField((prev) => ({ ...prev, [field]: false }));
    setEditedValues((prev) => ({ ...prev, [field]: userInfo?.[field] || "" }));
  };

  const handleSave = (field: keyof EditField) => {
    console.log(`Profile update - ${field}:`, editedValues[field]);
    setEditField((prev) => ({ ...prev, [field]: false }));
    if (field === "name") {
      setAvatarInitial(editedValues.name.charAt(0).toUpperCase());
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    setPasswordError("");
    if (
      passwordData.currentPassword &&
      passwordData.newPassword &&
      passwordData.confirmPassword
    ) {
      try {
        const sendingData = {
          currentPassword: passwordData.currentPassword.toString(),
          newPassword: passwordData.newPassword.toString(),
          confirmPassword: passwordData.confirmPassword.toString(),
        };

        console.log(sendingData);

        const passwordResetResponse = await resetPassword(sendingData);
        console.log(passwordResetResponse);
      } catch (error) {
        console.log(error);
      }
    }
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setShowPasswordModal(false);
  };

  return (
    <div className="bg-[#1a2332] rounded-lg p-3 md:p-6 border border-gray-800">
      <div className="flex items-center justify-between">
        <h3 className="text-lg md:text-xl font-bold text-white">Profile</h3>
        <button
          onClick={() => setShowPasswordModal(true)}
          className="text-xs cursor-pointer md:text-sm px-3 py-1.5 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors duration-200"
        >
          Change Password
        </button>
      </div>

      <div className="mt-6 flex flex-col md:flex-row gap-6">
        {/* Avatar Section */}
        <div className="flex-shrink-0">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
            <span className="text-3xl md:text-4xl font-bold text-white">
              {avatarInitial}
            </span>
          </div>
        </div>

        {/* Info Section */}
        <div className="flex-1 space-y-4">
          {/* Name Field */}
          <div className="group">
            <label className="block text-xs font-medium text-gray-400 mb-1">
              Full Name
            </label>
            {editField.name ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={editedValues.name}
                  onChange={(e) =>
                    setEditedValues((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  className="flex-1 px-3 py-2 bg-[#0f1623] border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  autoFocus
                />
                <button
                  onClick={() => handleSave("name")}
                  className="p-2 bg-orange-600 hover:bg-orange-700 rounded-lg transition-colors duration-200"
                  title="Save"
                >
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => handleCancel("name")}
                  className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors duration-200"
                  title="Cancel"
                >
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="flex items-center  group/item">
                <p className="text-white font-medium">{userInfo?.name}</p>
                <button
                  onClick={() => handleEdit("name")}
                  className=" group-hover/item:opacity-100 p-1.5 text-white cursor-pointer rounded-lg transition-all duration-200"
                  title="Edit name"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>

          {/* Email Field */}
          <div className="group">
            <label className="block text-xs font-medium text-gray-400 mb-1">
              Email Address
            </label>
            {editField.email ? (
              <div className="flex items-center gap-2">
                <input
                  type="email"
                  value={editedValues.email}
                  onChange={(e) =>
                    setEditedValues((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  className="flex-1 px-3 py-2 bg-[#0f1623] border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  autoFocus
                />
                <button
                  onClick={() => handleSave("email")}
                  className="p-2 bg-orange-600 hover:bg-orange-700 rounded-lg transition-colors duration-200"
                  title="Save"
                >
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => handleCancel("email")}
                  className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors duration-200"
                  title="Cancel"
                >
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="flex items-center group/item">
                <p className="text-white font-medium">{userInfo?.email}</p>
                <button
                  onClick={() => handleEdit("email")}
                  className="group-hover/item:opacity-100 p-1.5 text-white cursor-pointer rounded-lg transition-all duration-200"
                  title="Edit email"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a2332] rounded-xl border border-gray-700 w-full max-w-md shadow-2xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-xl font-bold text-white">
                  Change Password
                </h4>
                <button
                  onClick={() => {
                    setShowPasswordModal(false);
                    setPasswordData({
                      currentPassword: "",
                      newPassword: "",
                      confirmPassword: "",
                    });
                    setPasswordError("");
                  }}
                  className="p-1 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) =>
                      setPasswordData((prev) => ({
                        ...prev,
                        currentPassword: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 bg-[#0f1623] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => {
                      setPasswordData((prev) => ({
                        ...prev,
                        newPassword: e.target.value,
                      }));
                      setPasswordError("");
                    }}
                    className="w-full px-4 py-3 bg-[#0f1623] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => {
                      setPasswordData((prev) => ({
                        ...prev,
                        confirmPassword: e.target.value,
                      }));
                      setPasswordError("");
                    }}
                    className={`w-full px-4 py-3 bg-[#0f1623] border rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-blue-500 ${passwordError ? "border-red-500 focus:border-red-500" : "border-gray-700 focus:border-blue-500"}`}
                    required
                  />
                  {passwordError && (
                    <p className="mt-2 text-sm text-red-500">{passwordError}</p>
                  )}
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowPasswordModal(false);
                      setPasswordData({
                        currentPassword: "",
                        newPassword: "",
                        confirmPassword: "",
                      });
                      setPasswordError("");
                    }}
                    className="flex-1 px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="cursor-pointer flex-1 px-4 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors duration-200"
                  >
                    {isResetPasswordLoading ? "Updating..." : "Update Password"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
