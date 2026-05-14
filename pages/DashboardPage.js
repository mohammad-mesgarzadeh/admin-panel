const initialUsers = [
    {
        name: "Ali Rezaei",
        email: "ali@example.com",
        role: "Admin",
        status: "Active",
        lastLogin: "2 hours ago"
    },
    {
        name: "Sara Moradi",
        email: "sara@example.com",
        role: "User",
        status: "Inactive",
        lastLogin: "1 day ago"
    },
    {
        name: "Reza Ahmadi",
        email: "reza@example.com",
        role: "Editor",
        status: "Active",
        lastLogin: "5 mins ago"
    },
    {
        name: "Maryam Karimi",
        email: "maryam@example.com",
        role: "User",
        status: "Active",
        lastLogin: "3 days ago"
    }
];

const recentOrders = [
    { id: "#ORD-789", customer: "Ali Rezaei", amount: "$120.00", status: "Completed", date: "2024-03-15" },
    { id: "#ORD-790", customer: "Sara Moradi", amount: "$85.50", status: "Pending", date: "2024-03-15" },
    { id: "#ORD-791", customer: "John Doe", amount: "$210.00", status: "Processing", date: "2024-03-14" },
    { id: "#ORD-792", customer: "Jane Smith", amount: "$45.00", status: "Completed", date: "2024-03-14" },
];

const DashboardPage = () => {
    let users = JSON.parse(localStorage.getItem('dashboard_users'));
    if (!users || users.length === 0) {
        users = initialUsers;
        localStorage.setItem('dashboard_users', JSON.stringify(users));
    }

    const activeUsers = users.filter(u => u.status === 'Active').length;
    const inactiveUsers = users.length - activeUsers;

    return `
        <div class="flex h-screen bg-gray-100 font-sans">
            
            <div class="flex-1 flex flex-col overflow-hidden">
                
                <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
                    
<div class="mb-8 flex flex-col md:flex-row justify-between items-end gap-4">
    
    <div class="max-w-2xl">
        <h1 class="text-3xl font-extrabold text-gray-900 tracking-tight">Dashboard</h1>
        <p class="text-gray-500 mt-2 text-lg">
            Welcome back, here's what's happening today.
        </p>
    </div>

    <button class="group relative inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium text-white transition-all duration-200 bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-md hover:shadow-lg cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-2 transition-transform duration-200 group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
        </svg>
        <span>Download Report</span>
    </button>

</div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div class="bg-white rounded-xl shadow-sm p-5 border border-gray-100 hover:shadow-md transition">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-sm font-medium text-gray-500">Total Users</p>
                                    <p class="text-3xl font-bold text-gray-800 mt-1">${users.length}</p>
                                </div>
                                <div class="p-3 rounded-full bg-indigo-50 text-indigo-600">
                                    <i class="fa-solid fa-users text-xl">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
  <circle cx="9" cy="7" r="4"></circle>
  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
</svg>

                                    </i>
                                </div>
                            </div>
                            <div class="mt-4 flex items-center text-sm">
                                <span class="text-green-500 font-semibold flex items-center">
                                    <i class="fas fa-arrow-up mr-1"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
  <polyline points="17 6 23 6 23 12"></polyline>
</svg></i> 12%
                                </span>
                                <span class="text-gray-400 ml-2">from last month</span>
                            </div>
                        </div>

                        <div class="bg-white rounded-xl shadow-sm p-5 border border-gray-100 hover:shadow-md transition">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-sm font-medium text-gray-500">Active Users</p>
                                    <p class="text-3xl font-bold text-gray-800 mt-1">${activeUsers}</p>
                                </div>
                                <div class="p-3 rounded-full bg-green-50 text-green-600">
                                    <i class="fa-solid fa-user-check text-xl">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
  <circle cx="8.5" cy="7" r="4"></circle>
  <polyline points="17 11 19 13 23 9"></polyline>
</svg>
                                    </i>
                                </div>
                            </div>
                            <div class="mt-4 w-full bg-gray-200 rounded-full h-1.5">
                                <div class="bg-green-500 h-1.5 rounded-full" style="width: ${activeUsers / users.length * 100}%"></div>
                            </div>
                        </div>

                        <div class="bg-white rounded-xl shadow-sm p-5 border border-gray-100 hover:shadow-md transition">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-sm font-medium text-gray-500">Monthly Revenue</p>
                                    <p class="text-3xl font-bold text-gray-800 mt-1">$264</p>
                                </div>
                                <div class="p-3 rounded-full bg-yellow-50 text-yellow-600">
                                    <i class="fa-solid fa-sack-dollar text-xl">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="10"></circle>
  <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"></path>
  <path d="M12 18V6"></path>
</svg>
                                    </i>
                                </div>
                            </div>
                            <div class="mt-4 flex items-center text-sm">
                                <span class="text-red-500 font-semibold flex items-center">
                                    <i class="fas fa-arrow-down mr-1"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline>
  <polyline points="17 18 23 18 23 12"></polyline>
</svg>
</i> 2%
                                </span>
                                <span class="text-gray-400 ml-2">from last month</span>
                            </div>
                        </div>

                        <div class="bg-white rounded-xl shadow-sm p-5 border border-gray-100 hover:shadow-md transition">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-sm font-medium text-gray-500">Open Tickets</p>
                                    <p class="text-3xl font-bold text-gray-800 mt-1">12</p>
                                </div>
                                <div class="p-3 rounded-full bg-red-50 text-red-600">
                                    <i class="fa-solid fa-triangle-exclamation text-xl">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
  <line x1="9" y1="10" x2="15" y2="10"></line>
  <line x1="12" y1="7" x2="12" y2="13"></line>
</svg>
                                    </i>
                                </div>
                            </div>
                            <div class="mt-4 flex items-center text-sm">
                                <span class="text-gray-500">5 are high priority</span>
                            </div>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                        
                        <div class="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div class="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                                <h3 class="text-lg font-semibold text-gray-800">Recent Orders</h3>
                                <a href="#" class="text-sm text-indigo-600 hover:text-indigo-800">View All</a>
                            </div>
                            <div class="overflow-x-auto">
                                <table class="w-full text-left border-collapse">
                                    <thead>
                                        <tr class="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider">
                                            <th class="px-6 py-3 font-semibold">Order ID</th>
                                            <th class="px-6 py-3 font-semibold">Customer</th>
                                            <th class="px-6 py-3 font-semibold">Amount</th>
                                            <th class="px-6 py-3 font-semibold">Status</th>
                                            <th class="px-6 py-3 font-semibold">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody class="divide-y divide-gray-100 text-sm">
                                        ${recentOrders.map(order => `
                                            <tr class="hover:bg-gray-50 transition">
                                                <td class="px-6 py-4 font-medium text-gray-800">${order.id}</td>
                                                <td class="px-6 py-4 text-gray-600">${order.customer}</td>
                                                <td class="px-6 py-4 font-semibold text-gray-800">${order.amount}</td>
                                                <td class="px-6 py-4">
                                                    <span class="px-2 py-1 rounded-full text-xs font-semibold
                                                        ${order.status === 'Completed' ? 'bg-green-100 text-green-700' :
            order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                'bg-blue-100 text-blue-700'}">
                                                        ${order.status}
                                                    </span>
                                                </td>
                                                <td class="px-6 py-4 text-gray-500">${order.date}</td>
                                            </tr>
                                        `).join('')}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h3 class="text-lg font-semibold text-gray-800 mb-4">Traffic Source</h3>
                            <div class="space-y-4">
                                <div>
                                    <div class="flex justify-between text-sm mb-1">
                                        <span class="text-gray-600">Direct</span>
                                        <span class="font-semibold text-gray-800">45%</span>
                                    </div>
                                    <div class="w-full bg-gray-200 rounded-full h-2">
                                        <div class="bg-indigo-600 h-2 rounded-full" style="width: 45%"></div>
                                    </div>
                                </div>
                                <div>
                                    <div class="flex justify-between text-sm mb-1">
                                        <span class="text-gray-600">Social Media</span>
                                        <span class="font-semibold text-gray-800">30%</span>
                                    </div>
                                    <div class="w-full bg-gray-200 rounded-full h-2">
                                        <div class="bg-purple-500 h-2 rounded-full" style="width: 30%"></div>
                                    </div>
                                </div>
                                <div>
                                    <div class="flex justify-between text-sm mb-1">
                                        <span class="text-gray-600">Referral</span>
                                        <span class="font-semibold text-gray-800">15%</span>
                                    </div>
                                    <div class="w-full bg-gray-200 rounded-full h-2">
                                        <div class="bg-pink-500 h-2 rounded-full" style="width: 15%"></div>
                                    </div>
                                </div>
                                <div>
                                    <div class="flex justify-between text-sm mb-1">
                                        <span class="text-gray-600">Organic</span>
                                        <span class="font-semibold text-gray-800">10%</span>
                                    </div>
                                    <div class="w-full bg-gray-200 rounded-full h-2">
                                        <div class="bg-yellow-500 h-2 rounded-full" style="width: 10%"></div>
                                    </div>
                                </div>
                            </div>

                            <div class="mt-8 pt-6 border-t border-gray-100">
                                <h4 class="text-sm font-semibold text-gray-700 mb-3">Recent Activity</h4>
                                <ul class="space-y-3">
                                    <li class="flex items-start text-sm">
                                        <span class="w-2 h-2 mt-1.5 bg-green-500 rounded-full mr-3 flex-shrink-0"></span>
                                        <span class="text-gray-600">New user <strong>Ali Rezaei</strong> registered</span>
                                    </li>
                                    <li class="flex items-start text-sm">
                                        <span class="w-2 h-2 mt-1.5 bg-blue-500 rounded-full mr-3 flex-shrink-0"></span>
                                        <span class="text-gray-600">Order <strong>#ORD-789</strong> completed</span>
                                    </li>
                                    <li class="flex items-start text-sm">
                                        <span class="w-2 h-2 mt-1.5 bg-red-500 rounded-full mr-3 flex-shrink-0"></span>
                                        <span class="text-gray-600">Server alert: High CPU usage</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <footer class="mt-8 border-t border-gray-200 pt-6 text-center text-sm text-gray-500">
                        <p>&copy; 2026 AdminPanel. All rights reserved. Designed by <span class="text-indigo-600 font-semibold">mohammad mesgarzadeh</span>.</p>
                    </footer>

                </main>
            </div>
        </div>
    `;
};

export default DashboardPage;