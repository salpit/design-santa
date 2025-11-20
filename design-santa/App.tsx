import React, { useState, useEffect } from 'react';
import { Container, Header, Section, Button, StatDisplay, AdminTable, Badge, TextInput } from './components/UiComponents';
import { DESIGNERS, DesignerName, Assignment } from './types';
import { supabase, isSupabaseConfigured, resetDatabase } from './services/supabaseClient';
import { generateMissionBrief } from './services/geminiService';

// Fallback mock storage for demo if Supabase isn't set up
const LOCAL_STORAGE_KEY = 'santa_assignments_local_v2';
const ADMIN_PASSWORD = 'designprotocol';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<DesignerName | null>(null);
  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [allAssignments, setAllAssignments] = useState<Assignment[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Admin State
  const [showAdmin, setShowAdmin] = useState(false);
  const [adminPasswordInput, setAdminPasswordInput] = useState('');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  // Initial Load & Event Listeners
  useEffect(() => {
    const init = async () => {
      await fetchData();
      if (isSupabaseConfigured()) {
         supabase!
          .channel('table-db-changes')
          .on('postgres_changes', { event: '*', schema: 'public', table: 'secret_santa_assignments' }, () => {
              fetchData();
          })
          .subscribe();
      }
      setLoading(false);
    };

    // Listen for admin toggle event from footer
    const toggleAdminHandler = () => setShowAdmin(prev => !prev);
    window.addEventListener('toggle-admin', toggleAdminHandler);

    init();
    return () => window.removeEventListener('toggle-admin', toggleAdminHandler);
  }, []);

  const fetchData = async () => {
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase.from('secret_santa_assignments').select('*');
      if (!error && data) {
        setAllAssignments(data);
      }
    } else {
      // Local fallback
      const localData = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (localData) {
        setAllAssignments(JSON.parse(localData));
      }
    }
  };

  const handleLogin = (name: DesignerName) => {
    setCurrentUser(name);
    // Check if user already has an assignment
    const existing = allAssignments.find(a => a.santa === name);
    setAssignment(existing || null);
    setError(null);
  };

  const performDraw = async () => {
    if (!currentUser) return;
    setIsDrawing(true);
    setError(null);

    try {
      // 1. Determine available receivers
      const takenReceivers = new Set(allAssignments.map(a => a.receiver));
      
      // Filter candidates
      const candidates = DESIGNERS.filter(d => 
        d !== currentUser && !takenReceivers.has(d)
      );

      if (candidates.length === 0) {
        throw new Error("MATRIX ERROR: No valid candidates. Manual intervention required.");
      }

      // 2. Random selection
      await new Promise(r => setTimeout(r, 1500));
      
      const randomIndex = Math.floor(Math.random() * candidates.length);
      const selectedReceiver = candidates[randomIndex];

      // 3. Generate Gemini Content
      let missionBrief = "Accessing secure data...";
      try {
        missionBrief = await generateMissionBrief(selectedReceiver);
      } catch (e) {
        missionBrief = `Objective: Secure a gift for ${selectedReceiver}. Design parameters are open.`;
      }

      const newAssignment: Assignment = {
        santa: currentUser,
        receiver: selectedReceiver,
        timestamp: new Date().toISOString(),
        mission_brief: missionBrief
      };

      // 4. Persist
      if (isSupabaseConfigured() && supabase) {
        const { error: insertError } = await supabase
          .from('secret_santa_assignments')
          .insert([newAssignment]);
        
        if (insertError) throw insertError;
        await fetchData();
      } else {
        const updated = [...allAssignments, newAssignment];
        setAllAssignments(updated);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
      }

      setAssignment(newAssignment);

    } catch (err: any) {
      setError(err.message || "System Failure.");
    } finally {
      setIsDrawing(false);
    }
  };

  const handleAdminLogin = () => {
    if (adminPasswordInput === ADMIN_PASSWORD) {
      setIsAdminAuthenticated(true);
      setError(null);
    } else {
      setError("INVALID PROTOCOL CREDENTIALS");
    }
  };

  const handleResetSystem = async () => {
    if (!confirm("WARNING: This will wipe all mission data permanently. Proceed?")) return;
    
    setLoading(true);
    try {
      if (isSupabaseConfigured()) {
        await resetDatabase();
        await fetchData();
      } else {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        setAllAssignments([]);
      }
      // Reset local states
      setCurrentUser(null);
      setAssignment(null);
      setIsAdminAuthenticated(false);
      setShowAdmin(false);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  // Animation Logic
  const [displayCandidate, setDisplayCandidate] = useState<string>("INITIALIZING");
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isDrawing) {
      interval = setInterval(() => {
        setDisplayCandidate(DESIGNERS[Math.floor(Math.random() * DESIGNERS.length)]);
      }, 80);
    }
    return () => clearInterval(interval!);
  }, [isDrawing]);

  // Loading View
  if (loading) {
    return (
      <Container>
        <div className="h-96 flex flex-col items-center justify-center">
          <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin mb-4"></div>
          <span className="font-mono text-xs uppercase">Loading Modules...</span>
        </div>
      </Container>
    );
  }

  // --- ADMIN VIEW ---
  if (showAdmin) {
    return (
      <Container>
        <div className="flex justify-between items-center mb-8">
           <h2 className="text-xl font-bold uppercase tracking-tight">Overseer Mode</h2>
           <button onClick={() => setShowAdmin(false)} className="text-xs font-mono underline">EXIT</button>
        </div>

        {!isAdminAuthenticated ? (
          <div className="space-y-4">
            <p className="font-mono text-xs text-gray-500">Enter SysAdmin credentials to view protocol status.</p>
            <TextInput 
              type="password" 
              placeholder="PASSWORD" 
              value={adminPasswordInput}
              onChange={(e) => setAdminPasswordInput(e.target.value)}
            />
            {error && <p className="text-red-500 font-mono text-xs">{error}</p>}
            <Button onClick={handleAdminLogin}>AUTHENTICATE</Button>
          </div>
        ) : (
          <div className="space-y-8">
             <Section title="Protocol Status">
               <AdminTable>
                 <thead>
                   <tr className="bg-gray-50 border-b border-gray-200">
                     <th className="p-3 font-normal text-gray-400">OPERATIVE</th>
                     <th className="p-3 font-normal text-gray-400">STATUS</th>
                     <th className="p-3 font-normal text-gray-400 text-right">TIME</th>
                   </tr>
                 </thead>
                 <tbody>
                   {DESIGNERS.map(d => {
                     const match = allAssignments.find(a => a.santa === d);
                     return (
                       <tr key={d} className="border-b border-gray-100 hover:bg-gray-50">
                         <td className="p-3 font-bold">{d}</td>
                         <td className="p-3">
                           <Badge status={match ? 'assigned' : 'pending'} />
                         </td>
                         <td className="p-3 text-gray-400 text-right">
                           {match ? new Date(match.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : '-'}
                         </td>
                       </tr>
                     )
                   })}
                 </tbody>
               </AdminTable>
             </Section>

             <Section title="Danger Zone">
               <div className="bg-red-50 border border-red-100 p-4">
                 <p className="font-mono text-xs text-red-600 mb-4">
                   FLUSH DATA: Irreversible action. Will reset all assignments.
                 </p>
                 <Button variant="danger" onClick={handleResetSystem}>
                   RESET PROTOCOL
                 </Button>
               </div>
             </Section>
          </div>
        )}
      </Container>
    )
  }

  // --- LOGIN VIEW ---
  if (!currentUser) {
    return (
      <Container>
        <Header />
        <Section title="Authentication Required">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {DESIGNERS.map((name) => {
              const hasDrawn = allAssignments.some(a => a.santa === name);
              return (
                <button
                  key={name}
                  onClick={() => handleLogin(name)}
                  className={`
                    text-left px-4 py-3 font-mono text-xs uppercase transition-all border
                    ${hasDrawn 
                      ? 'border-gray-200 text-gray-400 bg-gray-50 line-through decoration-1' 
                      : 'border-black hover:bg-black hover:text-white'
                    }
                  `}
                >
                  {name}
                </button>
              );
            })}
          </div>
        </Section>
        
        <Section>
          <div className="grid grid-cols-2 gap-4 mt-8">
            <StatDisplay label="Total Operatives" value={DESIGNERS.length} />
            <StatDisplay label="Missions Active" value={allAssignments.length} />
          </div>
        </Section>

        {!isSupabaseConfigured() && (
          <div className="mt-8 p-3 bg-yellow-50 border border-yellow-200 text-[10px] font-mono text-yellow-800 text-center">
            ⚠ DEMO MODE: Data is stored locally. Configure Supabase for shared access.
          </div>
        )}
      </Container>
    );
  }

  // --- DASHBOARD VIEW ---
  return (
    <Container>
      <div className="flex justify-between items-end mb-8 border-b border-black pb-4">
        <div>
          <span className="font-mono text-[10px] text-gray-400 uppercase block mb-1">Logged in as</span>
          <h2 className="text-xl font-bold uppercase">{currentUser}</h2>
        </div>
        <button 
          onClick={() => setCurrentUser(null)}
          className="font-mono text-[10px] uppercase underline hover:no-underline"
        >
          Disconnect
        </button>
      </div>

      {assignment ? (
        // RESULT VIEW
        <div className="fade-in">
           <div className="border-l-2 border-black pl-6 py-2 mb-8">
             <span className="font-mono text-[10px] uppercase bg-black text-white px-1">Assigned Target</span>
             <h1 className="text-4xl sm:text-5xl font-bold mt-2 uppercase tracking-tighter break-words">
               {assignment.receiver}
             </h1>
           </div>

           <Section title="Mission Brief">
             <div className="bg-gray-50 p-6 border border-gray-200 font-mono text-sm leading-relaxed relative">
                {/* Corner markers */}
                <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-black"></span>
                <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-black"></span>
                <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-black"></span>
                <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-black"></span>
                
                {assignment.mission_brief}
             </div>
           </Section>
           
           <div className="text-center mt-12">
             <p className="font-mono text-[10px] text-gray-400 mb-4">
               Keep this information confidential.
             </p>
           </div>
        </div>
      ) : (
        // DRAW VIEW
        <div className="fade-in py-8">
          <div className="mb-12 text-center relative">
            <div className="h-24 flex items-center justify-center overflow-hidden">
               {isDrawing ? (
                 <span className="text-3xl font-mono font-bold animate-pulse">{displayCandidate}</span>
               ) : (
                 <div className="flex gap-2 justify-center">
                   <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
                   <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
                   <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
                 </div>
               )}
            </div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-gray-400 mt-4">
              {isDrawing ? 'Running Selection Algorithm...' : 'Ready to Assign'}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 border border-red-500 bg-red-50 text-red-600 font-mono text-xs">
              ERROR: {error}
            </div>
          )}

          <Button onClick={performDraw} disabled={isDrawing}>
             {isDrawing ? 'CALCULATING...' : 'INITIATE SEQUENCE'}
          </Button>
          
          <p className="mt-6 text-center font-mono text-[10px] text-gray-400 max-w-xs mx-auto">
            By clicking, you agree to execute the gift exchange protocol with extreme prejudice and creativity.
          </p>
        </div>
      )}
    </Container>
  );
};

export default App;
