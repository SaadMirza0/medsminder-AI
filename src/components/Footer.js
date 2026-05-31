"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
export default function Footer (){

  return (
  
    <footer className="w-full py-16 bg-surface-container-low border-t border-outline-variant overflow-hidden">
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    className="max-w-container-max mx-auto px-4 md:px-margin-desktop flex flex-col gap-12"
  >
    
    <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-10">
      

      <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-4 max-w-xs">
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="flex items-center gap-3 cursor-pointer"
        >
          <img 
            alt="Medsminder Logo" 
            className="h-8 w-auto rounded-md" 
            src="https://lh3.googleusercontent.com/aida/ADBb0ujMuZMmjPTLyis4eFlD6b_HyLIbexxvNBFr2E8QSDZV-Jbx4mFJVF2r0H5xBDGLs3Vh3bVv-VLIsCAoU0rpBnFl8SfDNHyVQjoo1C4ANJ1yrcvZaxobKB8u1tWa31v_e0HKn9At8LMSSAhL_RYFVWV_yVakaYpk0rJEZTNRwaPXKLU0JfSMELSNnpd9HnCEeen4Uavz_V9hznfLED8VtxSvUsZK8MHyMxy5IM3n0Vl_CQvgtfPy5LThjA" 
          />
          <span className="font-headline-md text-headline-md font-bold tracking-tight text-primary">Medsminder</span>
        </motion.div>
        <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
          Advanced medical context recognition engineering for faster clinical documentation workflows.
        </p>
      </div>

   

<div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
  {[
    { label: "Privacy Policy", url: "/PrivacyPolicy" },
    { label: "Terms of Service", url: "/TermOfServices" },
    { label: "Contact Support", url: "/Contact" }
  ].map((link, idx) => (
    <Link 
      key={idx}
      href={link.url}
      className="font-body-sm text-body-sm text-on-surface-variant hover:text-secondary transition-colors duration-200 font-medium relative group no-underline"
    >
      {link.label}
      <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-secondary transition-all duration-300 group-hover:w-full" />
    </Link>
  ))}
</div>




    </div>


    <div className="pt-8 border-t border-outline-variant/60 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
      
     
      <p className="font-body-sm text-body-sm text-on-surface-variant opacity-80 m-0">
        © {new Date().getFullYear()} Medsminder AI. All rights reserved.
      </p>

      <motion.div 
        whileHover={{ scale: 1.02 }}
        className="flex items-center gap-1.5 bg-white border border-outline-variant/80 px-3.5 py-1.5 rounded-full shadow-sm select-none"
      >
        <span className="font-body-sm text-[12px] text-on-surface-variant font-medium">Made by</span>
        <a 
          href="https://saadmirza.vercel.app" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="font-body-sm text-[12px] font-bold text-primary hover:text-secondary transition-colors no-underline flex items-center gap-1 group"
        >
          SAAD MIRZA
          <span className="material-symbols-outlined text-[14px] transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200">
            north_east
          </span>
        </a>
      </motion.div>

    </div>

  </motion.div>
    </footer>
  );

}
