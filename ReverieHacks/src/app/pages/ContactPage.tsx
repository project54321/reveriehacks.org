import { motion } from 'motion/react';
import { Mail, MessageSquare, Globe } from 'lucide-react';

export function ContactPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h1 className="text-6xl md:text-7xl font-bold mb-6">Get in Touch</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Questions? Ideas? Just want to say hi? We're all ears. Contact us through any of these channels.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <motion.a
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            href="mailto:hello@reveriehacks.org"
            className="group p-8 bg-card border border-border rounded-2xl hover:border-primary transition-all text-center block h-full relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 via-purple-500/0 to-violet-600/0 group-hover:from-purple-600/10 group-hover:via-purple-500/5 group-hover:to-violet-600/10 transition-all duration-500" />
            <div className="relative z-10">
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:bg-primary/20 transition-colors">
                <Mail className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Email Us</h3>
              <p className="text-muted-foreground mb-2">For general inquiries</p>
              <p className="text-primary text-sm">To be updated soon!</p>
            </div>
          </motion.a>

          <motion.a
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            href="#"
            className="group p-8 bg-card border border-border rounded-2xl hover:border-primary transition-all text-center block h-full relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 via-purple-500/0 to-violet-600/0 group-hover:from-purple-600/10 group-hover:via-purple-500/5 group-hover:to-violet-600/10 transition-all duration-500" />
            <div className="relative z-10">
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Discord</h3>
              <p className="text-muted-foreground mb-2">Join the community</p>
              <p className="text-primary text-sm">
                <a
                  href="https://discord.gg/gDQGYSQKrH"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://discord.gg/gDQGYSQKrH
                </a>
              </p>
            </div>
          </motion.a>

          <motion.a
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            href="#"
            className="group p-8 bg-card border border-border rounded-2xl hover:border-primary transition-all text-center block h-full relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 via-purple-500/0 to-violet-600/0 group-hover:from-purple-600/10 group-hover:via-purple-500/5 group-hover:to-violet-600/10 transition-all duration-500" />
              <a
                href="https://www.instagram.com/reveriehacks"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:bg-primary/20 transition-colors">
                    <Globe className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Instagram</h3>
                  <p className="text-muted-foreground mb-2">Follow us for more updates!</p>
                  <p className="text-primary text-sm">@reveriehacks</p>
                </div>
              </a>
          </motion.a>
        </div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center text-muted-foreground"
        >
          <p>© 2026 ReverieHacks. All rights reserved.</p>
        </motion.div>
      </div>
    </div>
  );
}
