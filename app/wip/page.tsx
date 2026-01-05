// app/wip/page.tsx  (SERVER COMPONENT – no "use client")
import type { Metadata } from "next";
import WipClient from "./WipClient";

export const metadata: Metadata = {
  title: "Work in Progress | UrbanRealtyy",
  robots: { index: false, follow: false },
};

export default function WipPage() {
  // pass public values from env if you like
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "910000000000";
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@urbanrealtyy.com";

  return <WipClient whatsapp={whatsapp} email={email} />;
}
