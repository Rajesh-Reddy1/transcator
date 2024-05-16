/**
 * v0 by Vercel.
 * @see https://v0.dev/t/1pzmcszYAxj
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
export default function History() {
    return (
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl font-bold md:text-3xl">Transactions History</h1>
          <p className="text-gray-500 dark:text-gray-400">Monthly breakdown of your transactions.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse text-left">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <th className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300">Month</th>
                <th className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300">Transactions</th>
                <th className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300">Total Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="px-4 py-3 text-gray-500 dark:text-gray-400">May 2023</td>
                <td className="px-4 py-3 text-gray-500 dark:text-gray-400">42</td>
                <td className="px-4 py-3 text-gray-500 dark:text-gray-400">$4,567.89</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="px-4 py-3 text-gray-500 dark:text-gray-400">April 2023</td>
                <td className="px-4 py-3 text-gray-500 dark:text-gray-400">38</td>
                <td className="px-4 py-3 text-gray-500 dark:text-gray-400">$3,987.65</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="px-4 py-3 text-gray-500 dark:text-gray-400">March 2023</td>
                <td className="px-4 py-3 text-gray-500 dark:text-gray-400">45</td>
                <td className="px-4 py-3 text-gray-500 dark:text-gray-400">$5,432.10</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="px-4 py-3 text-gray-500 dark:text-gray-400">February 2023</td>
                <td className="px-4 py-3 text-gray-500 dark:text-gray-400">31</td>
                <td className="px-4 py-3 text-gray-500 dark:text-gray-400">$2,876.54</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="px-4 py-3 text-gray-500 dark:text-gray-400">January 2023</td>
                <td className="px-4 py-3 text-gray-500 dark:text-gray-400">27</td>
                <td className="px-4 py-3 text-gray-500 dark:text-gray-400">$2,109.87</td>
              </tr>
            </tbody>
            <tfoot>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <td className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300">Total</td>
                <td className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300">183</td>
                <td className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300">$19,974.15</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    )
  }