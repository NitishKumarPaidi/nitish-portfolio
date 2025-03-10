import { useState } from "react";
import { RevealOnScroll } from "../RevealOnScroll";
import emailjs from "@emailjs/browser";
import Alert from '@mui/material/Alert';

export const Contact = () => {

  const [formData, setFormData] = useState({});
  const [isAlertClosed, setIsAlertClosed] = useState(false);
  const successMessage = "Message Sent";


  function handleChange(e){
e
    setFormData((prev)=>{
      return {
        ...prev,
        [e.target.id]: e.target.value
      }
    });
  }

  const handleSubmit = (e) => {

    e.preventDefault();
    emailjs
      .sendForm(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        e.target,
        {publicKey:import.meta.env.VITE_PUBLIC_KEY}
      )
      .then(() => {
        setIsAlertClosed(true);
        setFormData({ user_name: "", user_email: "", message: "" });
        setTimeout(()=>{
          setIsAlertClosed(false);
        },3000)
      })
      .catch(() => alert("Oops! Something went wrong. Please try again."));
  };

  return (
    <section
      id="contact"
      className="min-h-screen flex items-center justify-center py-20"
    >
       {isAlertClosed && (
        <div style={{
          position: "fixed",
          top: "0",
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          maxWidth: "400px",
          zIndex: 1000,
          textAlign: "center",
          padding: "10px",
        }}>
          <Alert severity="success" onClose={() => setIsAlertClosed(false)}>
            {successMessage}
          </Alert>
        </div>
      )}
      <RevealOnScroll>
      
        <div className="px-4 w-full min-w-[300px] md:w-[500px] sm:w-2/3 p-6">
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent text-center">
            {" "}
            Get In Touch
          </h2>
          <form className="space-y-6" onSubmit={handleSubmit} >
          
            <div className="relative">
              <input
                type="text"
                id="user_name"
                name="user_name"
                required
                value={formData.user_name}
                className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white transition focus:outline-none focus:border-blue-500 focus:bg-blue-500/5"
                placeholder="Name..."
                onChange={handleChange}
               
              />
            </div>

            <div className="relative">
              <input
                type="email"
                id="user_email"
                name="user_email"
                required
                value={formData.user_email}
                className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white transition focus:outline-none focus:border-blue-500 focus:bg-blue-500/5"
                placeholder="example@gmail.com"
                onChange={handleChange}
               
              />
            </div>

            <div className="relative">
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={formData.message}
                className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white transition focus:outline-none focus:border-blue-500 focus:bg-blue-500/5"
                placeholder="Your Message..."
                onChange={handleChange}
               
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 px-6 rounded font-medium transition relative overflow-hidden hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)]"
            >
              Send Message
            </button>
          </form>
        </div>
      </RevealOnScroll>
    </section>
  );
};