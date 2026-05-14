const SettingsPage = () => {
    const renderTabContent = () => {
        return `
            <div id="tab-profile" class="tab-content block">
                <div class="bg-white shadow rounded-lg p-6">
                    <h3 class="text-lg font-medium leading-6 text-gray-900 mb-6">Profile Information</h3>
                    <div class="flex items-center space-x-reverse space-x-6 mb-8">
                        <div class="relative">
                            <img class="h-20 w-20 object-cover rounded-full border-4 border-indigo-100" src="../images/IMG_9641.jpg" alt="Profile">
                            <button class="absolute bottom-0 right-0 bg-indigo-600 text-white p-1 rounded-full hover:bg-indigo-700">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
                            </button>
                        </div>
                        <div>
                            <h4 class="text-xl font-bold text-gray-800">System Admin</h4>
                            <p class="text-gray-500">Senior System Administrator</p>
                        </div>
                    </div>

                    <form id="profileForm" class="space-y-6">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                <input type="text" value="System Admin"
                                    class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                <input type="email" value="admin@example.com"
                                    class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all">
                            </div>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                            <textarea rows="4"
                                class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all">Senior system administrator with over 10 years of experience in managing software infrastructures.</textarea>
                        </div>
                        <div class="flex justify-end">
                            <button type="submit" class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg shadow transition-colors">
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <div id="tab-security" class="tab-content hidden">
                <div class="bg-white shadow rounded-lg p-6">
                    <h3 class="text-lg font-medium leading-6 text-gray-900 mb-6">Security Settings</h3>
                    <div class="space-y-6">
                        <div class="border-b border-gray-200 pb-4">
                            <h4 class="text-md font-semibold text-gray-800 mb-4">Change Password</h4>
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <input type="password" placeholder="Current Password"
                                    class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none">
                                <input type="password" placeholder="New Password"
                                    class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none">
                                <input type="password" placeholder="Confirm New Password"
                                    class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none">
                            </div>
                            <div class="mt-4 flex justify-end">
                                <button class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg shadow transition-colors">
                                    Update Password
                                </button>
                            </div>
                        </div>

                        <div class="border-b border-gray-200 pb-4">
                            <h4 class="text-md font-semibold text-gray-800 mb-4">Two-Factor Authentication (2FA)</h4>
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="font-medium text-gray-800">Enable 2FA</p>
                                    <p class="text-sm text-gray-500">Enhance your account security by using SMS or an authenticator app.</p>
                                </div>
                                <label class="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" value="" class="sr-only peer">
                                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="tab-notifications" class="tab-content hidden">
                <div class="bg-white shadow rounded-lg p-6">
                    <h3 class="text-lg font-medium leading-6 text-gray-900 mb-6">Notification Settings</h3>
                    <div class="space-y-4">
                        <div class="flex items-center justify-between py-3 border-b border-gray-100">
                            <div>
                                <p class="font-medium text-gray-800">Email Notifications</p>
                                <p class="text-sm text-gray-500">Receive daily reports and system alerts via email.</p>
                            </div>
                            <label class="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" checked class="sr-only peer">
                                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                            </label>
                        </div>

                        <div class="flex items-center justify-between py-3 border-b border-gray-100">
                            <div>
                                <p class="font-medium text-gray-800">Browser Notifications</p>
                                <p class="text-sm text-gray-500">Show desktop notifications for important events.</p>
                            </div>
                            <label class="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" checked class="sr-only peer">
                                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                            </label>
                        </div>

                        <div class="flex items-center justify-between py-3">
                            <div>
                                <p class="font-medium text-gray-800">Weekly Newsletter</p>
                                <p class="text-sm text-gray-500">Receive a weekly performance summary.</p>
                            </div>
                            <label class="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" class="sr-only peer">
                                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <div id="tab-advanced" class="tab-content hidden">
                <div class="bg-white shadow rounded-lg p-6">
                    <h3 class="text-lg font-medium leading-6 text-gray-900 mb-6 text-red-600">Advanced Settings</h3>
                    <div class="space-y-6">
                        <div class="p-4 bg-red-50 border border-red-200 rounded-lg">
                            <h4 class="text-md font-semibold text-red-800 mb-2">Data Management</h4>
                            <p class="text-sm text-red-600 mb-4">This action is irreversible. All data stored in local storage will be deleted.</p>
                            <button id="clearDataBtn" class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm transition-colors">
                                Clear All Local Data
                            </button>
                        </div>

                        <div class="border-t border-gray-200 pt-6">
                            <h4 class="text-md font-semibold text-gray-800 mb-4">Language & Region</h4>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">System Language</label>
                                    <select class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none">
                                        <option value="fa">Persian (فارسی)</option>
                                        <option value="en" selected>English</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                                    <select class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none">
                                        <option value="iran">Tehran (GMT+3:30)</option>
                                        <option value="utc" selected>GMT+0</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    };

    const tabs = [
        { id: 'profile', label: 'Profile', icon: 'fa-user' },
        { id: 'security', label: 'Security', icon: 'fa-lock' },
        { id: 'notifications', label: 'Notifications', icon: 'fa-bell' },
        { id: 'advanced', label: 'Advanced', icon: 'fa-cogs' },
    ];

    const renderTabs = () => {
        return `
            <div class="bg-white shadow rounded-lg overflow-hidden">
                <div class="border-b border-gray-200">
                    <nav class="flex -mb-px">
                        ${tabs.map(tab => `
                            <button onclick="switchTab('${tab.id}')"
                                class="tab-btn w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm transition-colors duration-200 text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                data-tab="${tab.id}">
                                <i class="fa-solid ${tab.icon} ml-2"></i>
                                ${tab.label}
                            </button>
                        `).join('')}
                    </nav>
                </div>
            </div>
        `;
    };

    return `
        <div class="flex h-screen bg-gray-100 font-sans">
            <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
               <div class="max-w-2xl m-3">
        <h1 class="text-3xl font-extrabold text-gray-900 tracking-tight">System Settings</h1>
        <p class="text-gray-500 mt-2 text-lg">
            Manage profile, security, and general settings
        </p>
    </div>

                ${renderTabs()}

                <div class="mt-6">
                    ${renderTabContent()}
                </div>

            </main>
        </div>
    `;
};

export default SettingsPage;
