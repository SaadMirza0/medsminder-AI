'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [permissionStatus, setPermissionStatus] = useState('default');

  useEffect(() => {
    if ('Notification' in window) {
      setPermissionStatus(Notification.permission);
    }
  }, []);

  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      setPermissionStatus(permission);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setImagePreview(URL.createObjectURL(selectedFile));
    }
  };

  const triggerRealNotification = (summaryText) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification("💊 Active MedsMinder Alert", {
        body: summaryText || "New schedule registered successfully!",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a prescription image first!");

    setLoading(true);
    setResult('');

    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });
      
      const data = await res.json();
      
      if (data.error) {
        setResult(`Server Error: ${data.error}`);
      } else if (data.detailedSchedule) {
        setResult(data.detailedSchedule);
        triggerRealNotification(data.notificationSummary);
      }
    } catch (err) {
      setResult("Network error or failed to parse response.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800 px-4 py-10 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
   
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div>
            <h1 className="text-blue-600 text-3xl font-extrabold tracking-tight">💊 MedsMinder Dynamic AI</h1>
            <p className="text-slate-500 text-sm mt-1">Real-time extraction & operating system alerts engine</p>
          </div>
          
          <button 
            onClick={requestNotificationPermission}
            className={`px-4 py-2.5 rounded-xl font-semibold text-xs transition-colors duration-200 cursor-pointer border-0 ${
              permissionStatus === 'granted' 
                ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200' 
                : 'bg-rose-100 text-rose-800 hover:bg-rose-200'
            }`}
          >
            {permissionStatus === 'granted' ? '● System Notifications Active' : '⚠️ Enable Live Notifications'}
          </button>
        </header>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          

          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-100">
            <h2 className="text-lg font-bold text-slate-900 mb-5"> Upload Prescription</h2>
            
            <form onSubmit={handleSubmit} className="space-y-5">
    
              <div className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-2xl p-8 text-center bg-slate-50 relative transition-colors duration-200 group">
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleFileChange} 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                />
                <div className="space-y-2">
                  <span className="text-3xl block group-hover:scale-110 transition-transform duration-200">📸</span>
                  <p className="text-sm text-slate-600 font-medium max-w-[250px] mx-auto truncate">
                    {file ? file.name : "Click or drag to choose prescription image"}
                  </p>
                </div>
              </div>

           
              {imagePreview && (
                <div className="relative rounded-2xl overflow-hidden shadow-inner border border-slate-200">
                  <img src={imagePreview} alt="Preview" className="w-full h-44 object-cover" />
                </div>
              )}

              <button 
                type="submit" 
                disabled={loading} 
                className={`w-full py-3.5 px-4 text-white font-bold rounded-2xl text-center shadow-md transition-all border-0 ${
                  loading 
                    ? 'bg-slate-400 cursor-not-allowed shadow-none' 
                    : 'bg-blue-600 hover:bg-blue-700 active:scale-[0.99] shadow-blue-600/10 cursor-pointer'
                }`}
              >
                {loading ? 'Extracting True Values...' : 'Analyze !! '}
              </button>
            </form>
          </div>

          {/* Right Column Workspace Card */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-100 min-h-[380px] flex flex-col">
            <h2 className="text-lg font-bold text-slate-900 mb-5 flex justify-between items-center">
              <span>2. Live Extraction Workspace</span>
              {loading && <span className="text-xs font-semibold text-blue-600 animate-pulse bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">⚡ AI Engine Executing</span>}
            </h2>

            {!result && !loading && (
              <div className="flex flex-col items-center justify-center flex-1 py-12 text-slate-400">
            upload image 
          
              </div>
            )}

            {loading && (
              <div className="space-y-4 text-sm text-slate-500 font-medium flex-1 py-6">
                <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100 animate-pulse">
                  <span>⏳</span> <p>Parsing prescription image parameters...</p>
                </div>
           
              </div>
            )}

            {/* Rich AI Generation Payload Outcome Content Panel */}
            {result && (
              <div className="space-y-5 animate-fade-in flex-1">
                <div className="bg-blue-50 p-4 rounded-xl text-blue-800 text-xs font-semibold border-l-4 border-blue-600 shadow-sm">
                  ✅ ALERT SYSTEM FIRED: The notification window pushed real structured prescription data to your operating system desktop frame layout channel.
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-600 mb-2 tracking-wide uppercase">📋 AI Generated Schedule Output:</h3>
                  <div className="whitespace-pre-wrap leading-relaxed text-sm text-slate-700 bg-slate-50 p-5 rounded-2xl border border-slate-200 font-mono shadow-inner max-h-[300px] overflow-y-auto">
                    {result}
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </main>
  );
}
