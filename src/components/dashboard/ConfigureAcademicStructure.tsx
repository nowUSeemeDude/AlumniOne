import React, { useState, useMemo, useEffect } from 'react';
import { 
  ArrowLeft, 
  Calendar, 
  Layers, 
  Clock, 
  Check, 
  AlertTriangle, 
  Search, 
  ChevronUp, 
  ChevronDown, 
  Building2, 
  Sparkles,
  RefreshCw,
  Trash2,
  Edit2,
  CheckCircle2,
  Info,
  X
} from 'lucide-react';
import { Button } from '../ui/Button';
import { motion, AnimatePresence } from 'motion/react';

// Database Interfaces
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
}

interface ConfigureAcademicStructureProps {
  space: {
    id: string;
    name: string;
    type: string;
  };
  onBack: () => void;
  triggerToast: (message: string, type: 'success' | 'info' | 'error') => void;
}

export const ConfigureAcademicStructure: React.FC<ConfigureAcademicStructureProps> = ({ 
  space, 
  onBack, 
  triggerToast 
}) => {
  const currentYear = 2026; // Set to 2026 as per metadata and instruction rules

  // --- Form States ---
  const [establishmentYear, setEstablishmentYear] = useState<string>('2015');
  const [intakePattern, setIntakePattern] = useState<string>('Summer, Spring & Fall');
  const [semesterDuration, setSemesterDuration] = useState<string>('4 Months');
  const [programDuration, setProgramDuration] = useState<number>(4);

  // --- Simulation & Database State ---
  // We'll store existing sessions and batches in local storage or simulated state to ensure idempotency and show existing data warnings.
  const storageKeySessions = `alumnione_sessions_${space.id}`;
  const storageKeyBatches = `alumnione_batches_${space.id}`;

  const [existingSessions, setExistingSessions] = useState<Session[]>(() => {
    const saved = localStorage.getItem(storageKeySessions);
    return saved ? JSON.parse(saved) : [];
  });

  const [existingBatches, setExistingBatches] = useState<Batch[]>(() => {
    const saved = localStorage.getItem(storageKeyBatches);
    return saved ? JSON.parse(saved) : [];
  });

  // For simulation of "linked data" that would trigger the existing data protection dialog
  const [hasLinkedData, setHasLinkedData] = useState<boolean>(() => {
    // Let's assume if there are already records, some of them are linked to alumni/events to demo the protection flow
    const savedSessions = localStorage.getItem(storageKeySessions);
    return savedSessions ? JSON.parse(savedSessions).length > 0 : false;
  });

  // --- UI States ---
  const [isGenerating, setIsGenerating] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  // --- Editing State for Generated Records ---
  const [editingBatchId, setEditingBatchId] = useState<string | null>(null);
  const [editingBatchName, setEditingBatchName] = useState<string>('');
  const [editingSessionId, setEditingSessionId] = useState<string | null>(null);
  const [editingSessionName, setEditingSessionName] = useState<string>('');

  // --- Generation & Save Logic ---
  const handleGenerateClick = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate establishment year
    const yearVal = parseInt(establishmentYear);
    if (isNaN(yearVal) || yearVal < 1950 || yearVal > 2035) {
      triggerToast('Please enter a valid establishment year between 1950 and 2035.', 'error');
      return;
    }

    // Check if sessions/batches already exist
    if (hasLinkedData) {
      setShowConfirmDialog(true);
    } else {
      executeGeneration(false); // Clean or overwrite logic
    }
  };

  const executeGeneration = (onlyMissing: boolean = false) => {
    setIsGenerating(true);
    setShowConfirmDialog(false);

    // Simulate database latency
    setTimeout(() => {
      const startY = parseInt(establishmentYear);
      const endY = currentYear + programDuration;

      let tempSessions = onlyMissing ? [...existingSessions] : [];
      let tempBatches = onlyMissing ? [...existingBatches] : [];

      let sessionsCreatedCount = 0;
      let batchesCreatedCount = 0;

      for (let year = startY; year <= endY; year++) {
        const sessionStart = year;
        const sessionEnd = year + programDuration;
        const sessionName = `${sessionStart}–${sessionEnd}`;

        // Find or create session
        let session = tempSessions.find(s => s.startYear === sessionStart && s.endYear === sessionEnd);
        if (!session) {
          session = {
            id: `s_${space.id}_${year}`,
            startYear: sessionStart,
            endYear: sessionEnd,
            displayName: sessionName
          };
          tempSessions.push(session);
          sessionsCreatedCount++;
        }

        // Generate batches for this session based on intakePattern
        const generateBatchRecord = (intakeType: string, bName: string) => {
          const exists = tempBatches.some(b => b.sessionId === session!.id && b.batchName === bName);
          if (!exists) {
            tempBatches.push({
              id: `b_${space.id}_${year}_${intakeType.toLowerCase().replace(/\s/g, '')}`,
              sessionId: session!.id,
              intakeType: intakeType,
              batchName: bName
            });
            batchesCreatedCount++;
          }
        };

        if (intakePattern === 'Summer, Spring & Fall') {
          generateBatchRecord('Summer', `Summer ${year}`);
          generateBatchRecord('Spring', `Spring ${year}`);
          generateBatchRecord('Fall', `Fall ${year}`);
        } else if (intakePattern === 'Summer & Fall') {
          generateBatchRecord('Summer', `Summer ${year}`);
          generateBatchRecord('Fall', `Fall ${year}`);
        } else if (intakePattern === 'Single Intake') {
          generateBatchRecord('Single', `Batch ${year}`);
        }
      }

      // Save to simulated database
      localStorage.setItem(storageKeySessions, JSON.stringify(tempSessions));
      localStorage.setItem(storageKeyBatches, JSON.stringify(tempBatches));

      setExistingSessions(tempSessions);
      setExistingBatches(tempBatches);
      setHasLinkedData(true);
      setIsGenerating(false);

      if (onlyMissing) {
        triggerToast(`Academic structure updated: generated missing records. Created ${sessionsCreatedCount} Sessions and ${batchesCreatedCount} Batches.`, 'success');
      } else {
        triggerToast(`Academic structure generated successfully. Created ${sessionsCreatedCount} Sessions and ${batchesCreatedCount} Batches.`, 'success');
      }
    }, 1200);
  };

  // --- Inline Edit / Deletion for Saved Sessions & Batches ---
  const deleteBatch = (id: string) => {
    const updated = existingBatches.filter(b => b.id !== id);
    setExistingBatches(updated);
    localStorage.setItem(storageKeyBatches, JSON.stringify(updated));
    triggerToast('Batch deleted successfully.', 'info');
  };

  const startEditBatch = (id: string, currentName: string) => {
    setEditingBatchId(id);
    setEditingBatchName(currentName);
  };

  const saveEditBatch = (id: string) => {
    if (!editingBatchName.trim()) return;
    const updated = existingBatches.map(b => b.id === id ? { ...b, batchName: editingBatchName } : b);
    setExistingBatches(updated);
    localStorage.setItem(storageKeyBatches, JSON.stringify(updated));
    setEditingBatchId(null);
    triggerToast('Batch name updated.', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb Navigation */}
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
          <span className="text-slate-900">Academic Structure</span>
        </div>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900">Configure Academic Structure</h1>
            <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-md text-[11px] font-bold uppercase tracking-wider border border-blue-100">
              {space.type}
            </span>
          </div>
          <p className="text-slate-500 text-sm mt-1 max-w-3xl">
            Configure the academic structure of this Space. AlumniOne will automatically generate academic Sessions and Batch names based on the information below. These can be edited later if required.
          </p>
        </div>
        <Button variant="outline" leftIcon={<ArrowLeft size={16} />} onClick={onBack}>
          Back to List
        </Button>
      </div>

      {/* Main Configuration Layout */}
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Setup Form */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center gap-2">
              <Calendar size={18} className="text-blue-500" />
              <h2 className="font-bold text-slate-800">Structure Settings</h2>
            </div>

            <form onSubmit={handleGenerateClick} className="p-6 space-y-6">
              
              {/* 1. Space Establishment Year */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                  Space Establishment Year <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  type="number"
                  min="1950"
                  max="2035"
                  value={establishmentYear}
                  onChange={(e) => setEstablishmentYear(e.target.value)}
                  placeholder="e.g. 2015"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-900 font-medium"
                />
                <p className="text-xs text-slate-500 leading-relaxed">
                  The year this department/school/faculty first started admitting students. This is not the year the university joined AlumniOne.
                </p>
              </div>

              {/* 2. Academic Intake Pattern */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                  Academic Intake Pattern <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { value: 'Summer, Spring & Fall', desc: 'Three Intakes per Academic Year' },
                    { value: 'Summer & Fall', desc: 'Two Intakes per Academic Year' },
                    { value: 'Single Intake', desc: 'One Intake (e.g. Autumn / Single Annual batch)' },
                    { value: 'Not Applicable', desc: 'No intake names, generate sessions only' }
                  ].map((option) => (
                    <label 
                      key={option.value}
                      className={`p-4 rounded-xl border flex flex-col justify-between cursor-pointer transition-all ${
                        intakePattern === option.value 
                          ? 'border-blue-500 bg-blue-50/40 ring-1 ring-blue-500' 
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-bold text-slate-800">{option.value}</span>
                        <input
                          type="radio"
                          name="intakePattern"
                          value={option.value}
                          checked={intakePattern === option.value}
                          onChange={() => setIntakePattern(option.value)}
                          className="h-4 w-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                        />
                      </div>
                      <span className="text-xs text-slate-500">{option.desc}</span>
                    </label>
                  ))}
                </div>
                <p className="text-xs text-slate-500">
                  Defines standard naming prefixes for student intakes.
                </p>
              </div>

              {/* 3. Semester Duration */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                  Semester Duration <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {['4 Months', '6 Months', '12 Months', 'Not Applicable'].map((duration) => (
                    <label 
                      key={duration}
                      className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                        semesterDuration === duration 
                          ? 'border-blue-500 bg-blue-50/40 ring-1 ring-blue-500' 
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="semesterDuration"
                        value={duration}
                        checked={semesterDuration === duration}
                        onChange={() => setSemesterDuration(duration)}
                        className="sr-only"
                      />
                      <span className="text-sm font-bold text-slate-800">{duration}</span>
                    </label>
                  ))}
                </div>
                <div className="p-3 bg-amber-50 border border-amber-100 rounded-lg flex items-start gap-2">
                  <Info size={16} className="text-amber-600 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-amber-800 leading-relaxed">
                    This information is stored for future semester planning and academic calendar automation.
                  </p>
                </div>
              </div>

              {/* 4. Program Duration */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                  Program Duration <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((years) => (
                    <button
                      type="button"
                      key={years}
                      onClick={() => setProgramDuration(years)}
                      className={`p-2.5 rounded-xl border font-bold text-sm transition-all ${
                        programDuration === years 
                          ? 'border-blue-500 bg-blue-50/40 text-blue-700 ring-1 ring-blue-500' 
                          : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      {years} {years === 1 ? 'Year' : 'Years'}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-slate-500">
                  Select standard course duration. This automatically defines the offset for Session End Years.
                </p>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <Button 
                  type="submit" 
                  disabled={isGenerating}
                  className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center justify-center gap-2"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw size={18} className="animate-spin" />
                      <span>Generating academic structure...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles size={18} />
                      <span>Generate Academic Structure</span>
                    </>
                  )}
                </Button>
              </div>

            </form>
          </div>

          {/* Database Content Tabs (Sessions & Batches created) */}
          {existingSessions.length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-emerald-500" />
                  <h2 className="font-bold text-slate-800">Saved Structure ({existingBatches.length || existingSessions.length} items)</h2>
                </div>
                <button 
                  onClick={() => {
                    localStorage.removeItem(storageKeySessions);
                    localStorage.removeItem(storageKeyBatches);
                    setExistingSessions([]);
                    setExistingBatches([]);
                    setHasLinkedData(false);
                    triggerToast('Academic structure reset cleared.', 'info');
                  }}
                  className="text-xs text-red-500 hover:text-red-700 font-semibold flex items-center gap-1"
                >
                  <Trash2 size={14} />
                  Clear Generated Structure
                </button>
              </div>

              <div className="p-6">
                <p className="text-xs text-slate-500 mb-4">
                  The following sessions and batch structures have been permanently registered for this space. You can rename or manage individual batches here.
                </p>
                
                <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2">
                  {existingSessions.map(session => {
                    const sessionBatches = existingBatches.filter(b => b.sessionId === session.id);
                    return (
                      <div key={session.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-700 bg-slate-200 px-2.5 py-1 rounded-lg">
                            Session: {session.displayName}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">ID: {session.id}</span>
                        </div>

                        {sessionBatches.length > 0 ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                            {sessionBatches.map(batch => (
                              <div key={batch.id} className="bg-white p-2.5 rounded-lg border border-slate-100 flex items-center justify-between text-xs">
                                {editingBatchId === batch.id ? (
                                  <div className="flex items-center gap-1.5 w-full">
                                    <input 
                                      type="text" 
                                      value={editingBatchName} 
                                      onChange={(e) => setEditingBatchName(e.target.value)} 
                                      className="flex-1 px-2 py-1 border rounded focus:ring-1 focus:ring-blue-500 outline-none"
                                    />
                                    <button onClick={() => saveEditBatch(batch.id)} className="p-1 text-emerald-600 hover:bg-emerald-50 rounded">
                                      <Check size={14} />
                                    </button>
                                    <button onClick={() => setEditingBatchId(null)} className="p-1 text-slate-400 hover:bg-slate-100 rounded">
                                      <X size={14} />
                                    </button>
                                  </div>
                                ) : (
                                  <>
                                    <span className="font-semibold text-slate-800">{batch.batchName}</span>
                                    <div className="flex items-center gap-1">
                                      <button onClick={() => startEditBatch(batch.id, batch.batchName)} className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-blue-500">
                                        <Edit2 size={12} />
                                      </button>
                                      <button onClick={() => deleteBatch(batch.id)} className="p-1 hover:bg-slate-50 rounded text-slate-400 hover:text-red-500">
                                        <Trash2 size={12} />
                                      </button>
                                    </div>
                                  </>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-[11px] text-slate-400 italic">No batches linked to this session.</p>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* FINAL SAVE ACTION BUTTON */}
                <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-xs text-slate-500 max-w-md">
                    Click <span className="font-semibold text-slate-700">Save & Finish</span> to finalize the structure registry and return to the Spaces Dashboard.
                  </div>
                  <Button 
                    onClick={onBack}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center gap-2"
                  >
                    <Check size={18} />
                    Save & Finish
                  </Button>
                </div>

              </div>
            </div>
          )}

        </div>

      </div>

      {/* Existing Data Protection Dialog */}
      <AnimatePresence>
        {showConfirmDialog && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowConfirmDialog(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4"
            >
              {/* Dialog Content */}
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden border border-slate-100 flex flex-col"
              >
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-3 text-amber-600">
                    <div className="p-2 bg-amber-50 rounded-full border border-amber-200">
                      <AlertTriangle size={24} />
                    </div>
                    <h3 className="text-lg font-bold">Academic Structure Already Exists</h3>
                  </div>

                  <p className="text-sm text-slate-500 leading-relaxed">
                    Changing these settings may affect future academic records. Existing Sessions and Batches that already contain data cannot be deleted automatically.
                  </p>
                </div>

                <div className="p-6 bg-slate-50 border-t border-slate-100 flex gap-3">
                  <Button 
                    variant="outline" 
                    className="flex-1 font-semibold text-slate-700"
                    onClick={() => setShowConfirmDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-semibold"
                    onClick={() => executeGeneration(true)}
                  >
                    Generate Missing Records
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
};
