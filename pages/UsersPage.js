const getRoleClass = (role) => {
    const roles = { 'Admin': 'orange', 'Editor': 'blue', 'User': 'gray' };
    return roles[role] || 'gray';
};

const getStatusClass = (status) => {
    const statuses = { 'Active': 'green', 'Inactive': 'yellow', 'Banned': 'red' };
    return statuses[status] || 'gray';
};

const editIconSVG = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
    </svg>
`;

const deleteIconSVG = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="3 6 5 6 21 6"></polyline>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
        <line x1="10" y1="11" x2="10" y2="17"></line>
        <line x1="14" y1="11" x2="14" y2="17"></line>
    </svg>
`;

const renderUserRow = (user) => {
    const roleClass = getRoleClass(user.role);
    const statusClass = getStatusClass(user.status);
    
    return `
    <tr>
        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <div class="flex items-center">
                <div class="flex-shrink-0 w-10 h-10 pr-3">
                    <svg class="w-full h-full rounded-full" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" alt="${user.name}"></path>
  <circle cx="12" cy="7" r="4"></circle>
</svg>
                </div>
                <div class="mr-3">
                    <p class="text-gray-900 whitespace-no-wrap font-semibold">${user.name}</p>
                </div>
            </div>
        </td>
        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <p class="text-gray-900 whitespace-no-wrap">${user.email}</p>
        </td>
        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <span class="relative inline-block px-3 py-1 font-semibold text-${roleClass}-900 leading-tight">
                <span aria-hidden class="absolute inset-0 bg-${roleClass}-200 opacity-50 rounded-full"></span>
                <span class="relative">${user.role}</span>
            </span>
        </td>
        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <span class="relative inline-block px-3 py-1 font-semibold text-${statusClass}-900 leading-tight">
                <span aria-hidden class="absolute inset-0 bg-${statusClass}-200 opacity-50 rounded-full"></span>
                <span class="relative">${user.status}</span>
            </span>
        </td>
        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <div class="flex items-center gap-2">
                <button class="text-blue-600 hover:text-blue-800 transition-colors p-1 rounded hover:bg-blue-50 edit-btn" data-name="${user.name}" title="Edit">
                    ${editIconSVG}
                </button>
                <button class="text-red-600 hover:text-red-800 transition-colors p-1 rounded hover:bg-red-50 delete-btn" data-name="${user.name}" title="Delete">
                    ${deleteIconSVG}
                </button>
            </div>
        </td>
    </tr>
    `;
};

const UserPage = () => {
    let users = JSON.parse(localStorage.getItem('dashboard_users'));
    if (!users || users.length === 0) {
        users = [
            { name: "Ali Rezaei", email: "ali@example.com", role: "Admin", status: "Active" },
            { name: "Sara Moradi", email: "sara@example.com", role: "User", status: "Inactive" }
        ];
        localStorage.setItem('dashboard_users', JSON.stringify(users));
    }

    const searchQuery = localStorage.getItem('active_search') || '';
    const filteredUsers = searchQuery 
        ? users.filter(u => u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.email.toLowerCase().includes(searchQuery.toLowerCase()))
        : users;
    
    const usersTableRows = filteredUsers.map(user => renderUserRow(user)).join('');

    return `
        <div class="flex h-screen bg-gray-100 font-sans">
            <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6 ">
                <div class="mb-6 flex justify-between items-center">
                    <div class="max-w-2xl">
        <h1 class="text-3xl font-extrabold text-gray-900 tracking-tight">Users Management</h1>
        <p class="text-gray-500 mt-2 text-lg">
            Manage system users, roles, and permissions
        </p>
    </div>
                    <div class="relative mr-4">
                        <span class="absolute inset-y-0 right-0 flex items-center pr-3">
                            <i class="fa-solid fa-search text-gray-400"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="11" cy="11" r="8"></circle>
  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
</svg></i>
                        </span>
                        <input type="text" id="searchInput" value="${searchQuery}"
                            class="w-64 py-2 pr-10 pl-4 shadow-xl rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50"
                            placeholder="Search users...">
                    </div>
                </div>

                <div class="bg-white rounded-lg shadow overflow-x-hidden">
                    <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                        <h3 class="text-lg font-semibold text-gray-800">Latest Registered Users</h3>
                        <button
                            class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded text-sm transition cursor-pointer" id="AddUser">
                            Add User
                        </button>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Username</th>
                                    <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                                    <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Role</th>
                                    <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                                    <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody id="usersTableBody">
                                ${usersTableRows}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            <div id="AddNewUser" class="fixed inset-0 flex justify-center items-center bg-black/40 backdrop-blur-sm z-50 hidden">
                <div class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-x-hidden border-t-4 border-green-500">
                    <div class="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                        <h2 class="text-xl font-bold text-gray-800">
                            <span class="text-green-600">+</span>
                            <span id="modalTitle">Add new user</span>
                        </h2>
                        <button id="close" class="text-gray-400 hover:text-red-500 transition-colors hover:bg-red-50 p-1 rounded-full transition-colors duration-200 focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                            </svg>
                        </button>
                    </div>
                    <div class="p-8">
                        <form id="addUserForm" class="space-y-6">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div class="group">
                                    <label class="block text-sm font-medium text-gray-700 mb-2 transition-colors group-focus-within:text-green-600">Username</label>
                                    <input type="text" name="username" id="inputUsername" placeholder="example: ali_reza" required
                                        class="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all">
                                </div>
                                <div class="group">
                                    <label class="block text-sm font-medium text-gray-700 mb-2 transition-colors group-focus-within:text-green-600">Email</label>
                                    <input type="email" name="email" id="inputEmail" placeholder="example@mail.com" required
                                        class="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all">
                                </div>
                            </div>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div class="group">
                                    <label class="block text-sm font-medium text-gray-700 mb-2 transition-colors group-focus-within:text-green-600">Role</label>
                                    <div class="relative">
                                        <select name="role" id="inputRole"
                                            class="w-full px-9 py-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none cursor-pointer transition-all">
                                            <option value="Admin">Admin</option>
                                            <option value="Editor">Editor</option>
                                            <option value="User">User</option>
                                        </select>
                                        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center px-4 text-gray-500">
                                            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div class="group">
                                    <label class="block text-sm font-medium text-gray-700 mb-2 transition-colors group-focus-within:text-green-600">Status</label>
                                    <div class="relative">
                                        <select name="status" id="inputStatus"
                                            class="w-full px-9 py-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none cursor-pointer transition-all">
                                            <option value="Active">Active</option>
                                            <option value="Inactive">Inactive</option>
                                            <option value="Banned">Banned</option>
                                        </select>
                                        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center px-4 text-gray-500">
                                            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="flex items-center justify-end gap-4 pt-4 border-t border-gray-100">
                                <button type="button" id="cancelBtn"
                                    class="px-6 py-2.5 rounded-lg text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors font-medium">
                                    Cancel
                                </button>
                                <button type="submit" id="saveBtn"
                                    class="px-6 py-2.5 rounded-lg text-white bg-green-600 hover:bg-green-700 shadow-lg shadow-green-500/30 transition-all font-medium transform active:scale-95">
                                    Save User
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `;
};

export default UserPage;

window.switchTab = function(tabId) {
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.classList.add('hidden');
        content.classList.remove('block');
    });

    const activeContent = document.getElementById(`tab-${tabId}`);
    if (activeContent) {
        activeContent.classList.remove('hidden');
        activeContent.classList.add('block');
    }

    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.classList.remove('border-indigo-500', 'text-indigo-600');
        btn.classList.add('border-transparent', 'text-gray-500', 'hover:text-gray-700', 'hover:border-gray-300');

        if (btn.getAttribute('data-tab') === tabId) {
            btn.classList.add('border-indigo-500', 'text-indigo-600');
            btn.classList.remove('border-transparent', 'text-gray-500', 'hover:text-gray-700', 'hover:border-gray-300');
        }
    });
};

document.addEventListener('DOMContentLoaded', () => {
    
    if (location.pathname === '/SettingsPage') {
        switchTab('profile');
    }
});