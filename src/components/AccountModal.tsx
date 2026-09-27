import React, { useState, useEffect } from 'react';
import { X, UserCheck, Package, ShieldCheck, ArrowRight, LogOut, Mail, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({ isOpen, onClose }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // Auth Form States (Login / Register toggle)
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);

  // User ke previous orders state
  const [userOrders, setUserOrders] = useState<any[]>([]);

  // Check current session & fetch past orders
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        setUser(session.user);
        // Is user ke pichle orders fetch karo database se
        const { data: orders } = await supabase
          .from('orders')
          .select('*')
          .eq('user_id', session.user.id)
          .order('created_at', { ascending: false });

        if (orders) setUserOrders(orders);
      } else {
        setUser(null);
      }
      setLoading(false);
    };

    if (isOpen) {
      fetchUserData();
    }
  }, [isOpen]);

  // Handle Login / Sign Up
  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthLoading(true);

    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        alert('Verification email sent or account created successfully! Please log in.');
        setIsSignUp(false);
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        if (data.session?.user) {
          setUser(data.session.user);
        }
      }
    } catch (err: any) {
      setAuthError(err.message || 'Authentication failed.');
    } finally {
      setAuthLoading(false);
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setUserOrders([]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 select-none">
      
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-md bg-white shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-200 bg-white">
          <h2 className="font-['Clash_Display'] text-2xl font-semibold tracking-tight uppercase text-black">
            {user ? 'My Account' : (isSignUp ? 'Create Archive ID' : 'Client Sign In')}
          </h2>
          <button 
            onClick={onClose} 
            className="p-2 -mr-2 text-neutral-500 hover:text-black hover:bg-neutral-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 font-['JetBrains_Mono']">
          
          {loading ? (
            <div className="py-12 text-center text-xs uppercase tracking-widest animate-pulse">CHECKING SESSION...</div>
          ) : user ? (
            // --- DASHBOARD FOR LOGGED IN USERS ---
            <div className="space-y-6">
              <div className="border border-neutral-200 p-4 bg-neutral-50 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-neutral-500 font-bold uppercase tracking-widest">Email:</span>
                  <span className="font-bold text-black truncate max-w-[200px]">{user.email}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-neutral-500 font-bold uppercase tracking-widest">Status:</span>
                  <span className="text-black font-bold flex items-center gap-1">
                    <UserCheck size={14} /> ACTIVE SESSION
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-neutral-500 font-bold uppercase tracking-widest">Past Orders:</span>
                  <span className="text-white font-bold bg-black px-2 py-0.5 tracking-wider">{userOrders.length} ORDERS</span>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-3">
                <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-2">
                  Quick Actions
                </div>
                
                <Link 
                  to="/track" 
                  onClick={onClose} 
                  className="w-full py-3.5 px-4 border border-neutral-200 hover:border-black transition-colors flex items-center justify-between text-xs font-bold uppercase tracking-widest text-black group"
                >
                  <span className="flex items-center gap-3">
                    <Package size={16} strokeWidth={1.5} /> Track Latest Order
                  </span>
                  <ArrowRight size={16} className="text-neutral-400 group-hover:text-black transition-colors" />
                </Link>

                <div className="border border-neutral-200 p-3 bg-neutral-50">
                  <p className="text-[11px] font-bold uppercase tracking-widest mb-2 text-black">Recent Orders History:</p>
                  {userOrders.length === 0 ? (
                    <p className="text-[10px] text-neutral-400 uppercase">No prior archive dispatches found.</p>
                  ) : (
                    <div className="max-h-32 overflow-y-auto space-y-2">
                      {userOrders.map((ord: any) => (
                        <div key={ord.id} className="text-[10px] flex justify-between border-b border-neutral-200 pb-1">
                          <span>ID: {ord.id.slice(0, 8)}...</span>
                          <span className="font-bold">₹{ord.total_amount || '1099'}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="w-full py-3 border border-red-500 text-red-600 text-xs font-bold uppercase tracking-widest hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
              >
                <LogOut size={14} /> TERMINATE SESSION (LOGOUT)
              </button>
            </div>
          ) : (
            // --- LOGIN / SIGNUP FORM FOR GUESTS ---
            <form onSubmit={handleAuthSubmit} className="space-y-4">
              {authError && (
                <div className="bg-red-50 border border-red-200 text-red-600 p-3 text-[11px] uppercase font-bold">
                  {authError}
                </div>
              )}

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-1">Email Address</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-3.5 text-neutral-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="client@archival.co"
                    className="w-full pl-10 pr-3 py-3 border border-neutral-300 text-[13px] bg-white text-black outline-none focus:border-black"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-1">Password</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-3.5 text-neutral-400" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-3 py-3 border border-neutral-300 text-[13px] bg-white text-black outline-none focus:border-black"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={authLoading}
                className="w-full py-4 bg-black text-white font-['Clash_Display'] font-medium text-[15px] uppercase tracking-widest hover:bg-neutral-800 disabled:bg-neutral-400 transition-colors"
              >
                {authLoading ? 'PROCESSING...' : (isSignUp ? 'CREATE ACCOUNT' : 'SIGN IN')}
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-[11px] text-neutral-500 hover:text-black underline uppercase tracking-widest font-bold"
                >
                  {isSignUp ? 'Already have an ID? Sign In' : "Don't have an archive ID? Register"}
                </button>
              </div>
            </form>
          )}

          {/* Security Note */}
          <div className="pt-4 border-t border-neutral-200 text-[9px] text-neutral-400 leading-relaxed uppercase tracking-widest text-center">
            Secure session. Your data is encrypted and strictly used for order fulfillment.
          </div>
        </div>

        {/* Footer Action */}
        <div className="px-6 py-4 border-t border-neutral-200 bg-neutral-50">
           <button 
             onClick={onClose} 
             className="w-full py-3 bg-neutral-200 text-black font-['Clash_Display'] font-medium text-[13px] uppercase tracking-widest hover:bg-neutral-300 transition-colors"
           >
             Close Window
           </button>
        </div>
        
      </div>
    </div>
  );
};