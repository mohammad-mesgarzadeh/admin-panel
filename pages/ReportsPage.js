const salesData = [
    { month: 'Farvardin', value: 65, color: '#4F46E5' },
    { month: 'Ordibehesht', value: 59, color: '#10B981' },
    { month: 'Khordad', value: 80, color: '#F59E0B' },
    { month: 'Tir', value: 81, color: '#EF4444' },
    { month: 'Mordad', value: 56, color: '#3B82F6' },
    { month: 'Shahrivar', value: 95, color: '#8B5CF6' },
];

const trafficData = [
    { source: 'Google Search', percent: 45, color: 'bg-blue-500' },
    { source: 'Social Media', percent: 30, color: 'bg-purple-500' },
    { source: 'Direct Link', percent: 15, color: 'bg-green-500' },
    { source: 'Others', percent: 10, color: 'bg-gray-400' },
];

const transactions = [
    { id: '#TRX-9821', customer: 'Mohammad Ahmadi', date: '2023/11/05', amount: '2,500,000', status: 'Successful', statusClass: 'bg-green-100 text-green-800' },
    { id: '#TRX-9822', customer: 'Sara Rezaei', date: '2023/11/04', amount: '850,000', status: 'Pending', statusClass: 'bg-yellow-100 text-yellow-800' },
    { id: '#TRX-9823', customer: 'Ali Karimi', date: '2023/11/03', amount: '4,200,000', status: 'Successful', statusClass: 'bg-green-100 text-green-800' },
    { id: '#TRX-9824', customer: 'Maryam Noori', date: '2023/11/02', amount: '120,000', status: 'Cancelled', statusClass: 'bg-red-100 text-red-800' },
    { id: '#TRX-9825', customer: 'Hossein Mohammadi', date: '2023/11/01', amount: '1,100,000', status: 'Successful', statusClass: 'bg-green-100 text-green-800' },
];

const renderTransactions = () => {
    return `
        <div class="overflow-x-auto">
            <table class="min-w-full leading-normal">
                <thead>
                    <tr>
                        <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ID</th>
                        <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Customer</th>
                        <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                        <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Amount</th>
                        <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                    </tr>
                </thead>
                <tbody>
                    ${transactions.map(t => `
                        <tr class="hover:bg-gray-50">
                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p class="text-gray-900 whitespace-no-wrap font-mono">${t.id}</p>
                            </td>
                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <div class="flex items-center">
                                    <div class="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs m-3">
                                        ${t.customer.charAt(0)}
                                    </div>
                                    <div class="mr-2">
                                        <p class="text-gray-900 whitespace-no-wrap font-semibold">${t.customer}</p>
                                    </div>
                                </div>
                            </td>
                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p class="text-gray-900 whitespace-no-wrap">${t.date}</p>
                            </td>
                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p class="text-gray-900 whitespace-no-wrap font-medium">${t.amount} Toman</p>
                            </td>
                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <span class="relative inline-block px-3 py-1 font-semibold leading-tight rounded-full ${t.statusClass}">
                                    <span class="relative">${t.status}</span>
                                </span>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
};

export default function ReportsPage() {
    return `
        <div class="flex h-screen bg-gray-100 font-sans">
            <main class="flex-1 overflow-x-hidden bg-gray-100 p-6">
                <div class="max-w-2xl m-3">
                    <h1 class="text-3xl font-extrabold text-gray-900 tracking-tight">Reports & Analytics</h1>
                    <p class="text-gray-500 mt-2 text-lg">
                        Overview of system performance, sales, and user traffic
                    </p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div class="bg-white rounded-lg shadow p-5 border-r-4 border-blue-500">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm font-medium text-gray-500">Today's Sales</p>
                                <p class="text-2xl font-bold text-gray-800">12,450,000</p>
                            </div>
                            <div class="p-3 rounded-full bg-blue-100 text-blue-500">
                                <i class="fa-solid fa-chart-line text-xl"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <circle cx="9" cy="21" r="1"></circle>
                                    <circle cx="20" cy="21" r="1"></circle>
                                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                                    <path d="M12 11l0 0.01"></path>
                                    <path d="M16 11h.01"></path>
                                </svg></i>
                            </div>
                        </div>
                        <p class="text-green-500 text-xs mt-2 flex items-center">
                            <i class="fa-solid fa-arrow-up mr-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                                <polyline points="17 6 23 6 23 12"></polyline>
                            </svg></i> 12% vs yesterday
                        </p>
                    </div>
                    <div class="bg-white rounded-lg shadow p-5 border-r-4 border-green-500">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm font-medium text-gray-500">New Orders</p>
                                <p class="text-2xl font-bold text-gray-800">45</p>
                            </div>
                            <div class="p-3 rounded-full bg-green-100 text-green-500">
                                <i class="fa-solid fa-bag-shopping text-xl"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                    <polyline points="14 2 14 8 20 8"></polyline>
                                    <line x1="16" y1="13" x2="8" y2="13"></line>
                                    <line x1="16" y1="17" x2="8" y2="17"></line>
                                    <polyline points="10 9 9 9 8 9"></polyline>
                                </svg></i>
                            </div>
                        </div>
                        <p class="text-green-500 text-xs mt-2 flex items-center">
                            <i class="fa-solid fa-arrow-up mr-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                                <polyline points="17 6 23 6 23 12"></polyline>
                            </svg></i> 5% vs last week
                        </p>
                    </div>
                    <div class="bg-white rounded-lg shadow p-5 border-r-4 border-purple-500">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm font-medium text-gray-500">Visitors</p>
                                <p class="text-2xl font-bold text-gray-800">1,234</p>
                            </div>
                            <div class="p-3 rounded-full bg-purple-100 text-purple-500">
                                <i class="fa-solid fa-users text-xl"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="9" cy="7" r="4"></circle>
                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                </svg></i>
                            </div>
                        </div>
                        <p class="text-red-500 text-xs mt-2 flex items-center">
                            <i class="fa-solid fa-arrow-down mr-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline>
                                <polyline points="17 18 23 18 23 12"></polyline>
                            </svg></i> 2% vs last month
                        </p>
                    </div>
                    <div class="bg-white rounded-lg shadow p-5 border-r-4 border-yellow-500">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm font-medium text-gray-500">Conversion Rate</p>
                                <p class="text-2xl font-bold text-gray-800">3.2%</p>
                            </div>
                            <div class="p-3 rounded-full bg-yellow-100 text-yellow-500">
                                <i class="fa-solid fa-percent text-xl"><img src="images/Artboard 1.png" width="24" height="24"></i>
                            </div>
                        </div>
                        <p class="text-gray-400 text-xs mt-2">Stable</p>
                    </div>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    <div class="bg-white rounded-lg shadow p-6">
                        <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <i class="fa-solid fa-chart-bar text-indigo-500"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <line x1="18" y1="20" x2="18" y2="10"></line>
                                <line x1="12" y1="20" x2="12" y2="4"></line>
                                <line x1="6" y1="20" x2="6" y2="14"></line>
                                <line x1="2" y1="20" x2="22" y2="20"></line>
                            </svg></i>
                            Monthly Sales Trend
                        </h3>
                        <div class="chart-container bg-white rounded-2xl shadow-lg p-6 w-full max-w-2xl mx-auto transition-all duration-300 hover:shadow-xl">
                                <canvas id="salesChart" class="w-full h-full"></canvas>
                        </div>
                    </div>

                    <div class="bg-white rounded-lg shadow p-6">
                        <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <i class="fa-solid fa-chart-pie text-indigo-500"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                            </svg></i>
                            Traffic Sources
                        </h3>
                        <div class="space-y-4 mt-4">
                            ${trafficData.map(item => `
                                <div>
                                    <div class="flex justify-between text-sm mb-1">
                                        <span class="font-medium text-gray-700">${item.source}</span>
                                        <span class="text-gray-500">${item.percent}%</span>
                                    </div>
                                    <div class="w-full bg-gray-200 rounded-full h-2.5">
                                        <div class="${item.color} h-2.5 rounded-full" style="width: ${item.percent}%"></div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <div class="bg-white rounded-lg shadow overflow-x-hidden">
                    <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                        <h3 class="text-lg font-semibold text-gray-800">Recent Transactions</h3>
                        <button class="text-indigo-600 hover:text-indigo-800 text-sm font-medium cursor-pointer">
                            View All
                        </button>
                    </div>
                    ${renderTransactions()}
                </div>
            </main>
        </div>
    `;
}