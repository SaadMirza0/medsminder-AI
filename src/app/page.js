"use client";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import Footer from "../components/Footer";
import { motion, AnimatePresence } from "framer-motion";
export default function Home() {
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [permissionStatus, setPermissionStatus] = useState("default");

  // updating the data from AI
  const [medicationName, setMedicationName] = useState("Medicine Name");
  const [dosage, setDosage] = useState("0");
  const [frequency, setFrequency] = useState("0");
  const [duration, setDuration] = useState("0");
  const [confidence, setConfidence] = useState("99.8%");

  useEffect(() => {
    if ("Notification" in window) {
      setPermissionStatus(Notification.permission);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-10");
          }
        });
      },
      { threshold: 0.05 },
    );

    const animatedElements = document.querySelectorAll(".animate-on-scroll");
    animatedElements.forEach((el) => observer.observe(el));

    return () => {
      animatedElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const requestNotificationPermission = async () => {
    if ("Notification" in window) {
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
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("💊 Medsminder AI ", {
        body: summaryText || "Prescription analysis completed successfully!",
        icon: "https://lh3.googleusercontent.com/aida/ADBb0ujMuZMmjPTLyis4eFlD6b_HyLIbexxvNBFr2E8QSDZV-Jbx4mFJVF2r0H5xBDGLs3Vh3bVv-VLIsCAoU0rpBnFl8SfDNHyVQjoo1C4ANJ1yrcvZaxobKB8u1tWa31v_e0HKn9At8LMSSAhL_RYFVWV_yVakaYpk0rJEZTNRwaPXKLU0JfSMELSNnpd9HnCEeen4Uavz_V9hznfLED8VtxSvUsZK8MHyMxy5IM3n0Vl_CQvgtfPy5LThjA",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file)
      return alert("Please select or drop a prescription image first!");

    setLoading(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.error) {
        alert(`Analysis Error: ${data.error}`);
      } else {
        setResult(data.detailedSchedule);
        setMedicationName(data.medicationName || "Unknown");
        setDosage(data.dosage || "N/A");
        setFrequency(data.frequency || "N/A");
        setDuration(data.duration || "N/A");
        setConfidence(data.confidence || "95.0%");

        triggerRealNotification(data.notificationSummary);
      }
    } catch (err) {
      alert("Network error: Failed to connect to analysis server.");
    } finally {
      setLoading(false);
    }
  };

  const scrollToTool = () => {
    const el = document.getElementById("tool");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background text-on-background font-body-md selection:bg-secondary-container selection:text-on-secondary-container antialiased">
      {/* navbar */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full top-0 sticky bg-surface/80 backdrop-blur-md border-b border-outline-variant z-50"
      >
        <div className="flex justify-between items-center h-20 px-4 md:px-margin-desktop max-w-container-max mx-auto">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-4 cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <img
              alt="Medsminder Logo"
              className="h-10 w-auto rounded-md"
              src="https://lh3.googleusercontent.com/aida/ADBb0ujMuZMmjPTLyis4eFlD6b_HyLIbexxvNBFr2E8QSDZV-Jbx4mFJVF2r0H5xBDGLs3Vh3bVv-VLIsCAoU0rpBnFl8SfDNHyVQjoo1C4ANJ1yrcvZaxobKB8u1tWa31v_e0HKn9At8LMSSAhL_RYFVWV_yVakaYpk0rJEZTNRwaPXKLU0JfSMELSNnpd9HnCEeen4Uavz_V9hznfLED8VtxSvUsZK8MHyMxy5IM3n0Vl_CQvgtfPy5LThjA"
            />
            <span className="font-headline-md text-headline-md font-bold tracking-tight text-primary">
              Medsminder
            </span>
          </motion.div>

          <div className="hidden md:flex items-center gap-8">
            {[
              { label: "Features", id: "features" },
              { label: "How it Works", id: "how-it-works" },
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById(item.id)
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="relative text-on-surface-variant font-body-md text-body-md hover:text-secondary transition-colors group py-1 no-underline"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-secondary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={requestNotificationPermission}
              className={`px-4 py-2.5 rounded-lg font-semibold text-[11px] uppercase tracking-wider transition-colors border-0 cursor-pointer flex items-center gap-1.5 ${
                permissionStatus === "granted"
                  ? "bg-secondary/10 text-secondary hover:bg-secondary/20"
                  : "bg-error-container text-on-error-container hover:bg-error-container/90"
              }`}
            >
              {permissionStatus === "granted" ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                  Notifications Active
                </>
              ) : (
                "⚠️ Enable Notifications"
              )}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={scrollToTool}
              className="bg-primary text-on-primary px-6 py-2.5 rounded-lg font-label-md text-label-md hover:shadow-lg hover:shadow-primary/20 transition-all border-0 cursor-pointer"
            >
              Get Started
            </motion.button>
          </div>
        </div>
      </motion.nav>

      <main>
        {/* Hero Section */}
        <section className="relative pt-24 pb-24 overflow-hidden px-4 md:px-margin-desktop bg-surface">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.12, delayChildren: 0.1 },
              },
            }}
            className="max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10"
          >
            {/* left column */}
            <div className="space-y-8">
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { type: "spring", stiffness: 100 },
                  },
                }}
                className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container-high rounded-full border border-outline-variant"
              >
                <span className="material-symbols-outlined text-secondary text-[18px]">
                  verified
                </span>
                <span className="font-label-md text-label-md text-secondary tracking-wider uppercase">
                  AI-POWERED PRECISION Free
                </span>
              </motion.div>

              <motion.h1
                variants={{
                  hidden: { opacity: 0, y: 25 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, ease: "easeOut" },
                  },
                }}
                className="font-headline-xl text-[48px] md:text-[64px] leading-tight text-primary font-bold tracking-tight"
              >
                Doctors Handwriting, <br />
                <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                  Finally Readable.
                </span>
              </motion.h1>

              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
                className="font-body-lg text-body-lg text-on-surface-variant max-w-lg"
              >
                Instantly convert messy prescriptions into clear, organized
                medical details using advanced AI trained on millions of
                clinical datasets.
              </motion.p>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="flex flex-col sm:flex-row gap-4 pt-4"
              >
                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={scrollToTool}
                  className="bg-primary text-on-primary px-8 py-4 rounded-xl font-headline-md text-headline-md hover:shadow-xl hover:shadow-primary/20 transition-all border-0 cursor-pointer font-semibold"
                >
                  Get Started Free
                </motion.button>
                <motion.button
                  whileHover={{
                    scale: 1.03,
                    bg: "rgba(var(--secondary-rgb), 0.08)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={scrollToTool}
                  className="border border-outline-variant text-primary px-8 py-4 rounded-xl font-headline-md text-headline-md font-semibold transition-all bg-white shadow-sm cursor-pointer"
                >
                  View Demo
                </motion.button>
              </motion.div>

              <motion.div
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { delay: 0.4 } },
                }}
                className="flex items-center gap-4 pt-8 text-on-surface-variant"
              >
                <div className="flex -space-x-3">
                  <div className="w-10 h-10 rounded-full border-2 border-surface bg-surface-container shadow-sm flex items-center justify-center text-[10px] font-bold text-outline">
                    MD
                  </div>
                  <div className="w-10 h-10 rounded-full border-2 border-surface bg-surface-container-high shadow-sm flex items-center justify-center text-[10px] font-bold text-outline">
                    RPh
                  </div>
                  <div className="w-10 h-10 rounded-full border-2 border-surface bg-surface-dim shadow-sm flex items-center justify-center text-[10px] font-bold text-outline">
                    NP
                  </div>
                </div>
                <p className="font-body-sm text-body-sm font-medium">
                  Trusted by thousands of patients
                </p>
              </motion.div>
            </div>

            {/* right column */}
            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.96, x: 30 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  x: 0,
                  transition: { type: "spring", damping: 20, duration: 0.7 },
                },
              }}
              className="relative flex items-center justify-center min-h-[460px]"
            >
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.7, 0.5],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute w-[85%] h-[85%] bg-gradient-to-tr from-secondary/15 to-primary/5 rounded-full blur-3xl pointer-events-none z-0"
              />

              {/* Left back layer */}
              <motion.div
                animate={{ y: [-4, 4, -4], rotate: [-2, -1, -2] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute left-0 top-8 w-60 bg-white border border-outline-variant rounded-xl p-5 shadow-lg z-10 hidden sm:block select-none"
              >
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-outline-variant/60">
                  <span className="font-serif text-lg font-extrabold text-outline tracking-wider">
                    Rx Note
                  </span>
                  <span className="text-[11px] font-mono text-outline/40">
                    #4819-B
                  </span>
                </div>
                <div className="space-y-3 font-serif text-primary/60 italic leading-relaxed text-[13px]">
                  <p className="m-0 border-b border-dashed border-outline-variant pb-1">
                    Patient: John Doe
                  </p>
                  <p className="m-0 font-bold text-primary/80 tracking-wide pt-1">
                    Amoxicillin 500mg <br /> 1 tablet twice daily
                  </p>
                  <p className="m-0 font-bold text-primary/80 tracking-wide pt-1">
                    Atorvastatin 20mg <br /> 1 tablet daily
                  </p>
                </div>
              </motion.div>

              {/* Right Front Layer */}
              <motion.div
                animate={{ y: [4, -4, 4] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                whileHover={{ scale: 1.02 }}
                className="w-64 h-[430px] bg-slate-900 rounded-[38px] p-3 shadow-2xl relative z-20 border-4 border-slate-800 ml-0 sm:ml-40"
              >
                {/* Device */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-4 bg-slate-800 rounded-full z-30" />

                {/* Live Interface  */}
                <div className="w-full h-full bg-white rounded-[30px] overflow-hidden p-4 pt-8 flex flex-col justify-between relative text-left select-none">
                  {/*  Running Laser      */}
                  <motion.div
                    animate={{ top: ["8%", "90%", "8%"] }}
                    transition={{
                      duration: 3.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-secondary to-transparent z-40 pointer-events-none"
                  />

                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-2 border-b border-outline-variant/60">
                      <span className="text-[10px] font-bold text-primary tracking-wider uppercase">
                        PRESCRIPTION
                      </span>
                      <div className="flex items-center gap-1 bg-secondary/10 text-secondary text-[9px] font-extrabold px-1.5 py-0.5 rounded">
                        <span className="w-1 h-1 bg-secondary rounded-full animate-pulse" />
                        EXTRACTED
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="bg-surface-container-low p-2 rounded-lg border border-outline-variant/40">
                        <p className="text-[9px] font-bold text-outline uppercase m-0 tracking-wide">
                          Patient context
                        </p>
                        <p className="text-xs font-bold text-primary m-0">
                          Patient: John Doe
                        </p>
                        <p className="text-[11px] text-on-surface-variant m-0">
                          Dr. A. Chen
                        </p>
                      </div>

                      <div className="space-y-2.5 pl-0.5">
                        <div className="border-l-2 border-l-secondary pl-2">
                          <p className="text-[9px] font-bold text-outline uppercase m-0 tracking-wide">
                            Rx
                          </p>
                          <p className="text-xs font-bold text-primary m-0">
                            Amoxicillin 500mg
                          </p>
                          <p className="text-[11px] text-on-surface-variant m-0">
                            1 tablet twice daily
                          </p>
                        </div>

                        <div className="border-l-2 border-l-primary pl-2">
                          <p className="text-[9px] font-bold text-outline uppercase m-0 tracking-wide">
                            Rx
                          </p>
                          <p className="text-xs font-bold text-primary m-0">
                            Atorvastatin 20mg
                          </p>
                          <p className="text-[11px] text-on-surface-variant m-0">
                            1 tablet daily
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-outline-variant/40 flex justify-between items-center text-[10px]">
                    <span className="text-outline font-medium">
                      Data Integrity:
                    </span>
                    <span className="text-emerald-600 font-bold flex items-center gap-0.5">
                      <span
                        className="material-symbols-outlined text-[12px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        verified
                      </span>
                      99.3% Accurate
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* image reader section  */}
        <section
          className="py-24 px-4 md:px-margin-desktop bg-surface-container-low border-y border-outline-variant"
          id="tool"
        >
          <div className="max-w-container-max mx-auto animate-on-scroll transition-all duration-700 opacity-0 translate-y-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-center mb-16 space-y-4"
            >
              <h2 className="font-headline-lg text-headline-lg text-primary font-bold tracking-tight">
                See Your Prescription
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto">
                Upload a photo of your handwritten prescription to see the AI in
                action.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Left Column*/}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="space-y-6"
              >
                {/*  Drop Area */}
                <motion.div
                  whileHover={{ y: -2, scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="bg-white border-2 border-dashed border-outline-variant rounded-2xl p-12 text-center transition-colors hover:border-secondary group relative cursor-pointer shadow-sm hover:shadow-md"
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="max-w-xs mx-auto pointer-events-none">
                    <motion.div
                      className="w-16 h-16 bg-surface-container rounded-full flex items-center justify-center mx-auto mb-6 text-secondary"
                      whileHover={{ rotate: 15 }}
                    >
                      <span className="material-symbols-outlined text-[32px] group-hover:scale-110 transition-transform">
                        upload_file
                      </span>
                    </motion.div>
                    <p className="font-headline-md text-headline-md text-primary mb-2 truncate font-semibold">
                      {file ? file.name : "Drag & drop here"}
                    </p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mb-6">
                      or
                    </p>
                    <div className="bg-secondary text-on-secondary px-6 py-2.5 rounded-lg font-label-md text-label-md hover:opacity-90 transition-all inline-flex items-center gap-2 border-0 cursor-pointer shadow-sm">
                      <span className="material-symbols-outlined text-[18px]">
                        add_photo_alternate
                      </span>
                      Choose Image
                    </div>
                  </div>
                </motion.div>

                <div className="bg-white rounded-xl border border-outline-variant overflow-hidden aspect-video flex items-center justify-center bg-surface-container-lowest relative shadow-inner">
                  <AnimatePresence mode="wait">
                    {imagePreview ? (
                      <motion.img
                        key={imagePreview}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        src={imagePreview}
                        alt="Prescription Preview"
                        className="w-full h-full object-contain p-2"
                      />
                    ) : (
                      <motion.div
                        key="empty-state"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.4 }}
                        exit={{ opacity: 0 }}
                        className="text-center"
                      >
                        <span className="material-symbols-outlined text-[64px] mb-2 text-on-surface-variant">
                          description
                        </span>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          Prescription Preview
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <motion.button
                  whileHover={file && !loading ? { scale: 1.02, y: -1 } : {}}
                  whileTap={file && !loading ? { scale: 0.98 } : {}}
                  onClick={handleSubmit}
                  disabled={loading || !file}
                  className={`w-full bg-primary text-on-primary py-4 rounded-xl font-headline-md text-headline-md hover:shadow-lg transition-all flex items-center justify-center gap-2 border-0 cursor-pointer ${
                    loading || !file
                      ? "opacity-50 cursor-not-allowed shadow-none"
                      : "hover:shadow-primary/20"
                  }`}
                >
                  <span
                    className={`material-symbols-outlined ${loading ? "animate-spin" : ""}`}
                  >
                    {loading ? "sync" : "psychology"}
                  </span>
                  {loading ? "Analyzing..." : "Analyze Prescription"}
                </motion.button>
              </motion.div>

              {/* Right column results*/}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="lg:sticky lg:top-24 space-y-6"
              >
                <div className="bg-white border border-outline-variant rounded-2xl overflow-hidden shadow-sm">
                  {/* Header banner */}
                  <div className="bg-primary px-8 py-4 flex justify-between items-center">
                    <h3 className="font-headline-md text-headline-md text-on-primary font-bold">
                      AI Analysis
                    </h3>
                    <div className="flex items-center gap-2 text-secondary-container">
                      <span
                        className={`material-symbols-outlined text-[20px] ${loading ? "animate-spin" : ""}`}
                      >
                        {loading ? "sync" : "verified"}
                      </span>
                      <span className="font-label-md text-label-md uppercase tracking-wider font-semibold">
                        {loading ? "Processing" : "Ready"}
                      </span>
                    </div>
                  </div>

                  <div className="p-8 space-y-8">
                    <div className="grid grid-cols-1 gap-6">
                      <div className="pb-6 border-b border-outline-variant">
                        <p className="font-label-md text-label-md text-outline mb-2 uppercase tracking-wider">
                          Medication Name
                        </p>
                        <p
                          className={`font-headline-md text-headline-md text-primary font-bold ${loading ? "animate-pulse opacity-60" : ""}`}
                        >
                          {loading ? "Extracting name..." : medicationName}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-8">
                        <div>
                          <p className="font-label-md text-label-md text-outline mb-2 uppercase tracking-wider">
                            Dosage
                          </p>
                          <p
                            className={`font-body-lg text-body-lg font-semibold text-primary ${loading ? "animate-pulse opacity-60" : ""}`}
                          >
                            {loading ? "..." : dosage}
                          </p>
                        </div>
                        <div>
                          <p className="font-label-md text-label-md text-outline mb-2 uppercase tracking-wider">
                            Frequency
                          </p>
                          <p
                            className={`font-body-lg text-body-lg font-semibold text-primary ${loading ? "animate-pulse opacity-60" : ""}`}
                          >
                            {loading ? "..." : frequency}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-8">
                        <div>
                          <p className="font-label-md text-label-md text-outline mb-2 uppercase tracking-wider">
                            Duration
                          </p>
                          <p
                            className={`font-body-lg text-body-lg font-semibold text-primary ${loading ? "animate-pulse opacity-60" : ""}`}
                          >
                            {loading ? "..." : duration}
                          </p>
                        </div>
                        <div>
                          <p className="font-label-md text-label-md text-outline mb-2 uppercase tracking-wider">
                            AI Confidence
                          </p>
                          <div className="flex items-center gap-2">
                            <span className="font-body-lg text-body-lg font-bold text-secondary">
                              {loading ? "..." : confidence}
                            </span>
                            <div className="w-16 h-2 bg-surface-container rounded-full overflow-hidden relative">
                              <motion.div
                                initial={{ width: "0%" }}
                                animate={{
                                  width: loading
                                    ? "20%"
                                    : confidence && confidence.includes("%")
                                      ? confidence
                                      : `${confidence || 0}%`,
                                }}
                                transition={{
                                  type: "spring",
                                  stiffness: 80,
                                  damping: 15,
                                }}
                                className="h-full bg-secondary rounded-full"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-secondary-container/20 rounded-xl border border-secondary/20 flex gap-4 items-start">
                      <span className="material-symbols-outlined text-secondary shrink-0">
                        info
                      </span>
                      <p className="font-body-sm text-body-sm text-on-secondary-container leading-relaxed">
                        Results are cross-referenced with global pharmaceutical
                        databases for maximum safety.
                      </p>
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  {result && !loading && (
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.99 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="bg-white border border-outline-variant rounded-2xl p-8 shadow-sm"
                    >
                      <h3 className="font-headline-md text-headline-md text-primary mb-4 flex items-center gap-2 font-bold tracking-tight">
                        <span className="material-symbols-outlined text-secondary">
                          assignment
                        </span>
                        Detailed Schedule
                      </h3>
                      <div className="prose prose-slate max-w-none text-sm leading-relaxed text-on-surface-variant bg-surface-container-low p-6 rounded-xl border border-outline-variant max-h-[450px] overflow-y-auto custom-scrollbar">
                        <ReactMarkdown
                          components={{
                            h1: ({ node, ...props }) => (
                              <h1
                                className="text-xl font-bold text-primary mb-2"
                                {...props}
                              />
                            ),
                            h2: ({ node, ...props }) => (
                              <h2
                                className="text-lg font-bold text-primary mt-4 mb-2"
                                {...props}
                              />
                            ),
                            h3: ({ node, ...props }) => (
                              <h3
                                className="text-base font-bold text-primary mt-3 mb-1"
                                {...props}
                              />
                            ),
                            ul: ({ node, ...props }) => (
                              <ul
                                className="list-disc pl-5 space-y-1 my-2"
                                {...props}
                              />
                            ),
                            ol: ({ node, ...props }) => (
                              <ol
                                className="list-decimal pl-5 space-y-1 my-2"
                                {...props}
                              />
                            ),
                            li: ({ node, ...props }) => (
                              <li
                                className="text-on-surface-variant"
                                {...props}
                              />
                            ),
                            strong: ({ node, ...props }) => (
                              <strong
                                className="font-bold text-primary"
                                {...props}
                              />
                            ),
                            em: ({ node, ...props }) => (
                              <em
                                className="italic text-on-surface-variant/80"
                                {...props}
                              />
                            ),
                          }}
                        >
                          {result}
                        </ReactMarkdown>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </section>

        {/* features of the tool  */}
        <section
          className="bg-surface py-24 px-4 md:px-margin-desktop"
          id="features"
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.15 },
              },
            }}
            className="max-w-container-max mx-auto"
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: "easeOut" },
                },
              }}
              className="text-center mb-16 space-y-4"
            >
              <h2 className="font-headline-lg text-headline-lg text-primary font-bold tracking-tight">
                Engineered for Clinical Excellence
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto">
                Our proprietary AI model doesn't just read words—it understands
                medical context, dosage standards, and pharmaceutical
                interactions.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { type: "spring", stiffness: 100, damping: 15 },
                  },
                }}
                whileHover={{ y: -6, scale: 1.01 }}
                className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant shadow-sm hover:shadow-md transition-all duration-300 group cursor-default"
              >
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-6 text-on-primary group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                  <span className="material-symbols-outlined">target</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-primary mb-4 font-bold tracking-tight">
                  Unmatched Accuracy
                </h3>
                <p className="text-on-surface-variant font-body-md text-body-md leading-relaxed">
                  99.3% recognition rate on even the most complex cursive and
                  abbreviated medical notations.
                </p>
              </motion.div>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { type: "spring", stiffness: 100, damping: 15 },
                  },
                }}
                whileHover={{ y: -6, scale: 1.01 }}
                className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant shadow-sm hover:shadow-md transition-all duration-300 group cursor-default"
              >
                <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mb-6 text-on-primary group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                  <span className="material-symbols-outlined">bolt</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-primary mb-4 font-bold tracking-tight">
                  Instant Results
                </h3>
                <p className="text-on-surface-variant font-body-md text-body-md leading-relaxed">
                  Real time processing engine delivers digitized data in less
                  than 5 seconds after upload.
                </p>
              </motion.div>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { type: "spring", stiffness: 100, damping: 15 },
                  },
                }}
                whileHover={{ y: -6, scale: 1.01 }}
                className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant shadow-sm hover:shadow-md transition-all duration-300 group cursor-default"
              >
                <div className="w-12 h-12 bg-primary-container rounded-lg flex items-center justify-center mb-6 text-on-primary group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                  {/* Fixed invalid HTML entities here: changed &amp; to & */}
                  <span className="material-symbols-outlined">shield</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-primary mb-4 font-bold tracking-tight">
                  Safe &amp; Secure
                </h3>
                <p className="text-on-surface-variant font-body-md text-body-md leading-relaxed">
                  Your medical data is strictly confidential, heavily protected,
                  and legally guarded.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* preview with AI comparision */}
        <section className="py-24 px-4 md:px-margin-desktop bg-surface-container-low">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.15 },
              },
            }}
            className="max-w-container-max mx-auto"
          >
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              {/* Left card column*/}
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: -30 },
                  visible: {
                    opacity: 1,
                    x: 0,
                    transition: { type: "spring", stiffness: 80, damping: 15 },
                  },
                }}
                className="w-full lg:w-1/2"
              >
                <div className="p-8 bg-white border border-outline-variant rounded-2xl shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-secondary"></div>

                  <span className="inline-block px-3 py-1 bg-secondary-container text-on-secondary-container rounded font-label-md text-label-md mb-6 uppercase tracking-wider font-semibold">
                    AI Comparison
                  </span>

                  <h2 className="font-headline-lg text-headline-lg text-primary mb-6 font-bold tracking-tight">
                    From Confusion to Clarity
                  </h2>

                  <p className="font-body-md text-body-md text-on-surface-variant mb-8 leading-relaxed">
                    Stop guessing and start acting. Medsminder removes the
                    ambiguity of clinical documentation, reducing medical errors
                    and improving patient outcomes.
                  </p>

                  <ul className="space-y-4">
                    {[
                      "Automated drug-to-drug interaction checks",
                      "Direct integration with EMR systems",
                      "Patient-friendly dosage explanations",
                    ].map((text, index) => (
                      <motion.li
                        variants={{
                          hidden: { opacity: 0, x: -10 },
                          visible: {
                            opacity: 1,
                            x: 0,
                            transition: { delay: index * 0.1 },
                          },
                        }}
                        key={index}
                        className="flex items-start gap-3"
                      >
                        <span className="material-symbols-outlined text-secondary shrink-0">
                          check_circle
                        </span>
                        <span className="text-on-surface font-body-md">
                          {text}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              {/* Right */}
              <div className="w-full lg:w-1/2">
                <div className="grid grid-cols-1 gap-6 relative">
                  {/* Back Card */}
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, scale: 0.95, y: 15, rotate: 0 },
                      visible: {
                        opacity: 0.6,
                        scale: 1,
                        y: 0,
                        rotate: -2,
                        transition: { duration: 0.5 },
                      },
                    }}
                    whileHover={{ rotate: -1, opacity: 0.8 }}
                    className="bg-white p-6 rounded-xl border border-outline-variant shadow-lg select-none cursor-default"
                  >
                    <div className="h-4 w-1/3 bg-surface-container-high rounded mb-4 animate-pulse"></div>
                    <div className="space-y-3">
                      <div className="h-2 w-full bg-surface-container rounded"></div>
                      <div className="h-2 w-5/6 bg-surface-container rounded"></div>
                      <div className="h-2 w-4/6 bg-surface-container rounded"></div>
                    </div>
                    <p className="mt-4 font-body-sm text-[12px] italic text-on-surface-variant opacity-70">
                      Handwritten note: "Amox{" "}
                      {dosage === "500mg" ? "500mg" : dosage} tid x{" "}
                      {duration === "7 days" ? "7d" : duration}"
                    </p>
                  </motion.div>

                  <motion.div
                    variants={{
                      hidden: { opacity: 0, scale: 0.6 },
                      visible: {
                        opacity: 1,
                        scale: 1,
                        transition: { type: "spring", delay: 0.4 },
                      },
                    }}
                    animate={{ x: [-3, 3, -3] }}
                    transition={{
                      repeat: Infinity,
                      duration: 2.5,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center z-10 pointer-events-none"
                  >
                    <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center shadow-xl text-on-primary">
                      <span className="material-symbols-outlined">
                        trending_flat
                      </span>
                    </div>
                  </motion.div>

                  {/* Front Card  */}
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, scale: 0.95, y: 30, rotate: 0 },
                      visible: {
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        rotate: 1,
                        transition: {
                          type: "spring",
                          stiffness: 100,
                          damping: 15,
                        },
                      },
                    }}
                    whileHover={{ y: -4, rotate: 0, scale: 1.01 }}
                    className="bg-white p-8 rounded-xl border-l-4 border-l-secondary border border-outline-variant shadow-xl z-20 cursor-default"
                  >
                    <div className="flex justify-between items-center mb-6">
                      <h4 className="font-headline-md text-headline-md text-primary font-bold tracking-tight">
                        Medication Detail
                      </h4>
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{
                          repeat: Infinity,
                          duration: 8,
                          ease: "linear",
                        }}
                        className="text-secondary material-symbols-outlined"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        stars
                      </motion.span>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <p className="font-label-md text-label-md text-outline mb-1 uppercase tracking-wider">
                          DRUG NAME
                        </p>
                        <p className="font-headline-md text-headline-md text-primary font-bold">
                          {medicationName || "---"}
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="font-label-md text-label-md text-outline mb-1 uppercase tracking-wider">
                            DOSAGE
                          </p>
                          <p className="font-body-md text-body-md font-bold text-on-surface">
                            {dosage || "---"}
                          </p>
                        </div>
                        <div>
                          <p className="font-label-md text-label-md text-outline mb-1 uppercase tracking-wider">
                            FREQUENCY
                          </p>
                          <p className="font-body-md text-body-md font-bold text-on-surface">
                            {frequency || "---"}
                          </p>
                        </div>
                      </div>
                      <div className="pt-4 border-t border-outline-variant">
                        <p className="font-body-sm text-body-sm text-on-surface-variant font-medium">
                          Duration: {duration || "---"}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* working procedure */}
        <section
          className="py-24 px-4 md:px-margin-desktop bg-primary text-on-primary overflow-hidden"
          id="how-it-works"
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.2 },
              },
            }}
            className="max-w-container-max mx-auto text-center"
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: "easeOut" },
                },
              }}
            >
              <h2 className="font-headline-lg text-headline-lg mb-4 font-bold tracking-tight">
                Decipher in Three Easy Steps
              </h2>
              <p className="font-body-md text-body-md text-primary-fixed-dim max-w-2xl mx-auto mb-16 opacity-90">
                Designed for high-speed environments where every second counts.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter relative">
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { type: "spring", stiffness: 100, damping: 15 },
                  },
                }}
                whileHover={{ y: -5 }}
                className="relative z-10 group"
              >
                <motion.div
                  whileHover={{ rotate: -8, scale: 1.05 }}
                  className="w-20 h-20 bg-primary-container rounded-2xl flex items-center justify-center mx-auto mb-8 border border-outline/20 shadow-md transition-shadow group-hover:shadow-lg"
                >
                  <span className="material-symbols-outlined text-[32px] text-secondary">
                    photo_camera
                  </span>
                </motion.div>
                <h3 className="font-headline-md text-headline-md mb-4 font-bold tracking-tight">
                  1. Take a Photo
                </h3>
                <p className="text-primary-fixed-dim font-body-md text-body-md max-w-xs mx-auto leading-relaxed">
                  Capture a clear image of any medical document using our secure
                  app interface.
                </p>
              </motion.div>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { type: "spring", stiffness: 100, damping: 15 },
                  },
                }}
                whileHover={{ y: -5 }}
                className="relative z-10 group"
              >
                <motion.div
                  animate={{ scale: [1, 1.04, 1] }}
                  transition={{
                    repeat: Infinity,
                    duration: 3,
                    ease: "easeInOut",
                  }}
                  whileHover={{ rotate: 8, scale: 1.05 }}
                  className="w-20 h-20 bg-primary-container rounded-2xl flex items-center justify-center mx-auto mb-8 border border-outline/20 shadow-md transition-shadow group-hover:shadow-lg"
                >
                  <span className="material-symbols-outlined text-[32px] text-secondary">
                    psychology
                  </span>
                </motion.div>
                <h3 className="font-headline-md text-headline-md mb-4 font-bold tracking-tight">
                  2. AI Analyzes
                </h3>
                <p className="text-primary-fixed-dim font-body-md text-body-md max-w-xs mx-auto leading-relaxed">
                  Our Backend engine Read symbols, context, and handwriting in
                  milliseconds.
                </p>
              </motion.div>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { type: "spring", stiffness: 100, damping: 15 },
                  },
                }}
                whileHover={{ y: -5 }}
                className="relative z-10 group"
              >
                <motion.div
                  whileHover={{ rotate: -8, scale: 1.05 }}
                  className="w-20 h-20 bg-primary-container rounded-2xl flex items-center justify-center mx-auto mb-8 border border-outline/20 shadow-md transition-shadow group-hover:shadow-lg"
                >
                  <span className="material-symbols-outlined text-[32px] text-secondary">
                    verified_user
                  </span>
                </motion.div>
                <h3 className="font-headline-md text-headline-md mb-4 font-bold tracking-tight">
                  3. Get Clear Results
                </h3>
                <p className="text-primary-fixed-dim font-body-md text-body-md max-w-xs mx-auto leading-relaxed">
                  Receive a structured digital report ready for review or export
                  to pharmacy systems.
                </p>
              </motion.div>

              <motion.div
                variants={{
                  hidden: { scaleX: 0, opacity: 0 },
                  visible: {
                    scaleX: 1,
                    opacity: 1,
                    transition: {
                      duration: 0.8,
                      ease: "easeInOut",
                      delay: 0.1,
                    },
                  },
                }}
                className="hidden md:block absolute top-10 left-[22%] right-[22%] h-px bg-white/20 origin-left -z-0"
              />
            </div>
          </motion.div>
        </section>

        {/* cta section */}
        <section className="py-24 px-4 md:px-margin-desktop overflow-hidden">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, ease: "easeOut" },
              },
            }}
            className="max-w-container-max mx-auto bg-gradient-to-br from-surface-container to-surface border border-outline-variant rounded-3xl p-8 md:p-16 relative overflow-hidden shadow-xl"
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
                rotate: [0, 90, 0],
              }}
              transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
              className="absolute -top-32 -right-32 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none"
            />
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                repeat: Infinity,
                duration: 8,
                ease: "easeInOut",
                delay: 2,
              }}
              className="absolute -bottom-32 -left-32 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none"
            />

            <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-2 px-3 py-1 bg-white rounded-full border border-outline-variant shadow-sm mb-6 cursor-default"
              >
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                <span className="font-label-md text-label-md text-primary font-medium uppercase tracking-wider">
                  Enterprise-Grade Security
                </span>
              </motion.div>

              <h2 className="font-headline-xl text-[36px] md:text-[54px] leading-tight text-primary mb-6 font-bold tracking-tight">
                Ready to Eliminate <br className="hidden sm:inline" />
                the{" "}
                <span className="text-secondary">Handwriting Guesswork?</span>
              </h2>

              <p className="font-body-lg text-body-lg text-on-surface-variant mb-12 max-w-2xl leading-relaxed">
                Join thousands of pharmacists, clinics, and modern care
                providers using Medsminder to safeguard workflows, accelerate
                processing times, and maximize patient safety.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto mb-16">
                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={scrollToTool}
                  className="bg-primary text-on-primary px-12 py-4 rounded-xl font-headline-md text-headline-md hover:shadow-xl hover:shadow-primary/20 transition-all border-0 cursor-pointer text-center font-semibold"
                >
                  Start Deciphering Free
                </motion.button>

                <motion.a
                  whileHover={{
                    scale: 1.03,
                    y: -2,
                    bg: "rgba(var(--surface-rgb), 1)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  href="mailto:saadmirzapak@://gmail.com"
                  className="bg-white/80 text-primary border border-outline-variant px-12 py-4 rounded-xl font-headline-md text-headline-md hover:shadow-md transition-all cursor-pointer text-center font-semibold no-underline flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    mail
                  </span>
                  Contact Sales
                </motion.a>
              </div>

              <div className="w-full pt-8 border-t border-outline-variant/60 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left sm:text-center">
                <motion.a
                  whileHover={{ y: -2 }}
                  href="mailto:saadmirzapak@gmail.com"
                  className="flex sm:flex-col items-center gap-3 sm:gap-2 text-on-surface-variant hover:text-primary transition-colors no-underline group"
                >
                  <div className="w-10 h-10 bg-white border border-outline-variant rounded-lg flex items-center justify-center text-secondary group-hover:text-primary transition-colors shadow-sm">
                    <span className="material-symbols-outlined text-[20px]">
                      alternate_email
                    </span>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-outline uppercase tracking-wider m-0">
                      Direct Email
                    </p>
                    <p className="font-body-sm font-medium text-primary m-0 break-all">
                      saadmirzapak@gmail.com
                    </p>
                  </div>
                </motion.a>

                <div className="flex sm:flex-col items-center gap-3 sm:gap-2 text-on-surface-variant cursor-default">
                  <div className="w-10 h-10 bg-white border border-outline-variant rounded-lg flex items-center justify-center text-secondary shadow-sm">
                    <span className="material-symbols-outlined text-[20px]">
                      support_agent
                    </span>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-outline uppercase tracking-wider m-0">
                      Clinical Support
                    </p>
                    <p className="font-body-sm font-medium text-primary m-0">
                      Comming Soon
                    </p>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center gap-3 sm:gap-2 text-on-surface-variant cursor-default">
                  <div className="w-10 h-10 bg-white border border-outline-variant rounded-lg flex items-center justify-center text-secondary shadow-sm">
                    <span className="material-symbols-outlined text-[20px]">
                      speed
                    </span>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-outline uppercase tracking-wider m-0">
                      Response Rate
                    </p>
                    <p className="font-body-sm font-medium text-primary m-0">
                      Under 10 Minutes
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
