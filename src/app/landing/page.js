"use client";

import { motion } from "framer-motion";

import { Header } from "@/app/landing/components/header";
import { Hero } from "@/app/landing/components/hero";
import { Services } from "@/app/landing/components/services";
import { Team } from "@/app/landing/components/team";
import { Projects } from "@/app/landing/components/projects";
import { Contact } from "@/app/landing/components/contact";
import { Footer } from "@/app/landing/components/footer";
import { BackgroundAnimation } from "@/components/backgroundAnimation";
import FloatingWhatsApp from "@/components/floatingWhatsapp";

const Landing = () => {
  return (
    <>
      <BackgroundAnimation />
      <FloatingWhatsApp />
      <motion.div
        className="App"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Header />
        <Hero />
        <Services />
        <Team />
        <Projects />
        <Contact />
        <Footer />
      </motion.div>
    </>
  );
};

export default Landing;
