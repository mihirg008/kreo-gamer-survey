'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { SurveyData } from '@/types/survey';

interface ResponseData {
  id: string;
  user_info: {
    email?: string;
    session_id: string;
    start_time: Timestamp;
    last_updated: Timestamp;
    completion_status: string;
    completion_percentage: number;
    current_section: string;
    completion_time?: Timestamp;
  };
  demographics?: Partial<SurveyData['demographics']>;
  gaming_preferences?: Partial<SurveyData['gaming_preferences']>;
  gaming_habits?: Partial<SurveyData['gaming_habits']>;
  gaming_lifestyle?: Partial<SurveyData['gaming_lifestyle']>;
  gaming_family?: Partial<SurveyData['gaming_family']>;
  future_gaming?: Partial<SurveyData['future_gaming']>;
} 

export default function Dashboard() {
  const [responses, setResponses] = useState<ResponseData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedResponse, setSelectedResponse] = useState<ResponseData | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  useEffect(() => {
    fetchResponses();
  }, []);

  const fetchResponses = async () => {
    setLoading(true);
    try {
      const responsesCollection = collection(db, 'responses');
      const responsesSnapshot = await getDocs(responsesCollection);
      
      const responsesList = responsesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as ResponseData[];
      
      // Sort by last updated timestamp, newest first
      responsesList.sort((a, b) => {
        return b.user_info.last_updated.toMillis() - a.user_info.last_updated.toMillis();
      });
      
      setResponses(responsesList);
    } catch (error) {
      console.error('Error fetching responses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewResponse = (response: ResponseData) => {
    setSelectedResponse(response);
    setIsDialogOpen(true);
  };

  const handleDeleteResponse = async (id: string) => {
    if (!confirm('Are you sure you want to delete this response? This action cannot be undone.')) {
      return;
    }
    
    setDeleteLoading(id);
    try {
      await deleteDoc(doc(db, 'responses', id));
      setResponses(responses.filter(response => response.id !== id));
    } catch (error) {
      console.error('Error deleting response:', error);
      alert('Failed to delete response. Please try again.');
    } finally {
      setDeleteLoading(null);
    }
  };

  const formatDate = (timestamp: Timestamp | undefined) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp.toMillis()).toLocaleString();
  };

  const formatSectionName = (section: string) => {
    return section
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Survey Responses</CardTitle>
          <CardDescription className="text-gray-400">
            View and manage all survey submissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-10">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-500"></div>
            </div>
          ) : responses.length === 0 ? (
            <div className="text-center py-10 text-gray-400">
              No responses found. When users complete the survey, their responses will appear here.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table className="w-full">
                <TableHeader>
                  <TableRow className="border-gray-800">
                    <TableHead className="text-gray-300">Email</TableHead>
                    <TableHead className="text-gray-300">Submitted</TableHead>
                    <TableHead className="text-gray-300">Status</TableHead>
                    <TableHead className="text-gray-300">Progress</TableHead>
                    <TableHead className="text-gray-300">Current Section</TableHead>
                    <TableHead className="text-gray-300">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {responses.map((response) => (
                    <TableRow 
                      key={response.id} 
                      className="border-gray-800 hover:bg-gray-800/50 cursor-pointer"
                      onClick={() => handleViewResponse(response)}
                    >
                      <TableCell className="font-medium text-gray-200">
                        {response.demographics?.email || response.user_info.email || 'Anonymous'}
                      </TableCell>
                      <TableCell className="text-gray-300">
                        {formatDate(response.user_info.last_updated)}
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          response.user_info.completion_status === 'completed' 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-amber-500/20 text-amber-400'
                        }`}>
                          {response.user_info.completion_status === 'completed' ? 'Completed' : 'In Progress'}
                        </span>
                      </TableCell>
                      <TableCell className="text-gray-300">
                        {response.user_info.completion_percentage}%
                      </TableCell>
                      <TableCell className="text-gray-300">
                        {formatSectionName(response.user_info.current_section || '')}
                      </TableCell>
                      <TableCell className="space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="border-gray-700 text-gray-300 hover:bg-gray-700"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewResponse(response);
                          }}
                        >
                          View
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          disabled={deleteLoading === response.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteResponse(response.id);
                          }}
                        >
                          {deleteLoading === response.id ? 'Deleting...' : 'Delete'}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-gray-900 text-white border-gray-800 max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Response Details</DialogTitle>
            <DialogDescription className="text-gray-400">
              Submitted on {formatDate(selectedResponse?.user_info.last_updated)}
            </DialogDescription>
          </DialogHeader>
          
          {selectedResponse && (
            <div className="space-y-6 mt-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-gray-800 p-3 rounded-md">
                  <span className="text-gray-400">Email:</span>{' '}
                  <span className="text-white">{selectedResponse.demographics?.email || selectedResponse.user_info.email || 'Anonymous'}</span>
                </div>
                <div className="bg-gray-800 p-3 rounded-md">
                  <span className="text-gray-400">Status:</span>{' '}
                  <span className={selectedResponse.user_info.completion_status === 'completed' ? 'text-green-400' : 'text-amber-400'}>
                    {selectedResponse.user_info.completion_status === 'completed' ? 'Completed' : 'In Progress'}
                  </span>
                </div>
                <div className="bg-gray-800 p-3 rounded-md">
                  <span className="text-gray-400">Started:</span>{' '}
                  <span className="text-white">{formatDate(selectedResponse.user_info.start_time)}</span>
                </div>
                <div className="bg-gray-800 p-3 rounded-md">
                  <span className="text-gray-400">Last Updated:</span>{' '}
                  <span className="text-white">{formatDate(selectedResponse.user_info.last_updated)}</span>
                </div>
                {selectedResponse.user_info.completion_time && (
                  <div className="bg-gray-800 p-3 rounded-md">
                    <span className="text-gray-400">Completed:</span>{' '}
                    <span className="text-white">{formatDate(selectedResponse.user_info.completion_time)}</span>
                  </div>
                )}
                <div className="bg-gray-800 p-3 rounded-md">
                  <span className="text-gray-400">Progress:</span>{' '}
                  <span className="text-white">{selectedResponse.user_info.completion_percentage}%</span>
                </div>
              </div>

              {/* Demographics Section */}
              {selectedResponse.demographics && (
                <div className="border border-gray-800 rounded-md p-4">
                  <h3 className="text-lg font-medium text-purple-400 mb-3">Demographics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(selectedResponse.demographics).map(([key, value]) => (
                      <div key={key} className="bg-gray-800/50 p-3 rounded-md">
                        <span className="text-gray-400">{formatSectionName(key)}:</span>{' '}
                        <span className="text-white">{String(value)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Gaming Preferences Section */}
              {selectedResponse.gaming_preferences && (
                <div className="border border-gray-800 rounded-md p-4">
                  <h3 className="text-lg font-medium text-purple-400 mb-3">Gaming Preferences</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(selectedResponse.gaming_preferences).map(([key, value]) => (
                      <div key={key} className="bg-gray-800/50 p-3 rounded-md">
                        <span className="text-gray-400">{formatSectionName(key)}:</span>{' '}
                        <span className="text-white">
                          {Array.isArray(value) ? value.join(', ') : String(value)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Gaming Habits Section */}
              {selectedResponse.gaming_habits && (
                <div className="border border-gray-800 rounded-md p-4">
                  <h3 className="text-lg font-medium text-purple-400 mb-3">Gaming Habits</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(selectedResponse.gaming_habits).map(([key, value]) => (
                      <div key={key} className="bg-gray-800/50 p-3 rounded-md">
                        <span className="text-gray-400">{formatSectionName(key)}:</span>{' '}
                        <span className="text-white">
                          {Array.isArray(value) ? value.join(', ') : String(value)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Gaming Lifestyle Section */}
              {selectedResponse.gaming_lifestyle && (
                <div className="border border-gray-800 rounded-md p-4">
                  <h3 className="text-lg font-medium text-purple-400 mb-3">Gaming Lifestyle</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(selectedResponse.gaming_lifestyle).map(([key, value]) => (
                      <div key={key} className="bg-gray-800/50 p-3 rounded-md">
                        <span className="text-gray-400">{formatSectionName(key)}:</span>{' '}
                        <span className="text-white">
                          {Array.isArray(value) ? value.join(', ') : String(value)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Gaming Family Section */}
              {selectedResponse.gaming_family && (
                <div className="border border-gray-800 rounded-md p-4">
                  <h3 className="text-lg font-medium text-purple-400 mb-3">Gaming & Family</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(selectedResponse.gaming_family).map(([key, value]) => (
                      <div key={key} className="bg-gray-800/50 p-3 rounded-md">
                        <span className="text-gray-400">{formatSectionName(key)}:</span>{' '}
                        <span className="text-white">
                          {Array.isArray(value) ? value.join(', ') : String(value)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Future Gaming Section */}
              {selectedResponse.future_gaming && (
                <div className="border border-gray-800 rounded-md p-4">
                  <h3 className="text-lg font-medium text-purple-400 mb-3">Future of Gaming</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(selectedResponse.future_gaming).map(([key, value]) => (
                      <div key={key} className="bg-gray-800/50 p-3 rounded-md">
                        <span className="text-gray-400">{formatSectionName(key)}:</span>{' '}
                        <span className="text-white">
                          {Array.isArray(value) ? value.join(', ') : String(value)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
} 