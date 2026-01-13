import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

export default function ContactCard() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [isSending, setIsSending] = useState(false);

  
  const phoneNumber = "27604435742";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isSending) return;
    setIsSending(true);

    const whatsappMessage = `
New Laptop Enquiry 💻

Name: ${form.name}
Phone: ${form.phone}
Email: ${form.email}

Message:
${form.message}
    `;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      whatsappMessage
    )}`;

    // Open WhatsApp in new tab
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    // Reset form after short delay
    setTimeout(() => {
      setForm({
        name: "",
        phone: "",
        email: "",
        message: "",
      });
      setIsSending(false);
    }, 2000);
  };

  return (
    <Card className="bg-card/50 border-border/50">
      <CardContent className="p-8">
        <h3 className="text-2xl font-semibold mb-6">Send us a Message</h3>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Name</label>
              <Input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Your name"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Phone</label>
              <Input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                placeholder="Your phone number"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <Input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="your@email.com"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Message</label>
            <Textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows={5}
              placeholder="Tell us about your enquiry..."
              className="resize-none"
            />
          </div>

          <Button
            type="submit"
            disabled={isSending}
            className="w-full gap-2"
          >
            <Send className="w-4 h-4" />
            {isSending ? "Redirecting to WhatsApp..." : "Send Message"}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            You’ll be redirected to WhatsApp — just press <b>Send</b> to complete
            your enquiry.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
