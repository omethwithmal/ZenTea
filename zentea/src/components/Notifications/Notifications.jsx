
import { FaWhatsapp, FaEnvelope, FaBell } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

export default function Notifications() {
  const navigate = useNavigate();

  const handleWhatsApp = () => {
    // Replace with your WhatsApp number or API endpoint
    window.open("https://wa.me/1234567890?text=Hello%20I%20want%20to%20receive%20notifications", "_blank");
  };

  const handleEmail = () => {
    // Replace with your email or mailto link
    window.open("mailto:notifications@yourdomain.com?subject=Notification%20Subscription", "_blank");
  };
   
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-[#f0f9ff] to-[#e0f2fe] flex items-center justify-center p-4"
    >
      <Card className="w-full max-w-md bg-white/90 backdrop-blur-lg rounded-2xl overflow-hidden shadow-2xl border-0">
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <CardHeader className="bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] p-6">
            <div className="flex items-center justify-center space-x-3">
              <FaBell className="text-white text-2xl" />
              <h1 className="text-2xl font-bold text-white">Notification Preferences</h1>
            </div>
            <p className="text-white/90 text-center mt-2">
              Choose how you'd like to receive updates
            </p>
          </CardHeader>
        </motion.div>

        <CardContent className="p-6 space-y-6">
          <motion.div
            whileTap={{ scale: 0.98 }}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Button
              onClick={handleWhatsApp}
              className="w-full h-14 bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#128C7E] hover:to-[#075E54] text-white text-lg font-medium rounded-xl shadow-lg transition-all duration-300"
            >
              <FaWhatsapp className="mr-3 text-xl" />
              WhatsApp Notifications
            </Button>
          </motion.div>

          <motion.div
            whileTap={{ scale: 0.98 }}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Button
              onClick={handleEmail}
              className="w-full h-14 bg-gradient-to-r from-[#ea4335] to-[#d44638] hover:from-[#d44638] hover:to-[#b23121] text-white text-lg font-medium rounded-xl shadow-lg transition-all duration-300"
            >
              <FaEnvelope className="mr-3 text-xl" />
              Email Notifications
            </Button>
          </motion.div>
                                     
          <div className="pt-4">
            <p className="text-center text-sm text-gray-500">
              You can change preferences anytime in settings
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}