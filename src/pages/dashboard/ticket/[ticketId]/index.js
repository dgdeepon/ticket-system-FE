import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Form from "@/components/ticket/Form";
import { useRouter } from "next/router";
import React from "react";

function TicketEdit() {
  const router = useRouter();
  const ticketId = router.query.ticketId;

  return (
    <DashboardLayout>
      <Form id={ticketId} />
    </DashboardLayout>
  );
}

export default TicketEdit;
