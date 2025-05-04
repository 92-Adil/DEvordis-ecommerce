import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import emailjs from "@emailjs/browser";
import axios from "axios";
import { Mail, Phone } from "lucide-react";
import { useState } from "react";

const ContactRestApi = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [message, setMessage] = useState();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const serviceId = "service_ktl07bl";
    const templateId = "template_7dcczid";
    const publicKey = "7qlzuQki6p0O6ZAkB";

    const data = {
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      template_params: {
        from_name: name,
        from_email: email,
        to_name: "AdilTech",
        phone: phone,
        message: message,
      },
    };

    //send mail using emailjs
    try {
      const res = await axios.post(
        "https://api.emailjs.com/api/v1.0/email/send",
        data
      );
      console.log(res.data);
      setEmail("");
      setMessage("");
      setName("");
      setPhone("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-24 bg-white rounded-lg shadow">
      <div className="lg:col-span-1">
        <div className="p-6 space-y-6">
          <div className="flex items-start gap-4">
            <div className="bg-red-500 text-white p-2 rounded-full">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-lg font-semibold">Call To Us</h4>
              <p className="text-sm text-gray-600">
                We are available 24/7, 7 days a week.
              </p>
              <p className="text-sm font-medium text-gray-900">
                Phone: +8801611122222
              </p>
            </div>
          </div>
          <hr />

          <div className="flex items-start gap-4">
            <div className="bg-red-500 text-white p-2 rounded-full">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-lg font-semibold">Write To Us</h4>
              <p className="text-sm text-gray-600">
                Fill out our form and we will contact you within 24 hours.
              </p>
              <p className="text-sm font-medium text-gray-900">
                Emails: customer@exclusive.com
              </p>
              <p className="text-sm font-medium text-gray-900">
                support@exclusive.com
              </p>
            </div>
          </div>
        </div>
      </div>
      <form className="lg:w-[700px] md:w-[400px]" onSubmit={onSubmitHandler}>
        <Card className="lg:col-span-2">
          <CardContent className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name *"
                className={"bg-gray-100 focus-visible:ring-0"}
              />
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email *"
                className={"bg-gray-100 focus-visible:ring-0"}
              />
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Your Phone *"
                className={"bg-gray-100 focus-visible:ring-0"}
              />
            </div>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={"h-40 bg-gray-100 focus-visible:ring-0"}
              placeholder="Your Message"
            />
            <div className="text-right">
              <Button
                type="submit"
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                Send Message
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};
export default ContactRestApi;
