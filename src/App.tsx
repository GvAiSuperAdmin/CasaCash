import { useState } from 'react';
import { SignIn, SignOutButton, useUser } from "@clerk/clerk-react";
import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import './index.css';

function AppContent() {
  const [activeTab, setActiveTab] = useState<'attendance' | 'expense'>('expense');
  const { user } = useUser();

  return (
    <div>
      <div className="top-bar">
        <div className="brand-container">
          <picture>
            {/* Use the light-background wordmark on light mode, but default to the official yellow-on-black wordmark for dark/Noir mode */}
            <source media="(prefers-color-scheme: light)" srcSet="/wordmark-light.png" />
            <img src="/wordmark.png" alt="Casa Cash" className="wordmark" />
          </picture>
          <p className="subtitle">Noir Estate Management</p>
        </div>
        <div className="avatar" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {user && <span style={{ fontSize: '12px', opacity: 0.7 }}>{user.firstName}</span>}
          <SignOutButton>
            <button className="button" style={{ padding: '6px 12px', fontSize: '12px' }}>Sign Out</button>
          </SignOutButton>
          <img src="/boss-piggy.png" alt="Boss Piggy Mascot" title="Boss Piggy" />
        </div>
      </div>

      <div className="pill-container">
        <div 
          className={`pill ${activeTab === 'expense' ? 'active' : ''}`}
          onClick={() => setActiveTab('expense')}
        >
          Add Expense
        </div>
        <div 
          className={`pill ${activeTab === 'attendance' ? 'active' : ''}`}
          onClick={() => setActiveTab('attendance')}
        >
          Staff Attendance
        </div>
      </div>

      {activeTab === 'expense' && (
        <div className="glass-card">
          <h2>New Expense</h2>
          
          <div className="selector-group">
            <label>Category</label>
            <select defaultValue="">
              <option value="" disabled>Select category</option>
              <option value="groceries">Groceries</option>
              <option value="maintenance">Maintenance</option>
              <option value="utilities">Utilities</option>
              <option value="petty_cash">Petty Cash Top-up</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="selector-group">
            <label>Authorized By</label>
            <select defaultValue="">
              <option value="" disabled>Select admin</option>
              <option value="admin1">Grandpa</option>
              <option value="admin2">Dad</option>
              <option value="admin3">Mom</option>
            </select>
          </div>

          <div className="selector-group">
            <label>Amount (₹)</label>
            <input type="number" placeholder="Enter amount" />
          </div>

          <button className="button" style={{ marginTop: '12px' }}>
            Record Expense
          </button>
        </div>
      )}

      {activeTab === 'attendance' && (
        <div className="glass-card">
          <h2>Mark Attendance</h2>
          
          <div className="selector-group">
            <label>Staff Member</label>
            <select defaultValue="">
              <option value="" disabled>Select staff</option>
              <option value="maid1">Maria (Housekeeping)</option>
              <option value="driver1">John (Driver)</option>
              <option value="cook1">Chef Antonio</option>
            </select>
          </div>

          <div className="selector-group">
            <label>Status</label>
            <select defaultValue="">
              <option value="" disabled>Select status</option>
              <option value="present">Present (Full Day)</option>
              <option value="half">Half Day</option>
              <option value="absent">Absent</option>
            </select>
          </div>

          <button className="button" style={{ marginTop: '12px' }}>
            Save Update
          </button>
        </div>
      )}

    </div>
  );
}

export default function App() {
  return (
    <>
      <AuthLoading>
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '40vh', fontSize: '14px', opacity: 0.5 }}>
          Loading...
        </div>
      </AuthLoading>
      <Unauthenticated>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
          <SignIn />
        </div>
      </Unauthenticated>
      <Authenticated>
        <AppContent />
      </Authenticated>
    </>
  );
}
