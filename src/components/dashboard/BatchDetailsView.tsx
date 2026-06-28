import React, { useState, useMemo, useEffect } from 'react';
import { 
  ArrowLeft, 
  Calendar, 
  Users, 
  Search, 
  ChevronUp, 
  ChevronDown, 
  Edit2, 
  Trash2, 
  Check, 
  X, 
  Plus, 
  Layers, 
  BookOpen, 
  Clock, 
  GraduationCap 
} from 'lucide-react';
import { Button } from '../ui/Button';

// Interfaces matching those in ConfigureAcademicStructure
interface Session {
  id: string;
  startYear: number;
  endYear: number;
  displayName: string;
}

interface Batch {
  id: string;
  sessionId: string;
  intakeType: string;
  batchName: string;
  alumniCount?: number; // Added for details view
}

interface BatchDetailsViewProps {
  space: {
    id: string;
    name: string;
    type: string;
    admin: string;
  };
  onBack: () => void;
  triggerToast: (message: string, type: 'success' | 'info' | 'error') => void;
}

export const BatchDetailsView: React.FC<BatchDetailsViewProps> = ({ 
  space, 
  onBack, 
  triggerToast 
}) => {
  const storageKeySessions = `alumnione_sessions_${space.id}`;
  const storageKeyBatches = `alumnione_batches_${space.id}`;

  // --- Initialize or Load Data ---
  const [sessions, setSessions] = useState<Session[]>(() => {
    const saved = localStorage.getItem(storageKeySessions);
    if (saved) return JSON.parse(saved);
    
    // Auto-initialize with some premium mock data for pre-existing spaces if empty
    const mockSessions: Session[] = [
      { id: `s_${space.id}_2018`, startYear: 2018, endYear: 2022, displayName: '2018–2022' },
      { id: `s_${space.id}_2019`, startYear: 2019, endYear: 2023, displayName: '2019–2023' },
      { id: `s_${space.id}_2020`, startYear: 2020, endYear: 2024, displayName: '2020–2024' },
      { id: `s_${space.id}_2021`, startYear: 2021, endYear: 2025, displayName: '2021–2025' },
      { id: `s_${space.id}_2022`, startYear: 2022, endYear: 2026, displayName: '2022–2026' }
    ];
    localStorage.setItem(storageKeySessions, JSON.stringify(mockSessions));
    return mockSessions;
  });

  const [batches, setBatches] = useState<Batch[]>(() => {
    const saved = localStorage.getItem(storageKeyBatches);
    if (saved) return JSON.parse(saved);

    // Auto-initialize corresponding batches for pre-existing spaces
    const mockBatches: Batch[] = [
      { id: `b_${space.id}_2018_summer`, sessionId: `s_${space.id}_2018`, intakeType: 'Summer', batchName: 'Summer 2018', alumniCount: 120 },
      { id: `b_${space.id}_2018_fall`, sessionId: `s_${space.id}_2018`, intakeType: 'Fall', batchName: 'Fall 2018', alumniCount: 95 },
      { id: `b_${space.id}_2019_spring`, sessionId: `s_${space.id}_2019`, intakeType: 'Spring', batchName: 'Spring 2019', alumniCount: 110 },
      { id: `b_${space.id}_2019_summer`, sessionId: `s_${space.id}_2019`, intakeType: 'Summer', batchName: 'Summer 2019', alumniCount: 135 },
      { id: `b_${space.id}_2019_fall`, sessionId: `s_${space.id}_2019`, intakeType: 'Fall', batchName: 'Fall 2019', alumniCount: 88 },
      { id: `b_${space.id}_2020_spring`, sessionId: `s_${space.id}_2020`, intakeType: 'Spring', batchName: 'Spring 2020', alumniCount: 142 },
      { id: `b_${space.id}_2020_summer`, sessionId: `s_${space.id}_2020`, intakeType: 'Summer', batchName: 'Summer 2020', alumniCount: 125 },
      { id: `b_${space.id}_2020_fall`, sessionId: `s_${space.id}_2020`, intakeType: 'Fall', batchName: 'Fall 2020', alumniCount: 104 },
      { id: `b_${space.id}_2021_spring`, sessionId: `s_${space.id}_2021`, intakeType: 'Spring', batchName: 'Spring 2021', alumniCount: 150 },
      { id: `b_${space.id}_2021_summer`, sessionId: `s_${space.id}_2021`, intakeType: 'Summer', batchName: 'Summer 2021', alumniCount: 130 },
      { id: `b_${space.id}_2022_spring`, sessionId: `s_${space.id}_2022`, intakeType: 'Spring', batchName: 'Spring 2022', alumniCount: 115 },
      { id: `b_${space.id}_2022_fall`, sessionId: `s_${space.id}_2022`, intakeType: 'Fall', batchName: 'Fall 2022', alumniCount: 98 }
    ];
    localStorage.setItem(storageKeyBatches, JSON.stringify(mockBatches));
    return mockBatches;
  });

  // --- UI and Search states ---
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<'batchName' | 'session' | 'alumniCount'>('batchName');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);

  // --- Inline Edit state ---
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');

  // --- Add Batch state ---
  const [isAddingBatch, setIsAddingBatch] = useState(false);
  const [newBatchName, setNewBatchName] = useState('');
  const [newBatchSessionId, setNewBatchSessionId] = useState('');
  const [newBatchIntake, setNewBatchIntake] = useState('Summer');
  const [newBatchAlumni, setNewBatchAlumni] = useState('0');

  // --- Memoized calculations for Summary ---
  const summaryMetrics = useMemo(() => {
    const totalAlumni = batches.reduce((sum, b) => sum + (b.alumniCount || 0), 0);
    const averageAlumni = batches.length > 0 ? Math.round(totalAlumni / batches.length) : 0;
    return {
      totalSessions: sessions.length,
      totalBatches: batches.length,
      totalAlumni,
      averageAlumni
    };
  }, [sessions, batches]);

  // Map batches to include session displayName
  const detailedBatches = useMemo(() => {
    return batches.map(batch => {
      const session = sessions.find(s => s.id === batch.sessionId);
      return {
        ...batch,
        sessionName: session ? session.displayName : 'N/A',
        alumniCount: batch.alumniCount || 0
      };
    });
  }, [batches, sessions]);

  // Filter and Sort
  const filteredAndSortedBatches = useMemo(() => {
    let result = [...detailedBatches];

    // Search
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(b => 
        b.batchName.toLowerCase().includes(q) || 
        b.sessionName.toLowerCase().includes(q) || 
        b.intakeType.toLowerCase().includes(q)
      );
    }

    // Sort
    result.sort((a, b) => {
      let valA: any = '';
      let valB: any = '';

      if (sortField === 'batchName') {
        valA = a.batchName;
        valB = b.batchName;
      } else if (sortField === 'session') {
        valA = a.sessionName;
        valB = b.sessionName;
      } else if (sortField === 'alumniCount') {
        valA = a.alumniCount;
        valB = b.alumniCount;
      }

      if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [detailedBatches, searchQuery, sortField, sortDirection]);

  // Pagination
  const itemsPerPage = 10;
  const paginatedBatches = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedBatches.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedBatches, currentPage]);

  const totalPages = Math.ceil(filteredAndSortedBatches.length / itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // --- Handlers ---
  const handleSort = (field: 'batchName' | 'session' | 'alumniCount') => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const startEdit = (id: string, name: string) => {
    setEditingId(id);
    setEditName(name);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName('');
  };

  const saveEdit = (id: string) => {
    if (!editName.trim()) {
      triggerToast('Batch name cannot be empty.', 'error');
      return;
    }
    const updated = batches.map(b => b.id === id ? { ...b, batchName: editName } : b);
    setBatches(updated);
    localStorage.setItem(storageKeyBatches, JSON.stringify(updated));
    setEditingId(null);
    triggerToast('Batch name updated successfully.', 'success');
  };

  const deleteBatch = (id: string) => {
    const batchToDelete = batches.find(b => b.id === id);
    const updated = batches.filter(b => b.id !== id);
    setBatches(updated);
    localStorage.setItem(storageKeyBatches, JSON.stringify(updated));
    triggerToast(`Batch "${batchToDelete?.batchName}" deleted successfully.`, 'info');
  };

  const handleAddBatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBatchName.trim()) {
      triggerToast('Please provide a batch name.', 'error');
      return;
    }
    if (!newBatchSessionId) {
      triggerToast('Please select a session.', 'error');
      return;
    }

    const newBatch: Batch = {
      id: `b_${space.id}_manual_${Date.now()}`,
      sessionId: newBatchSessionId,
      intakeType: newBatchIntake,
      batchName: newBatchName,
      alumniCount: parseInt(newBatchAlumni) || 0
    };

    const updated = [newBatch, ...batches];
    setBatches(updated);
    localStorage.setItem(storageKeyBatches, JSON.stringify(updated));
    
    // Reset Form
    setNewBatchName('');
    setNewBatchAlumni('0');
    setIsAddingBatch(false);
    triggerToast(`New batch "${newBatchName}" added successfully.`, 'success');
  };

  return (
    <div className="space-y-6">
      {/* Navigation Breadcrumb */}
      <div className="flex items-center gap-3">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"
        >
          <ArrowLeft size={18} />
        </button>
        <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
          <span>Manage Spaces</span>
          <span>/</span>
          <span className="text-slate-900 font-semibold">{space.name}</span>
          <span>/</span>
          <span className="text-slate-900">Batch Details</span>
        </div>
      </div>

      {/* Header Panel */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900">{space.name} — Batch Directory</h1>
            <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-md text-[11px] font-bold uppercase tracking-wider border border-indigo-100">
              {space.type}
            </span>
          </div>
          <p className="text-slate-500 text-sm mt-1 max-w-2xl">
            View detailed metrics, search student batches, track registered alumni counts, and rename batch identifiers.
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => setIsAddingBatch(true)} 
            leftIcon={<Plus size={16} />}
          >
            Add New Batch
          </Button>
          <Button variant="primary" onClick={onBack} leftIcon={<ArrowLeft size={16} />}>
            Back to Spaces
          </Button>
        </div>
      </div>

      {/* Summary Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center gap-4 shadow-xs">
          <div className="p-3.5 bg-blue-50 text-blue-600 rounded-2xl">
            <Layers size={22} />
          </div>
          <div>
            <span className="block text-slate-400 text-xs font-bold uppercase tracking-wider">Total Batches</span>
            <span className="text-2xl font-extrabold text-slate-900">{summaryMetrics.totalBatches}</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center gap-4 shadow-xs">
          <div className="p-3.5 bg-emerald-50 text-emerald-600 rounded-2xl">
            <Calendar size={22} />
          </div>
          <div>
            <span className="block text-slate-400 text-xs font-bold uppercase tracking-wider">Academic Sessions</span>
            <span className="text-2xl font-extrabold text-slate-900">{summaryMetrics.totalSessions}</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center gap-4 shadow-xs">
          <div className="p-3.5 bg-indigo-50 text-indigo-600 rounded-2xl">
            <Users size={22} />
          </div>
          <div>
            <span className="block text-slate-400 text-xs font-bold uppercase tracking-wider">Total Alumni Count</span>
            <span className="text-2xl font-extrabold text-slate-900">{summaryMetrics.totalAlumni.toLocaleString()}</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center gap-4 shadow-xs">
          <div className="p-3.5 bg-purple-50 text-purple-600 rounded-2xl">
            <GraduationCap size={22} />
          </div>
          <div>
            <span className="block text-slate-400 text-xs font-bold uppercase tracking-wider">Avg. Class Size</span>
            <span className="text-2xl font-extrabold text-slate-900">{summaryMetrics.averageAlumni} students</span>
          </div>
        </div>
      </div>

      {/* Manual Batch Add Modal/Inline form */}
      {isAddingBatch && (
        <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-6 relative">
          <button 
            onClick={() => setIsAddingBatch(false)}
            className="absolute top-4 right-4 p-1.5 bg-white border rounded-lg text-slate-400 hover:text-slate-600 shadow-sm"
          >
            <X size={16} />
          </button>
          <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2 mb-4">
            <Plus size={18} className="text-blue-500" />
            Add Custom Academic Batch
          </h3>

          <form onSubmit={handleAddBatch} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase text-slate-500">Batch Name</label>
              <input 
                type="text" 
                required
                placeholder="e.g. Summer 2023"
                value={newBatchName}
                onChange={(e) => setNewBatchName(e.target.value)}
                className="w-full text-xs px-3 py-2 border rounded-xl outline-none focus:ring-1 focus:ring-blue-500 bg-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase text-slate-500">Link Session</label>
              <select 
                required
                value={newBatchSessionId}
                onChange={(e) => setNewBatchSessionId(e.target.value)}
                className="w-full text-xs px-3 py-2 border rounded-xl outline-none bg-white"
              >
                <option value="">Select Session...</option>
                {sessions.map(s => (
                  <option key={s.id} value={s.id}>{s.displayName}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase text-slate-500">Intake / Group</label>
              <select 
                value={newBatchIntake}
                onChange={(e) => setNewBatchIntake(e.target.value)}
                className="w-full text-xs px-3 py-2 border rounded-xl outline-none bg-white"
              >
                <option value="Summer">Summer</option>
                <option value="Spring">Spring</option>
                <option value="Fall">Fall</option>
                <option value="Single">Single Intake</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase text-slate-500">Alumni Count</label>
              <div className="flex gap-2">
                <input 
                  type="number" 
                  min="0"
                  value={newBatchAlumni}
                  onChange={(e) => setNewBatchAlumni(e.target.value)}
                  className="w-20 text-xs px-3 py-2 border rounded-xl outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                />
                <Button type="submit" size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2">
                  Create Batch
                </Button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Main Directory Table and Search */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        
        {/* Table Search & Title Header */}
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <BookOpen size={18} className="text-indigo-500" />
            <h2 className="font-bold text-slate-800">Academic Batches Directory</h2>
          </div>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search batches, intakes, or sessions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-xs outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Directory Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-xs font-bold text-slate-600 uppercase tracking-wider">
                <th className="p-4 cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => handleSort('batchName')}>
                  <div className="flex items-center gap-1">
                    <span>Batch Name</span>
                    {sortField === 'batchName' ? (
                      sortDirection === 'asc' ? <ChevronUp size={12} /> : <ChevronDown size={12} />
                    ) : null}
                  </div>
                </th>
                <th className="p-4 cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => handleSort('session')}>
                  <div className="flex items-center gap-1">
                    <span>Linked Session</span>
                    {sortField === 'session' ? (
                      sortDirection === 'asc' ? <ChevronUp size={12} /> : <ChevronDown size={12} />
                    ) : null}
                  </div>
                </th>
                <th className="p-4 cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => handleSort('alumniCount')}>
                  <div className="flex items-center gap-1">
                    <span>Alumni Count</span>
                    {sortField === 'alumniCount' ? (
                      sortDirection === 'asc' ? <ChevronUp size={12} /> : <ChevronDown size={12} />
                    ) : null}
                  </div>
                </th>
                <th className="p-4">Intake Prefix</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-xs text-slate-700 divide-y divide-slate-100">
              {paginatedBatches.length > 0 ? (
                paginatedBatches.map(batch => (
                  <tr key={batch.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4">
                      {editingId === batch.id ? (
                        <div className="flex items-center gap-2 max-w-xs">
                          <input 
                            type="text" 
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="px-2.5 py-1.5 border rounded-lg text-xs outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                          />
                          <button onClick={() => saveEdit(batch.id)} className="p-1 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 rounded-lg border border-emerald-200">
                            <Check size={14} />
                          </button>
                          <button onClick={cancelEdit} className="p-1 bg-slate-50 text-slate-500 hover:bg-slate-100 rounded-lg border border-slate-200">
                            <X size={14} />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-800 text-sm">{batch.batchName}</span>
                        </div>
                      )}
                    </td>
                    <td className="p-4 font-medium text-slate-500">{batch.sessionName}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                        <span className="font-extrabold text-slate-950">{batch.alumniCount.toLocaleString()}</span>
                        <span className="text-slate-400 text-[10px]">Alumni</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                        batch.intakeType === 'Summer' ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                        batch.intakeType === 'Spring' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                        batch.intakeType === 'Fall' ? 'bg-blue-50 text-blue-700 border border-blue-100' :
                        'bg-slate-50 text-slate-700 border border-slate-200'
                      }`}>
                        {batch.intakeType}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button 
                          onClick={() => startEdit(batch.id, batch.batchName)}
                          className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-blue-600 transition-colors"
                          title="Rename Batch"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button 
                          onClick={() => deleteBatch(batch.id)}
                          className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-red-500 transition-colors"
                          title="Delete Batch"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-400 italic">
                    No academic batches match your current search query.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Directory Pagination */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-slate-50 flex items-center justify-between text-xs bg-slate-50/50">
            <span className="text-slate-400">
              Showing <span className="font-semibold text-slate-700">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-semibold text-slate-700">{Math.min(currentPage * itemsPerPage, filteredAndSortedBatches.length)}</span> of <span className="font-semibold text-slate-700">{filteredAndSortedBatches.length}</span> batches
            </span>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              >
                Previous
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              >
                Next
              </Button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
