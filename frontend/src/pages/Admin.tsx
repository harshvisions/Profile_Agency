import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Video, Globe, FolderPlus, Trash2, Lock, ArrowRight, Image as ImageIcon, Edit2 } from 'lucide-react';
import { initialProjects, type Project } from '../data/projects';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Load from local storage or use initial
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('agencify_projects_v2');
    if (saved) return JSON.parse(saved);
    return initialProjects;
  });

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const initialFormState = { title: '', websiteUrl: '', videoUrl: '', description: '', thumbnailUrl: '' };
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    localStorage.setItem('agencify_projects_v2', JSON.stringify(projects));
  }, [projects]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'Admin@143') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, thumbnailUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setProjects(projects.map(p => p.id === editingId ? { ...formData, id: editingId } : p));
    } else {
      const newProject = {
        id: Math.random().toString(36).substr(2, 9),
        ...formData
      };
      setProjects([...projects, newProject]);
    }
    closeForm();
  };

  const startEdit = (project: Project) => {
    setFormData({
      title: project.title,
      websiteUrl: project.websiteUrl,
      videoUrl: project.videoUrl,
      description: project.description,
      thumbnailUrl: project.thumbnailUrl || ''
    });
    setEditingId(project.id);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setFormData(initialFormState);
    setEditingId(null);
    setIsFormOpen(false);
  };

  const handleDelete = (id: string) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#111] p-10 rounded-3xl border border-white/10 shadow-2xl max-w-md w-full"
        >
          <div className="w-16 h-16 bg-indigo-500/20 rounded-2xl flex items-center justify-center mb-8 mx-auto">
            <Lock className="w-8 h-8 text-indigo-400" />
          </div>
          <h2 className="text-3xl font-bold text-white text-center mb-2">Admin Access</h2>
          <p className="text-gray-400 text-center mb-8">Enter the secure portal.</p>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-4 bg-black border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500 transition-colors"
                autoFocus
              />
              {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
            </div>
            <button type="submit" className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
              Login <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-28 pb-24 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight">Admin Dashboard</h1>
            <p className="text-gray-400 mt-2 text-lg">Manage your agency portfolio securely.</p>
          </div>
          <button
            onClick={() => isFormOpen ? closeForm() : setIsFormOpen(true)}
            className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold inline-flex items-center transition-transform active:scale-95 hover:bg-indigo-500"
          >
            {isFormOpen ? 'Cancel' : <><Plus className="w-5 h-5 mr-2" /> Add New Project</>}
          </button>
        </div>

        {isFormOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-[#111] p-8 rounded-3xl border border-white/10 shadow-2xl mb-12 overflow-hidden"
          >
            <h2 className="text-2xl font-bold mb-8 flex items-center"><FolderPlus className="mr-3 text-indigo-400" /> {editingId ? 'Edit Project' : 'Add a Website to Dashboard'}</h2>
            <form onSubmit={handleSaveProject} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">Project Title</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Awesome Startup Site"
                    value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-5 py-4 rounded-xl border border-white/10 bg-black text-white focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">Website URL</label>
                  <div className="relative">
                    <Globe className="absolute left-4 top-4 h-6 w-6 text-gray-500" />
                    <input
                      required
                      type="url"
                      placeholder="https://example.com"
                      value={formData.websiteUrl}
                      onChange={e => setFormData({ ...formData, websiteUrl: e.target.value })}
                      className="w-full pl-12 pr-5 py-4 rounded-xl border border-white/10 bg-black text-white focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">Video Preview URL (Optional)</label>
                  <div className="relative">
                    <Video className="absolute left-4 top-4 h-6 w-6 text-gray-500" />
                    <input
                      type="text"
                      placeholder="https://your-video-url.mp4"
                      value={formData.videoUrl}
                      onChange={e => setFormData({ ...formData, videoUrl: e.target.value })}
                      className="w-full pl-12 pr-5 py-4 rounded-xl border border-white/10 bg-black text-white focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">Thumbnail Image (Optional)</label>
                  <div className="relative">
                    <ImageIcon className="absolute left-4 top-4 h-6 w-6 text-gray-500" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="w-full pl-12 pr-5 py-3 rounded-xl border border-white/10 bg-black text-white focus:outline-none focus:border-indigo-500 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                    />
                  </div>
                  {formData.thumbnailUrl && (
                    <div className="mt-2 w-32 aspect-video relative rounded overflow-hidden">
                      <img src={formData.thumbnailUrl} alt="Thumbnail preview" className="object-cover w-full h-full" />
                      <button type="button" onClick={() => setFormData({ ...formData, thumbnailUrl: '' })} className="absolute top-1 right-1 bg-black/50 rounded-full p-1 hover:bg-red-500"><Trash2 className="w-4 h-4 text-white" /></button>
                    </div>
                  )}
                </div>

                <div className="space-y-3 md:col-span-2">
                  <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">Description</label>
                  <input
                    required
                    type="text"
                    placeholder="Short description of the project"
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-5 py-4 rounded-xl border border-white/10 bg-black text-white focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
              </div>
              <div className="flex justify-end pt-6">
                <button type="submit" className="bg-white text-black px-8 py-4 rounded-xl font-bold transition-all hover:bg-gray-200 hover:scale-105 active:scale-95">
                  {editingId ? 'Update Project' : 'Save Project'}
                </button>
              </div>
            </form>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.length === 0 && !isFormOpen ? (
            <div className="col-span-full bg-[#111] p-16 rounded-3xl border border-white/10 text-center text-gray-500 text-lg">
              No projects added yet. Click "Add New Project" to populate your dashboard!
            </div>
          ) : (
            projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-[#111] border border-white/10 rounded-3xl overflow-hidden shadow-2xl group hover:border-indigo-500/50 transition-all duration-500 flex flex-col"
              >
                <div className="aspect-[16/10] bg-black relative group overflow-hidden">
                  {project.thumbnailUrl ? (
                    <img src={project.thumbnailUrl} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-700" alt={project.title} />
                  ) : project.videoUrl ? (
                    <video src={project.videoUrl} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-700" autoPlay loop muted playsInline />
                  ) : (
                    <div className="w-full h-full relative pointer-events-none">
                      <iframe
                        src={project.websiteUrl}
                        className="absolute top-0 left-0 w-[400%] h-[400%] scale-[0.25] origin-top-left border-none pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-700"
                        title={`${project.title} preview`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent pointer-events-none" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center backdrop-blur-sm z-10">
                    <a href={project.websiteUrl} target="_blank" rel="noreferrer" className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-200 hover:scale-105 transition-all shadow-xl flex items-center gap-2">
                      <Globe className="w-5 h-5" /> Visit Site
                    </a>
                  </div>
                </div>
                <div className="p-8 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-extrabold text-2xl text-white">{project.title}</h3>
                      <div className="flex gap-2">
                        <button onClick={() => startEdit(project)} className="text-gray-600 hover:text-indigo-400 transition-colors p-2 hover:bg-indigo-500/10 rounded-lg">
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button onClick={() => handleDelete(project.id)} className="text-gray-600 hover:text-red-500 transition-colors p-2 hover:bg-red-500/10 rounded-lg">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-400 mb-6 line-clamp-2">{project.description}</p>
                  </div>
                  <a href={project.websiteUrl} className="text-sm font-medium text-indigo-400 hover:text-indigo-300 hover:underline break-all" target="_blank" rel="noreferrer">{project.websiteUrl}</a>
                </div>
              </motion.div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
