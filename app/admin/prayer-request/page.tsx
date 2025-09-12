'use client';


import { useState, useEffect } from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import { apiClient } from '@/lib/api-client';

interface PrayerRequest {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  prayerRequest: string;
  isAnonymous?: boolean;
  createdAt: string;
}

const PrayerRequestsAdminPage: NextPage = () => {
  const [requests, setRequests] = useState<PrayerRequest[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const itemsPerPage = 10;

  useEffect(() => {
    fetchPrayerRequests();
  }, [currentPage]);

  const fetchPrayerRequests = async () => {
    try {
      setIsLoading(true);
      const response =  await apiClient.getPrayerRequests(); // Adjust the API call as needed

      setRequests(response || []);
      setTotalPages(requests.length > 0 ? Math.ceil(requests.length / itemsPerPage) : 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this prayer request?')) return;
    
    try {
      const response = await apiClient.deletePrayerRequest(id);

      if (!response || !response.message) {
        throw new Error('Failed to delete prayer request');
      }
      
      // Refresh the list after deletion
      fetchPrayerRequests();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete prayer request');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading prayer requests...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 pt-12">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Prayer Requests Management</h1>
          <Link 
            href="/admin"
            className="px-4 py-2 bg-amber-600 text-white rounded hover:bg-gray-700 transition-colors"
          >
            Back to Admin Dashboard
          </Link>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {requests.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No prayer requests found.
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prayer Request</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Anonymous</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {requests.map((request) => (
                    <tr key={request.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 whitespace-nowrap">
                        {request.isAnonymous ? 'Anonymous' : request.name}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div>{request.email}</div>
                        <div>{request.phone}</div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="max-w-md truncate" title={request.prayerRequest}>
                          {request.prayerRequest}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        {request.isAnonymous ? 'Yes' : 'No'}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        {formatDate(request.createdAt)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleDelete(request.id)}
                          className="text-red-600 hover:text-red-900 ml-2"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-6">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
                  <span className="font-medium">
                    {Math.min(currentPage * itemsPerPage, requests.length + (currentPage - 1) * itemsPerPage)}
                  </span>{' '}
                  of <span className="font-medium">{totalPages * itemsPerPage}</span> results
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded ${currentPage === 1 ? 'bg-gray-200 cursor-not-allowed' : 'bg-gray-300 hover:bg-gray-400'}`}
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded ${currentPage === totalPages ? 'bg-gray-200 cursor-not-allowed' : 'bg-gray-300 hover:bg-gray-400'}`}
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PrayerRequestsAdminPage;